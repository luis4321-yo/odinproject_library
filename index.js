const myLibrary = [];

const newBookBtn = document.querySelector("#new-book-btn");
const bookDialog = document.querySelector("#book-dialog");
const closeDialog = document.querySelector("#close-dialog");
const bookForm = document.querySelector("#book-form");
const libraryContainer = document.querySelector("#library-container");


function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
};


function addBookToLibrary(title, author, pages, read) {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
}


function displayBooks() {
    libraryContainer.innerHTML = "";

    myLibrary.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.dataset.id = book.id;

        const title = document.createElement("h3");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.textContent = `Author: ${book.author}`;

        const pages = document.createElement("p");
        pages.textContent = `Pages: ${book.pages}`;

        const readStatus = document.createElement("p");
        readStatus.textContent = book.read ? "Read" : "Not read";

        const removeBtn = document.createElement("button");
        removeBtn.textContent = "Remove";
        removeBtn.dataset.action = "remove";

        const toggleBtn = document.createElement("button");
        toggleBtn.textContent = "Change Read Status";
        toggleBtn.dataset.action = "toggle";

        bookCard.append(
            title,
            author,
            pages,
            readStatus,
            removeBtn,
            toggleBtn
        );

        libraryContainer.appendChild(bookCard);
    });
}


newBookBtn.addEventListener("click", () => {
    bookDialog.showModal();
});

closeDialog.addEventListener("click", () => {
    bookDialog.close();
});

//get data from dialog form
bookForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = Number(document.querySelector("#pages").value);
    const read = document.querySelector("#read").checked;

    addBookToLibrary(title, author, pages, read);

    displayBooks();

    bookForm.reset();
    bookDialog.close();
});

//delete
libraryContainer.addEventListener("click", (event) => {

    const button = event.target.closest("button");

    if (!button) return;

    const bookCard = button.closest("[data-id]");
    const bookId = bookCard.dataset.id;

    const bookIndex = myLibrary.findIndex(book => book.id === bookId);

    if (bookIndex === -1) return;

    if (button.dataset.action === "remove") {
        myLibrary.splice(bookIndex, 1);

    } else if (button.dataset.action === "toggle") {
        myLibrary[bookIndex].toggleRead();
    }

    displayBooks();
});


addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, true);
addBookToLibrary("1984", "George Orwell", 328, false);

displayBooks();
