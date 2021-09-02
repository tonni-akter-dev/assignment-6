// spinner  part 
const spinner = document.getElementById('spinner');
window.addEventListener('load', () => spinner.style.display = 'none');
// search books section........
const searchBooks = () => {
    displayError('');
    document.getElementById('search-result').textContent = '';
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
/* ........................
        spinner block
.......................... */
    spinner.style.display = 'block';
    searchField.value = '';
    if (searchText === '') {
        spinner.style.display = 'none';
        displayError('Enter a valid input');
        showTotalCount();
    }
/* ........................
       data fetch section
.......................... */
    else {
        const url = ` https://openlibrary.org/search.json?q=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayResults(data));
    }
}
const displayResults = books => {
/* ........................
    total count data
.......................... */
    const totalCount = books.numFound;
    showTotalCount(totalCount, 'block');
/* ........................
      Books number found section
.......................... */
    document.getElementById('books-numbers').textContent = '';
    const bookShow = document.getElementById('search-result');
    bookShow.textContent = '';
    const bookList = books.docs;
    if (bookList.length === 0) {
/* ........................
      spinner none
.......................... */
        spinner.style.display = 'none';
/* ........................
    error message
.......................... */
        displayError('No result found');
        showTotalCount();
    }
    else {
/* ........................
       total result found
.......................... */
        displayError(`Display Result: ${bookList.length}`)
        bookList.forEach(book => {
            const div = document.createElement('div');
            let imgURL;
            book.cover_i ? imgURL = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg` : imgURL = `cover1.jpg`;
            div.innerHTML = `
        <div class="card h-100">
    <div class="card-body">
    <img height=300px src="${imgURL}" class="card-img-top" alt="...">
       
    <h5 class="card-title  fw-bold mt-2"><i class="fas fa-book me-3"></i> Book : </span>${book.title}</h5>

        <p class="card-text"><i class="fas fa-user me-3"></i>Author:${(book.author_name !== undefined) ? book.author_name[0] : 'Tonni Akter'}</p>
        
        <p class="card-text"><i class="fas fa-user-edit me-3"></i>Published:${(book.first_publish_year !== undefined) ? book.first_publish_year : 'N/A'}</p>

        <p class="card-text"><i class="far fa-calendar-alt me-3"></i> Publisher:${(book.publisher !== undefined) ? book.publisher[0] : 'N/A'}</p> 
    </div>
    </div> `;
            bookShow.appendChild(div);
        });
        spinner.style.display = 'none';
    }
}
/* ........................
      error message function
.......................... */
const displayError = errorMessage => {
    document.getElementById('error-message').innerText = errorMessage;
}
/* ........................
       total result found section
.......................... */
showTotalCount = (totalCount = '', isBlock = 'none') => {
    const totalResult = document.getElementById('total-count');
    totalResult.innerText = `Total Result Found :${totalCount}`
    totalResult.style.display = isBlock;
}