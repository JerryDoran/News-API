const API_KEY = 'a558d72b89394d37b529ac5ea4f5e4a9';
const main = document.querySelector('main');
const sourceSelector = document.querySelector('#sourceSelector');
const defaultSource = 'the-washington-post';

window.addEventListener('load', async e => {
  updateNews();
  await updateSources();
  sourceSelector.value = defaultSource;

  sourceSelector.addEventListener('change', e => {
    updateNews(e.target.value);
  });
});

async function updateNews(source = defaultSource) {
  const res = await fetch(
    `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${API_KEY}`
  );
  const json = await res.json();

  main.innerHTML = json.articles.map(createArticle).join('\n');
}

async function updateSources() {
  const res = await fetch(
    `https://newsapi.org/v2/sources?apiKey=a558d72b89394d37b529ac5ea4f5e4a9`
  );
  const json = await res.json();

  // Populate the selector box
  sourceSelector.innerHTML = json.sources.map(
    source => `<option value='${source.id}'>${source.name}</option>`
  );
}

function createArticle(article) {
  return `
    <div class='article'>
      <a href='${article.url}'>
        <h2>${article.title}</h2>
        <img src='${article.urlToImage}'>
        <p>${article.description}</p>
      </a>
    </div>
  `;
}

// a558d72b89394d37b529ac5ea4f5e4a9
