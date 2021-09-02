document.getElementById('error-message').style.display = 'none';

const searchBooks = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    if (searchText === '') {
        displayError();
    }

    else {
        document.getElementById('error-message').style.display = 'none';
        const url=` https://openlibrary.org/search.json?q=${searchText}`
         fetch(url)
        .then(res => res.json())
        .then(data => displayResults(data));
    }
}

const displayError = () => {
    document.getElementById('error-message').style.display = 'block';
    document.getElementById('books-numbers').textContent = '';
    document.getElementById('search-result').textContent= '';
}
const displayResults = books => {
    document.getElementById('books-numbers').textContent = '';
    const bookShow = document.getElementById('search-result');
    bookShow.textContent = '';
    const bookList = books.docs;
    document.getElementById('books-numbers').innerText = `Books Found ${bookList.length}`;
if (bookList.length==0) {
    displayError();
}
else {
    bookList.forEach(book => {
        // console.log(book.length);
    const div = document.createElement('div');
        div.innerHTML = `
        <div class="card h-100">
       <div class="card-body">
       <img height=250px src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
        <h5 class="card-title text-success fw-bold">Book Title:${book.title}</h5>
        <p class="card-text">Author: ${book.author_name}</p> 
        <p><small class="card-text">Published: ${(book.publish_date !== undefined) ? (book.publish_date.length === 1) ? book.publish_date[0] : (book.publish_date === 2) ? book.publish_date[1]: 'N/a' : 'N/A'}</small></p>
        <p class="card-text">Publisher: ${book.publisher}</p> 
    </div>
    </div>
    `;
    bookShow.appendChild(div);
    });
}

    
}