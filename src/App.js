import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import Search from './Search'
import BookShelves from './BookShelves'
import './App.css'

class BooksApp extends React.Component {
  state = {
    myBooks: []
  }

  constructor() {
    super()
    this.addBook = this.addBook.bind(this);
  }

  componentDidMount() {
    BooksAPI.getAll().then((myBooks) => {
      this.setState({myBooks})
    })
  }

  addBook(updatedBook, shelf) {
    const myBooks = this.state.myBooks
    let containsBook = false;
    updatedBook.shelf = shelf
    myBooks.map((book) => {
      if(book.id == updatedBook.id) {
        book.shelf = shelf
        containsBook = true;
      }
    })
    if (!containsBook) myBooks.push(updatedBook)
    this.setState({myBooks})
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <Search addBook={this.addBook}/>
        )} />
        <Route exact path="/" render={() => (
          <BookShelves myBooks={this.state.myBooks} addBook={this.addBook}/>
        )} />
    </div>
    )
  }
}

export default BooksApp
