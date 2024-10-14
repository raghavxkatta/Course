const form = document.querySelector('#searchForm');
const resultsContainer = document.querySelector('#results'); 

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    /*this should give us the input value and we found out using console.dir(form) */
    const searchTerm = form.elements.query.value; // Get the input value from the form element named 'query'
    if (!searchTerm) {
        displayMessage('Please enter a search term.');
        return;
    }
    displayMessage('Searching...');
    try {
        const config = { params: { q: searchTerm, isFunny: 'colt' } }; /* configuration object for the API request */
        const res = await axios.get(`https://api.tvmaze.com/search/shows`, config); /* GET request to the TV MAZE API */
        displayResults(res.data); /* calling the displayResults function, passing the response data */
        form.elements.query.value = ''; /* clearing the input field after submission */
    } catch (error) {
        console.error('Error fetching data:', error);
        displayMessage('An error occurred while fetching results. Please try again.');
    }
});

function displayResults(shows) {
    resultsContainer.innerHTML = '';

    if (shows.length === 0) {
        displayMessage("No results found");
        return;
    }

    for (let result of shows) {
        const show = result.show;
    // Create a container element for each show
        const showElement = document.createElement('div');
        showElement.className = 'show-item';

        // title element
        const title = document.createElement('h2');
        title.textContent = show.name;// Set the title text
        showElement.appendChild(title); // Add title to show container
          // Checking if the show has an image
        if (show.image && show.image.medium) {
            const img = document.createElement('img');
            img.src = show.image.medium;
            img.alt = show.name;
            showElement.appendChild(img);
        }

        if (show.summary) {
            const summary = document.createElement('p');
            summary.innerHTML = show.summary;
            showElement.appendChild(summary);
        }

        resultsContainer.appendChild(showElement);
    }
}

function displayMessage(message) {
    resultsContainer.innerHTML = `<p>${message}</p>`;
}

