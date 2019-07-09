import React, { Component } from "react";
import { Link } from "react-router-dom";

const linkStyle = {
  color: "rgb(107, 215, 177)"
};

class Cart extends Component {
  renderBooks = () => {
    return this.props.cartBooks.map(cartBook => (
      <div className="innerCard">
        <Link
          style={{ textDecoration: "none" }}
          to={`/books/${cartBook.book.google_id}`}
        >
          <img
            className="book-img"
            src={cartBook.book.image}
            alt={cartBook.book.title}
          />
          <h3 className="bookTitleLink"> {cartBook.book.title} </h3>
          <h5 className="bookAuthorLink"> {cartBook.book.author} </h5>
          <p className="bookPriceLink"> £{cartBook.book.price} </p>
        </Link>
        <button onClick={() => this.handleClick(cartBook.id)}>Remove</button>
      </div>
    ));
  };

  handleClick = cartBookId => {
    this.deleteCartBookFromServer(cartBookId);
  };

  deleteCartBookFromServer = cartBookId => {
    return fetch(`http://localhost:3000/cart_books/${cartBookId}`, {
      method: "DELETE"
    })
      .then(respo => respo.json())
      .then(this.props.updateCart);
  };

  prices = () => this.props.cartBooks.map(cartBook => cartBook.book.price);

  total = () => this.prices().reduce((a, b) => a + b, 0);

  handleCheckout = e => {
    e.preventDefault();
    this.addOrderToServer(this.setOrderDetails());
  };

  addOrderToServer = order => {
    return fetch(`http://localhost:3000/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    })
      .then(resp => resp.json())
      .then(console.log);
  };

  setOrderDetails = () => {
    const order = {
      order: {
        user_id: this.props.user.id,
        book_ids: this.props.cartBooks.map(book => book.book_id)
      }
    };
    return order;
  };

  renderTotalAndCheckout = () => {
    if (this.props.cartBooks.length > 0) {
      return (
        <>
          <h3>Basket Total £{this.total()}</h3>
          <button onClick={this.handleCheckout}>Checkout</button>
        </>
      );
    } else {
      return (
        <>
          <h3>Your Basket is empty.</h3>
          <Link style={linkStyle} to="/books">
            <h2 className="navButtons">Start Shopping</h2>
          </Link>
        </>
      );
    }
  };

  render() {
    return (
      <>
        <h1>{this.props.user.first_name}'s Basket</h1>
        <div className="Card">{this.renderBooks()}</div>
        {this.renderTotalAndCheckout()}
      </>
    );
  }
}

export default Cart;
