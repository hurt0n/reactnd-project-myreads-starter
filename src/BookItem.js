import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'

class BookItem extends Component {

  state = {
    value: ''
  }

  updateBook(event) {
    const shelf = event.target.value
    console.log(shelf)

    this.setState({value: event.target.value});
    BooksAPI.update(this.props.book, shelf).then((message) => {
      console.log(message);
    })
  }

  render() {
    const {book} = this.props
    console.log(book)
    return(
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128,
              height: 193,
              backgroundImage: `url('${book.imageLinks ? book.imageLinks.smallThumbnail : ''}')`}}></div>
            <div className="book-shelf-changer">
              <select onChange={this.updateBook.bind(this)} value={this.state.value}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.title}</div>
        </div>
      </li>
    )
  }
}

export default BookItem
