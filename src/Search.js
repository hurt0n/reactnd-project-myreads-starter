import React, { Component } from 'react'
import _ from 'lodash';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookItem from './BookItem'

class Search extends Component {

  /**
  * @constructor
  * @description We wrap our main API call funtion with debounce
  * wrapper to prevent too many requests
  */
  constructor() {
    super();
    this.callAjax = _.debounce(this.callAjax, 300);
  }

  state = {
    query: '',
    books: []
  }

  /**
  * @description Makes API call every certain amount of time defined
  * in debounce function call
  */
  callAjax(query) {
    this.setState({query})
    if (query) {
      BooksAPI.search(query, 10).then((books) => {
        this.setState({books})
      })
    }
  }

  searchBooks(e) {
    this.callAjax(e.target.value);
  }

  render() {
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text"
              // 1. binding app context to searchBooks method
              onChange={this.searchBooks.bind(this)}
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          { (!this.state.query) && (
            <div>Start to search your book by typing 'History', 'Android' and so on...</div>
          )}
          { (this.state.books.error && this.state.query) && (
            <div>No book found!</div>
          )}
          {/* Display books only when query is not empty, and returned books is array */}
          { (Array.isArray(this.state.books) && this.state.query) && (
            <ol className="books-grid">
              {this.state.books.map((book) => (
                <BookItem key={book.id} book={book} addBook={this.props.addBook}/>
              ))}
            </ol>
          )}
        </div>
      </div>
    )
  }
}

export default Search
