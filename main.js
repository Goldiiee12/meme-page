const seenGifs = new Set(JSON.parse(localStorage.getItem('seenGifs') || '[]'));
const img = document.querySelector('img');

function fetchGif() {
  const query = 'funny'; // Example query
  fetch(`https://api.giphy.com/v1/gifs/translate?api_key=YOUR_API_KEY&s=${query}`, {mode: 'cors'})
    .then(response => response.json())
    .then(data => {
      if (!seenGifs.has(data.data.id)) {
        seenGifs.add(data.data.id);
        localStorage.setItem('seenGifs', JSON.stringify([...seenGifs]));
        img.src = data.data.images.original.url;
      } else {
        // If seen, try fetching again or handle as needed
        console.log('GIF already seen, fetching another...');
        fetchGif(); // Be cautious with recursion to avoid excessive API calls
      }
    })
    .catch(e => console.log(e));
}

fetchGif();
