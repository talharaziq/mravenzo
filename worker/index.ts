interface ContactEmailBinding {
  send(message: {
    to: string;
    from: string | { email: string; name?: string };
    replyTo?: string | { email: string; name?: string };
    subject: string;
    text: string;
  }): Promise<{ messageId: string }>;
}

interface ContactRateLimitBinding {
  limit(options: { key: string; delta?: number }): Promise<{ success: boolean }>;
}

interface Env {
  CONTACT_EMAIL: ContactEmailBinding;
  CONTACT_RATE_LIMITER: ContactRateLimitBinding;
}

const CONTACT_PATH = "/api/contact";
const DESTINATION = "talharaziq@outlook.com";
const SENDER = "contact@pawpawdecors.com";
const ALLOWED_SUBJECTS = new Set([
  "Website issue",
  "Article correction",
  "Article question",
  "Collaboration",
  "Other",
]);

function jsonResponse(payload: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "no-referrer",
      "Vary": "Accept",
    },
  });
}

function formResponse(request: Request, payload: Record<string, unknown>, status = 200): Response {
  if (request.headers.get("Accept")?.includes("application/json")) {
    return jsonResponse(payload, status);
  }

  const redirectUrl = new URL("/contact/", request.url);
  if (status >= 200 && status < 300) {
    redirectUrl.searchParams.set("sent", "1");
  } else {
    redirectUrl.searchParams.set("error", "1");
  }
  return Response.redirect(redirectUrl.toString(), 303);
}

function readField(data: FormData, name: string): string {
  const value = data.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(value: string): boolean {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname !== CONTACT_PATH) {
      return jsonResponse({ success: false, message: "Endpoint not found." }, 404);
    }

    if (request.method !== "POST") {
      return jsonResponse(
        { success: false, message: "Use the contact form to send a message." },
        405,
      );
    }

    const origin = request.headers.get("Origin");
    if (origin && origin !== url.origin) {
      return jsonResponse({ success: false, message: "This request could not be accepted." }, 403);
    }
    if (request.headers.get("Sec-Fetch-Site") === "cross-site") {
      return jsonResponse({ success: false, message: "This request could not be accepted." }, 403);
    }

    const contentLength = Number(request.headers.get("Content-Length") || "0");
    if (contentLength > 24_000) {
      return formResponse(request, { success: false, message: "Your message is too large. Please shorten it and try again." }, 413);
    }

    const contentType = request.headers.get("Content-Type")?.toLowerCase() || "";
    if (!contentType.startsWith("application/x-www-form-urlencoded") && !contentType.startsWith("multipart/form-data")) {
      return formResponse(request, { success: false, message: "Please submit the contact form directly." }, 415);
    }

    let data: FormData;
    try {
      const reader = request.body?.getReader();
      if (!reader) {
        return formResponse(request, { success: false, message: "The form is empty. Please try again." }, 400);
      }

      const chunks: Uint8Array[] = [];
      let totalBytes = 0;
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        totalBytes += value.byteLength;
        if (totalBytes > 24_000) {
          await reader.cancel();
          return formResponse(request, { success: false, message: "Your message is too large. Please shorten it and try again." }, 413);
        }
        chunks.push(value);
      }

      const body = new Uint8Array(totalBytes);
      let offset = 0;
      for (const chunk of chunks) {
        body.set(chunk, offset);
        offset += chunk.byteLength;
      }
      const bufferedRequest = new Request(request.url, {
        method: "POST",
        headers: request.headers,
        body,
      });
      data = await bufferedRequest.formData();
    } catch {
      return formResponse(request, { success: false, message: "The form could not be read. Please try again." }, 400);
    }

    // Quietly discard submissions that fill the off-screen honeypot field.
    if (readField(data, "website")) {
      return formResponse(request, { success: true, message: "Your message has been sent. Thank you." });
    }

    const name = readField(data, "name").replace(/\s+/g, " ");
    const email = readField(data, "email");
    const subject = readField(data, "subject");
    const message = readField(data, "message");

    if (name.length < 2 || name.length > 80) {
      return formResponse(request, { success: false, message: "Please enter a name between 2 and 80 characters." }, 400);
    }
    if (!isValidEmail(email)) {
      return formResponse(request, { success: false, message: "Please enter a valid email address." }, 400);
    }
    if (!ALLOWED_SUBJECTS.has(subject)) {
      return formResponse(request, { success: false, message: "Please choose a subject from the list." }, 400);
    }
    if (message.length < 20 || message.length > 5_000) {
      return formResponse(request, { success: false, message: "Please enter a message between 20 and 5,000 characters." }, 400);
    }

    const ip = request.headers.get("CF-Connecting-IP") || "unknown";
    try {
      const withinLimit = await env.CONTACT_RATE_LIMITER.limit({ key: ip });
      if (!withinLimit.success) {
        return formResponse(request, { success: false, message: "Too many messages were sent from this connection. Please try again in a minute." }, 429);
      }
    } catch (error) {
      console.error("[contact-form] Rate-limit check failed.", error);
      return formResponse(request, { success: false, message: "The form is temporarily unavailable. Please email the admin directly." }, 503);
    }

    const text = [
      "A new message was sent through the PawpawDecors contact form.",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subject}`,
      "",
      "Message:",
      message,
      "",
      `Page: ${url.origin}/contact/`,
    ].join("\n");

    try {
      await env.CONTACT_EMAIL.send({
        to: DESTINATION,
        from: SENDER,
        replyTo: email,
        subject: `[PawpawDecors] ${subject}`,
        text,
      });
      return formResponse(request, {
        success: true,
        message: "Your message has been sent. Thank you for contacting PawpawDecors.",
      });
    } catch (error) {
      console.error("[contact-form] Email delivery failed.", error);
      return formResponse(request, {
        success: false,
        message: "Your message could not be sent right now. Please try again or email the admin directly.",
      }, 502);
    }
  },
};
