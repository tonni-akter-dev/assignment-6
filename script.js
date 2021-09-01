const searchBooks = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
const url=` https://openlibrary.org/search.json?q=${searchText}`
    fetch(url)
        .then(res => res.json())
    .then(data=>displayResults(data))
}

const displayResults = books => {
    console.log(books.docs[0]);
    const bookDetail = books.docs[0];
    const bookShow = document.getElementById('search-result');
    bookShow.textContent = '';
    const div = document.createElement('div');

    div.innerHTML = `
    <div class="card-body">
    <img src="${bookDetail.strStadiumThumb}" class="card-img-top" alt="...">
        <h5 class="card-title">Book Title: ${'bookDetail.title'}</h5>
        <p class="card-text">Home: ${'bookDetail.author_name'}</p> 
        <p><small class="card-text">Published: ${'bookDetail.publish_date'}</small></p>
    </div>
    `;

}