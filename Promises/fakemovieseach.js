document.getElementById('searchForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const query = document.getElementById('searchInput').value.trim();
    if (query === '') {
        displayError('Please enter a search term.');
        return;
    }

    const apiKey = '982d9855'; 
    const url = `https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;

    axios.get(url)
        .then(response => {
            console.log('API response:', response); 
            if (response.data.Response === 'True') {
                displayMovies(response.data.Search);
            } else {
                displayError(response.data.Error);
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);  
            displayError('Unable to fetch data. Please try again later.');
        });
});

function displayMovies(movies) {
    const movieResults = document.getElementById('movieResults');
    movieResults.innerHTML = '';
    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');
        movieDiv.innerHTML = `
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/100'}" alt="${movie.Title}">
            <h3>${movie.Title} (${movie.Year})</h3>
        `;
        movieResults.appendChild(movieDiv);
    });
}

function displayError(message) {
    const movieResults = document.getElementById('movieResults');
    movieResults.innerHTML = `<p>${message}</p>`;
}
