import React, { Component } from "react";
import { Link } from "react-router-dom";

const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));

const load = key => JSON.parse(localStorage.getItem(key));

load("basket");

class Cart extends Component {
  state = {
    basket: load("basket"),
    clicked: false
  };

  removeItem = id => {
    const basket = load("basket").filter(item => item.id !== id);
    save("basket", basket);
  };

  renderBooks = () => {
    return this.state.basket.map(book => (
      <div className="innerCard">
        <Link style={{ textDecoration: "none" }} to={`/books/${book.id}`}>
          <img className="book-img" src={book.image} alt={book.title} />
          <h3 className="bookTitleLink"> {book.title} </h3>
          <h5 className="bookAuthorLink"> {book.author} </h5>
          <p className="bookPriceLink"> £{book.price} </p>
        </Link>
        <button onClick={() => this.handleClick(book.id)}>Remove</button>
      </div>
    ));
  };

  handleClick = id => {
    this.removeItem(id);
  };

  render() {
    return <div className="Card">{this.renderBooks()}</div>;
  }
}

export default Cart;
