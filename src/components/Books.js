import React, { Component } from "react";
import { Link } from "react-router-dom";

class Books extends Component {
  state = {
    searchTerm: "",
    clicked: false
  };

  renderBook = () => {
    return this.props.books.map(book => (
      <div className="innerCard">
        <Link style={{ textDecoration: "none" }} to={`/books/${book.id}`}>
          <img
            className="book-img"
            src={book.volumeInfo.imageLinks.thumbnail}
            alt={book.volumeInfo.title}
          />
          <h3 className="bookTitleLink"> {book.volumeInfo.title} </h3>
          <h5 className="bookAuthorLink"> {book.volumeInfo.authors} </h5>
          <p className="bookPriceLink"> £{book.saleInfo.listPrice.amount} </p>
        </Link>
      </div>
    ));
  };

  handleChange = event => {
    this.setState({
      searchTerm: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.state.searchTerm.length > 0) {
      this.props.getFilteredBooksFromServer(this.state.searchTerm);
    } else {
      this.props.resetBooks();
    }
    this.setState({
      searchTerm: ""
    });
    event.target.reset();
  };

  render() {
    return (
      <>
        <div className="searching">
          <span className="searching">
            <form onSubmit={this.handleSubmit} className="searchBar">
              <input
                className="searchBox"
                onChange={this.handleChange}
                type="text"
                placeholder="Search"
              />
              <input className="searchButton" type="submit" />
            </form>
          </span>
          <span className="searching">
            <p className="orangeFont">Sort By:</p>
            <select onChange={this.props.setSortBy} className="searchButton">
              <option value="All">All</option>
              <option value="Alphabetically">Alphabetically</option>
              <option value="Price">Price</option>
            </select>
          </span>
        </div>
        <div className="Card">{this.renderBook()}</div>
      </>
    );
  }
}

export default Books;
