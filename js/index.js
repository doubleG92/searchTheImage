const ACCESS_KEY = 'RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw';
const API_URL = 'https://api.unsplash.com';

const showBox = document.querySelector('.results');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchBtn');
const showMore = document.querySelector('.showMore');

let currentPage = 1;

function handleSearchButtonClick () {
    currentPage = 1;
    const inputValue = searchInput.value;
    fetchImages(currentPage, inputValue)
}
searchButton.addEventListener('click', handleSearchButtonClick)

function fetchImages (page, query) {
    const url = `${API_URL}/search/photos?page=${page}&query=${query}&client_id=${ACCESS_KEY}`;
    fetch(url)
        .then(resp => {
            return resp.json()
        })
        .then(data => {
            renderSearchResults(data.results)
        })
}

function renderSearchResults (results) {
    showBox.innerHTML = '';
    results.forEach(result => {
        const searchResult = document.createElement('div');
        const imgElement = document.createElement('img');
        const aElement = document.createElement('a');

        imgElement.src = result.links.download;
        aElement.innerText = result.alt_description;
        aElement.href = result.links.html;
        aElement.target = '_blank';

        searchResult.appendChild(imgElement);
        searchResult.appendChild(aElement);
        searchResult.classList.add('result');

        showBox.appendChild(searchResult);
    });
    forShowMore()
}

function forShowMore () {
    showMore.innerHTML = '';
    const showMoreButton = document.createElement('button');
    showMoreButton.innerText = 'Show More';
    showMoreButton.classList.add('showMoreBtn');
    showMore.appendChild(showMoreButton);

    showMoreButton.addEventListener('click', function () {
        currentPage++;
        const inputValue = searchInput.value;
        fetchImages(currentPage, inputValue);
    })
}
