(() => {
  const indexNode = document.getElementById('mravenzo-search-index');
  const form = document.getElementById('site-search-form');
  const input = document.getElementById('site-search-input');
  const results = document.getElementById('search-results');
  const count = document.getElementById('search-result-count');
  if (!indexNode || !form || !input || !results) return;

  let documents = [];
  try { documents = JSON.parse(indexNode.textContent || '[]'); } catch (_) { documents = []; }

  const render = (query) => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      results.innerHTML = '<div class="search-results-empty">Enter a word or phrase to search published articles.</div>';
      if (count) count.textContent = `${documents.length} published ${documents.length === 1 ? 'article' : 'articles'} to search`;
      return;
    }
    const terms = normalized.split(/\s+/).filter(Boolean);
    const matches = documents.map((item) => {
      const searchable = `${item.title} ${item.excerpt} ${(item.categories || []).join(' ')} ${item.keywords || ''}`.toLowerCase();
      const score = terms.reduce((sum, term) => sum + (searchable.includes(term) ? (item.title.toLowerCase().includes(term) ? 3 : 1) : 0), 0);
      return { item, score };
    }).filter((entry) => entry.score > 0).sort((a, b) => b.score - a.score).map((entry) => entry.item);

    if (count) count.textContent = `${matches.length} ${matches.length === 1 ? 'result' : 'results'} for “${query.trim()}”`;
    if (!matches.length) {
      results.innerHTML = '<div class="search-results-empty">No matching stories yet. Try a different word or browse the topics instead.</div>';
      return;
    }

    results.replaceChildren();
    matches.forEach((item) => {
      const card = document.createElement('article');
      card.className = 'search-result';
      const link = document.createElement('a');
      link.href = item.url;
      link.textContent = item.title;
      const description = document.createElement('p');
      description.textContent = item.excerpt;
      const meta = document.createElement('small');
      meta.textContent = [item.categories?.join(' · '), item.dateLabel].filter(Boolean).join('  /  ');
      card.append(link, description, meta);
      results.append(card);
    });
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const query = input.value.trim();
    const url = new URL(window.location.href);
    if (query) url.searchParams.set('q', query);
    else url.searchParams.delete('q');
    window.history.replaceState({}, '', url);
    render(query);
  });

  if (input.value.trim()) render(input.value);
})();
