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

  componentDidMount() {
    BooksAPI.getAll().then((myBooks) => {
      this.setState({myBooks})
    })
  }

  render() {
    return (
      <div className="app">
        <Route path="/search" render={() => (
          <Search />
        )} />
        <Route exact path="/" render={() => (
          <BookShelves myBooks={this.state.myBooks} />
        )} />
    </div>
    )
  }
}

export default BooksApp
