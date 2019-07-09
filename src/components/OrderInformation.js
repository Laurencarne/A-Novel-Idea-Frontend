import React, { Component } from "react";

class OrderInformation extends Component {
  state = {
    books: [],
    created: ""
  };
  componentDidMount() {
    fetch(`http://localhost:3000/orders/${this.props.match.params.id}`)
      .then(resp => resp.json())
      .then(data =>
        this.setState({
          books: [...this.state.books, data.books.map(book => book)],
          created: data.created_at
        })
      );
  }

  renderBooks = () =>
    this.state.books.map(books =>
      books.map(book => (
        <div className="innerCard">
          <img className="book-img" src={book.image} alt={book.title} />
          <h3 className="bookTitleLink"> {book.title} </h3>
          <h5 className="bookAuthorLink"> {book.author} </h5>
          <p className="bookPriceLink"> £{book.price} </p>
        </div>
      ))
    );

  priceArray = () =>
    this.state.books.map(books => books.map(book => book.price));

  totalOrderCost = () => this.priceArray().reduce((a, b) => a + b, 0);

  render() {
    return (
      <>
        <h1>Order Information Page</h1>
        <h3>Ordered on {Date(this.state.created)}</h3>
        <h3>Total Cost of £{this.totalOrderCost()}</h3>
        <div className="Card">{this.renderBooks()}</div>
      </>
    );
  }
}

export default OrderInformation;
