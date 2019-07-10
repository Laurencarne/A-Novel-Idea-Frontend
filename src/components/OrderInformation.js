import React, { Component } from "react";
let array = [];

class OrderInformation extends Component {
  state = {
    books: [],
    created: ""
  };
  componentDidMount() {
    fetch(
      `https://a-novel-idea.herokuapp.com/orders/${this.props.match.params.id}`
    )
      .then(resp => resp.json())
      .then(data => {
        console.log(data);
        this.setState({
          books: data.books,
          created: data.created_at
        });
      });
  }

  renderBooks = () =>
    this.state.books.map(book => (
      <div className="innerCard">
        <img className="book-img" src={book.image} alt={book.title} />
        <h3 className="bookTitleLink"> {book.title} </h3>
        <h5 className="bookAuthorLink"> {book.author} </h5>
        <p className="bookPriceLink"> £{book.price} </p>
      </div>
    ));

  priceArray = () => {
    array = this.state.books.map(book => book.price);
    // debugger;
    return array.reduce((a, b) => a + b, 0);
  };

  dateWithOrdinalIndicator = date => {
    let monthDate = date.getDate().toString();
    if (monthDate.endsWith("1") && monthDate !== "11") {
      return monthDate + "st";
    } else if (monthDate.endsWith("2") && monthDate !== "12") {
      return monthDate + "nd";
    } else if (monthDate.endsWith("3") && monthDate !== "13") {
      return monthDate + "rd";
    } else {
      return monthDate + "th";
    }
  };

  getDateString = () => {
    let orderDate = new Date(this.state.created);
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    let weekday = days[orderDate.getDay()];
    let month = months[orderDate.getMonth()];
    return `${weekday}, ${month} ${this.dateWithOrdinalIndicator(
      orderDate
    )} ${orderDate.getFullYear()} at ${orderDate.toTimeString().slice(0, 5)}`;
  };

  render() {
    return (
      <>
        <h1>Order Number {this.props.match.params.id}</h1>
        <h3>Ordered on {this.getDateString()}</h3>
        <h3>Total Cost of £{this.priceArray()}</h3>
        <div className="Card">{this.renderBooks()}</div>
      </>
    );
  }
}

export default OrderInformation;
