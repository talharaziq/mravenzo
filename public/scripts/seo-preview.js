(() => {
  const byId = (id) => document.getElementById(id);
  const fields = ['title', 'url', 'description', 'image'].map(byId);
  if (fields.some((item) => !item)) return;
  const [title, url, description, image] = fields;
  const fallbackImage = '/images/pawpawdecors-social-card.svg';

  const safeUrl = (value) => {
    try {
      const parsed = new URL(value || 'https://pawpawdecors.com/');
      return ['http:', 'https:'].includes(parsed.protocol) ? parsed : new URL('https://pawpawdecors.com/');
    } catch (_) {
      return new URL('https://pawpawdecors.com/');
    }
  };

  const update = () => {
    const titleText = title.value.trim() || 'PawpawDecors article title';
    const descriptionText = description.value.trim() || 'A clear summary of the page appears here.';
    const parsed = safeUrl(url.value.trim());
    byId('google-title').textContent = titleText;
    byId('social-title').textContent = titleText;
    byId('google-description').textContent = descriptionText;
    byId('social-description').textContent = descriptionText;
    byId('google-domain').textContent = parsed.hostname;
    byId('social-domain').textContent = parsed.hostname;
    byId('google-url').textContent = `${parsed.protocol}//${parsed.host}${parsed.pathname}`;
    const imageValue = image.value.trim();
    byId('social-image').src = imageValue && (/^(https?:)?\\//i.test(imageValue)) ? imageValue : fallbackImage;
    byId('title-count').textContent = `${title.value.length} / 60 guide`;
    byId('description-count').textContent = `${description.value.length} / 160 guide`;
  };

  fields.forEach((field) => field.addEventListener('input', update));

  const copy = async (value, label) => {
    const status = byId('copy-status');
    try {
      await navigator.clipboard.writeText(value);
      status.textContent = `${label} copied`;
    } catch (_) {
      status.textContent = 'Copy unavailable in this browser';
    }
  };

  byId('copy-title').addEventListener('click', () => copy(title.value, 'Title'));
  byId('copy-description').addEventListener('click', () => copy(description.value, 'Description'));
  update();
})();
