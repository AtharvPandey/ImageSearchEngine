const accessKey = "ZsQv3pgbVt5qdLmI2mj6wW78ACG3xbmZYAQKLCyxqwg";
const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("searchResult");
const moreImages = document.getElementById("moreImages");

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value;

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;

    if (results.length === 0) {
        moreImages.innerText = "Image not found!";
        return;
    }

    results.map((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    });

    if (moreImages) {
        moreImages.style.display = "block";
    }
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchResult.innerHTML = ""; // Clear previous search results
    moreImages.innerText = "More Images";
    searchImages();
});

moreImages.addEventListener("click", () => {
    page++;
    searchImages();
});

