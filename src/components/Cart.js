import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

const linkStyle = {
  color: "rgb(107, 215, 177)"
};

class Cart extends Component {
  state = {
    redirect: false,
    id: ""
  };

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
    return fetch(
      `https://a-novel-idea.herokuapp.com/cart_books/${cartBookId}`,
      {
        method: "DELETE"
      }
    )
      .then(respo => respo.json())
      .then(this.props.updateCart);
  };

  priceArray = () => this.props.cartBooks.map(cartBook => cartBook.book.price);

  totalOrderCost = () => this.priceArray().reduce((a, b) => a + b, 0);

  handleCheckout = e => {
    e.preventDefault();
    this.addOrderToServer(this.setOrderDetails());
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to={`/orders/${this.state.id}`} />;
    }
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

  addOrderToServer = order => {
    return fetch(`https://a-novel-idea.herokuapp.com/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    })
      .then(resp => resp.json())
      .then(data =>
        this.setState({
          id: data.id
        })
      )
      .then(
        this.props.cartBooks.map(cb => this.deleteCartBookFromServer(cb.id))
      )
      .then(
        this.setState({
          redirect: true
        })
      );
  };

  renderTotalAndCheckout = () => {
    if (this.props.cartBooks.length > 0) {
      return (
        <>
          <h3>Basket Total £{this.totalOrderCost()}</h3>
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
        {this.renderRedirect()}
      </>
    );
  }
}

export default Cart;
