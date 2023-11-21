// Book class with a constructor that is used to make all the info submitted into a book object.
class book{
    constructor(title , author , pages , read ){
        this.title=title;
        this.author=author;
        this.pages=pages;
        this.read=read; 
    }

}
// All the DOM methods are selected

const addBookBtn = document.querySelector('#add-book')
const saveBookBtn = document.querySelector('#save-book')
const cancelSave = document.querySelector('#cancel')
const bookForm = document.querySelector('dialog')
const bookTitle = document.querySelector('#title')
const bookAuthor = document.querySelector('#author')
const bookPages = document.querySelector('#pages')
const readStatus = document.querySelector('input[id="read-status-check"]')
const cardsBook = document.querySelector('.cards')
const formInput = document.querySelectorAll('input')
const myLibrary = [ new book( 'Atomic Habits' , 'James Clear' , 294 , true)];
addBookCards(); //initial book card as a demo

// Button to save a book card when info is entered using other functions.
saveBookBtn.addEventListener( 'click' , () => {
    addBookToLibrary();
    addBookCards();
    if( bookAuthor.value != '' && bookTitle.value != '' && bookPages.value != ''){
        formInput.forEach( input => {
            
            input.value = "";
            input.checked = false 
            bookForm.close();
            
        })
    }
    
})

// Button in main page to open form dialog.
addBookBtn.addEventListener( 'click' , () => {
    bookForm.showModal();
})

// Button to close dialog without saving any info.
cancelSave.addEventListener('click' , () =>{
    bookForm.close();
})


// Function that will add the book object into the library array.
function addBookToLibrary(){
    if(bookTitle.value == '' || bookAuthor.value == '' || bookPages.value == ''){
        return ;
    }
    else {
    let title= bookTitle.value
    let author= bookAuthor.value
    let pages= parseInt(bookPages.value)
    let status = readStatus.checked ? true : false;
    const newBook = new book(title , author , pages , status)
    

    myLibrary.push(newBook); 
    }
    
}

// Function that will call take book object of library array and convert it into a display card on window.
function addBookCards(){
    
    cardsBook.textContent = " ";
    for (let i =0 ; i<myLibrary.length ; i++){
       
        let cardDiv = document.createElement('div');
        cardDiv.className='card';

        let titleBook = document.createElement('p');
        titleBook.className='title';
        titleBook.textContent=`${myLibrary[i].title}`

        let authorBook =document.createElement('p')
        authorBook.className='author';
        authorBook.textContent=`by ${myLibrary[i].author}`

        let pagesBook = document.createElement('p')
        pagesBook.className='pages';
        pagesBook.textContent = `Pages: ${myLibrary[i].pages}`

        let btnDiv = document.createElement('div');
        btnDiv.className = 'btns';

        let readStatusBtn = document.createElement('button');
        readStatusBtn.className = "read-status";
        if(myLibrary[i].read == true){
        readStatusBtn.setAttribute('id', 'read')
        readStatusBtn.textContent="Read"
        }
        else{
        readStatusBtn.setAttribute('id' , 'un-read')
        readStatusBtn.textContent="Un-Read"
        }
        let deleteBtn = document.createElement('button');
        deleteBtn.className = "delete";
        deleteBtn.textContent = 'Delete'

        // Appending all the elements to main div holding cards
        btnDiv.appendChild(readStatusBtn)
        btnDiv.appendChild(deleteBtn)
        
        cardDiv.appendChild(titleBook)
        cardDiv.appendChild(authorBook)
        cardDiv.appendChild(pagesBook)
        cardDiv.appendChild(btnDiv)

        cardsBook.append(cardDiv)

        // Button to change the the read status
        readStatusBtn.addEventListener('click' , (event) => {

            if (event.target.textContent == 'Un-Read'){
            event.target.textContent = "Read"
            event.target.setAttribute('id' , 'read')
            } else  {
            event.target.textContent = "Un-Read"
            event.target.setAttribute('id' , 'un-read')
            }
        })
        
        // Button to delete a card form display as well as form myLibrary array.
        deleteBtn.addEventListener('click' , (event) => { 
    
            let confirmDelete = window.confirm("Are you sure to delete this Book?")
            if (confirmDelete) {
                delCard = event.target.closest('.card')
                delCard.remove();
                let delIndex = myLibrary.indexOf(delCard.value)
                myLibrary.splice(delIndex , 1);
            } else {
                return false;
            }
        }
        )       
    }

}

