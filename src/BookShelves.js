import React, {Component} from 'react'
import BookItem from './BookItem'
import { Link } from 'react-router-dom'

class BookShelves extends Component {

  filterBooks = (shelf) => {
    return (
      <div className="bookshelf-books">
        <ol className="books-grid">
          { this.props.myBooks
            .filter((book) => book.shelf == shelf)
            .map((book) => (
              <BookItem key={shelf + book.id} book={book} addBook={this.props.addBook}/>
            ))
          }
        </ol>
      </div>
      )}

      render() {
        return(
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  {this.filterBooks("currentlyReading")}
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  {this.filterBooks("wantToRead")}
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  {this.filterBooks("read")}
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
    )
  }
}

export default BookShelves
