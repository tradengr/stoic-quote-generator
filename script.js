// fetch api on load
const API_URL = 'https://stoicquotesapi.com/v1/api/quotes/random';

const quoteContainer = document.querySelector('#quote-container');
const quoteText = document.querySelector('#quote');
const quoteAuthor = document.querySelector('#author');
const tweetButton = document.querySelector('#twitter');
const newQuoteButton = document.querySelector('#new-quote');
const loader = document.querySelector('#loader');

function displayLoader() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoader() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

async function getQuote() {
  displayLoader();
  try {
    const response = await fetch(API_URL);
    const quote = await response.json();
    console.log(quote.body)
    quoteText.textContent = quote.body;
    if (!quote.author) {
      quoteAuthor.textContent = 'Unknown';
    }
    quoteAuthor.textContent = quote.author;
    hideLoader();
  } catch (err) {
    console.error(err);
  }
}

function tweet() {
  const TWITTER_URL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;

  window.open(TWITTER_URL, '_blank');
}

newQuoteButton.addEventListener('click', getQuote);
tweetButton.addEventListener('click', tweet);

getQuote();