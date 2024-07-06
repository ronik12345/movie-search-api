document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('search-form');
    const input = document.getElementById('search-input');
    const resultsContainer = document.getElementById('results');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const query = input.value.trim();
        input.value = '';
        if (query) {
            const shows = await fetchShows(query);
            displayResults(shows);
        }
    });

    async function fetchShows(query) {
        const response = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`);
        const data = await response.json();
        return data;
    }

    function displayResults(shows) {
        resultsContainer.innerHTML = '';
        shows.forEach(show => {
            if (show.show.image) {
                const img = document.createElement('img');
                img.src = show.show.image.medium;
                img.alt = show.show.name;
                resultsContainer.appendChild(img);
            }
        });
    }
});
