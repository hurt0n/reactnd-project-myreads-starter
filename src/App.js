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
    if (updatedBook.shelf !== shelf) {
      BooksAPI.update(updatedBook, shelf).then(() => {
        updatedBook.shelf = shelf

        // Filter out the book and append it to the end of the list
        // so it appears at the end of whatever shelf it was added to.
        this.setState(state => ({
          myBooks: state.myBooks.filter(b => b.id !== updatedBook.id).concat([ updatedBook ])
        }))
      })

  }
}

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <Search addBook={this.addBook} myBooks={this.state.myBooks}/>
        )} />
        <Route exact path="/" render={() => (
          <BookShelves myBooks={this.state.myBooks} addBook={this.addBook}/>
        )} />
    </div>
    )
  }
}

export default BooksApp
