import React, { Component } from 'react'
import _ from 'lodash';
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import BookItem from './BookItem'

class Search extends Component {

  constructor() {
    super();
    this.callAjax = _.debounce(this.callAjax, 300);
  }

  callAjax(query) {
    this.setState({query})
    if (query) {
      // const match = new RegExp(escapeRegExp(query.trim()), 'i')
      BooksAPI.search(query, 10).then((books) => {
        this.setState({books})
      })
    }
  }

  state = {
    query: '',
    books: []
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
                <BookItem key={book.id} book={book} />
              ))}
            </ol>
          )}
        </div>
      </div>
    )
  }
}

export default Search
