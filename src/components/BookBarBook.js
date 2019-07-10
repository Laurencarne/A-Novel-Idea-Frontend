import React, { Component } from "react";
import { Link } from "react-router-dom";

class BookBarBook extends Component {
  render() {
    return (
      <div className="BookBarInnerCard">
        <Link
          style={{ textDecoration: "none" }}
          to={`/books/${this.props.book.id}`}
        >
          <img
            className="book-img"
            src={this.props.book.volumeInfo.imageLinks.thumbnail}
            alt={this.props.book.volumeInfo.title}
          />
        </Link>
      </div>
    );
  }
}

export default BookBarBook;
