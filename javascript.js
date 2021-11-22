let libraryContainer = document.getElementById("collection-container");
let addBookBtn = document.getElementById("addBtn");
let submitBookBtn = document.getElementById("submit-button");
let cancelBookBtn = document.getElementById("cancel-button");



let myLibrary = [];

function Book(name, author, pages, read=false) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function(){
        if(read){
            return `${this.name}, ${this.pages} pages, read.`
        } else{
            return `${this.name}, ${this.pages} pages, not read yet.`
        }
        
    }

}

cancelBookBtn.addEventListener("click", ()=>{
    document.getElementById("form-popup").style.display="none";
})

addBookBtn.addEventListener("click", ()=>{
    document.getElementById("form-popup").style.display="flex";

})

submitBookBtn.addEventListener("click", ()=>{
    let form = document.getElementById("add-book-form");

    let name = form.elements["book-name"].value;
    let author = form.elements["book-author"].value;
    let pages = form.elements["book-pages"].value;
    let read = form.elements["book-read"].checked;

    addBookToLibrary(new Book(name, author, pages, read))
    populateLibrary()    

    document.getElementById("form-popup").style.display="none";    
})

function addBookToLibrary(book){
    myLibrary.push(book);
}

function populateLibrary(){
    while(libraryContainer.firstChild){
        libraryContainer.removeChild(libraryContainer.lastChild);
    }

    for (let book of myLibrary){
        let bookCard = document.createElement("div");
        bookCard.classList.add('bookCard');
        bookCard.textContent = (book.read) ? `${book.name} \r\n ${book.author} \r\n ${book.pages} pg. \r\n Read \r\n` : `${book.name} \r\n ${book.author} \r\n ${book.pages} pg.\r\n Not read \r\n`;
        
        let bookCardRemove = document.createElement("button");
        bookCardRemove.classList.add('book-card-btn');
        bookCardRemove.textContent="Remove";
        bookCardRemove.addEventListener("click", ()=>{
            removeBook(book.name);
        });

        let bookCardToggleRead = document.createElement("button");
        bookCardToggleRead.classList.add('book-card-btn');
        bookCardToggleRead.textContent="Toggle Read";
        bookCardToggleRead.addEventListener("click", ()=>{
            toggleRead(book.name)});

        bookCard.appendChild(bookCardToggleRead);
        bookCard.appendChild(bookCardRemove);


        libraryContainer.appendChild(bookCard);
    };
};

function removeBook(name){
    myLibrary.splice(myLibrary.findIndex(book => book.name === name), 1);
    
    populateLibrary();
}

function toggleRead(name){
    let book = myLibrary[(myLibrary.findIndex(book => book.name===name))];
    book.read = !book.read;
    
    populateLibrary();
}

function init(){
    let book1 = new Book("Meu livro", "Eu", 235);
    let book2 = new Book("Meu segundo livro", "Tua Mãe de Quatro", 1245, true);

    addBookToLibrary(book1);
    addBookToLibrary(book2);


    populateLibrary();
}
