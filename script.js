const Main = document.querySelector("main")
const AddBook = document.querySelector(".addbook")
const Toggle = document.getElementById("Toggle").addEventListener("click",() => UI.Toggle(Main,AddBook))
const AddBookBtn = document.querySelector(".AddBook").addEventListener("click",() => {

UI.composeBook()
//UI.getBooks()
UI.Toggle(Main,AddBook)
location.reload()

})

class Book {

constructor(bookname,author,pagenumber,isinlibrary,ISBN) {

this.bookname = bookname
this.author = author
this.isinlibrary = isinlibrary
this.pagenumber = pagenumber
this.ISBN = ISBN
}
}

class UI {

static Toggle(firstElement,secondElement) {

if (firstElement.classList.contains("gridmode")) {

firstElement.classList.remove("gridmode")
firstElement.classList.add("hidden")
secondElement.classList.remove("hidden")
secondElement.classList.add("flexmode")

} else if (firstElement.classList.contains("hidden")) {

firstElement.classList.remove("hidden")
firstElement.classList.add("gridmode")
secondElement.classList.remove("flexmode")
secondElement.classList.add("hidden")
}


}

static composeBook() {

let title = document.getElementById("title")
let author = document.getElementById("author")
let pagenumber = document.getElementById("pagenumber")
let isinlibrary = document.getElementById("isinlibrary")
let ISBN = document.getElementById("ISBN")

// Compose a new book
let newBook = new Book(title.value,author.value,pagenumber.value,isinlibrary.checked,ISBN.value)

let myLibrary

if (localStorage.getItem("myLibrary") === null) {

myLibrary = []
myLibrary.push(newBook)

} else {

myLibrary = JSON.parse(localStorage.getItem("myLibrary"))
myLibrary.push(newBook)

}

localStorage.setItem("myLibrary",JSON.stringify(myLibrary))

}

static getBooks() {

let myLibrary = JSON.parse(localStorage.getItem("myLibrary"))

myLibrary.forEach((book) => {

UI.AddBookstoScreen(book)
    
});

}

static AddBookstoScreen(book) {

let titleP = document.createElement("p")
let authorP = document.createElement("p")
let pagenumberP = document.createElement("p")
let ISBNp = document.createElement("p")
let isinlibrarybtn = document.createElement("button")
let bookwrapper = document.createElement("div")
let deletebtn = document.createElement("button")
deletebtn.innerHTML  = "Delete"
deletebtn.addEventListener("click",() => UI.DeleteBook(bookwrapper,book.ISBN))
bookwrapper.classList.add("bookwrapper")

if (book.bookname !== "" && book.author !== "" && book.pagenumber !== "") {

    titleP.innerHTML = book.bookname
    authorP.innerHTML = book.author
    pagenumberP.innerHTML = book.pagenumber
    ISBNp.innerHTML = book.ISBN
    isinlibrarybtn.innerHTML = book.isinlibrary ? "Available" : "Unavailable"
    isinlibrarybtn.addEventListener("click",() => {

    if (isinlibrarybtn.innerHTML === "Available") {

    isinlibrarybtn.innerHTML = "Unavailable"

    } else {

    isinlibrarybtn.innerHTML = "Available"

    }

    })
    bookwrapper.append(titleP,authorP,pagenumberP,isinlibrarybtn,deletebtn)
    
    Main.append(bookwrapper)

}

}

static DeleteBook(el,ISBN) {

el.remove()

let myLibrary = JSON.parse(localStorage.getItem("myLibrary"))

console.log(myLibrary)

myLibrary.forEach((book,index) => {

if (book.ISBN === ISBN) {

myLibrary.splice(index,1)

}

})
localStorage.setItem("myLibrary",JSON.stringify(myLibrary))
}

}

document.addEventListener("DOMContentLoaded",UI.getBooks)