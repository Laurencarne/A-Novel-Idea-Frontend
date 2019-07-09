import React, { Component } from "react";
import { Link } from "react-router-dom";

class Wishlists extends Component {
  renderBooks = () => {
    return this.props.wishlist.map(wishBook => (
      <div className="innerCard">
        <Link
          style={{ textDecoration: "none" }}
          to={`/books/${wishBook.book.google_id}`}
        >
          <img
            className="book-img"
            src={wishBook.book.image}
            alt={wishBook.book.title}
          />
          <h3 className="bookTitleLink"> {wishBook.book.title} </h3>
          <h5 className="bookAuthorLink"> {wishBook.book.author} </h5>
          <p className="bookPriceLink"> £{wishBook.book.price} </p>
        </Link>
        <button onClick={() => this.handleClick(wishBook.id)}>Remove</button>
      </div>
    ));
  };

  handleClick = id => {
    this.deleteWishBookFromServer(id);
  };

  deleteWishBookFromServer = id => {
    return fetch(`http://localhost:3000/wish_books/${id}`, {
      method: "DELETE"
    })
      .then(respo => respo.json())
      .then(this.props.updateWishlist);
  };

  render() {
    return (
      <div>
        <h1>{this.props.user.first_name}'s Wishlist</h1>
        <div className="Card">{this.renderBooks()}</div>
      </div>
    );
  }
}
export default Wishlists;
