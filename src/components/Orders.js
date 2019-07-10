import React, { Component } from "react";
import { Link } from "react-router-dom";

class Orders extends Component {
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

  getDateString = order => {
    let orderDate = new Date(order);
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

  renderOrders = () => {
    return this.props.orders.map(order => (
      <div className="InnerOrder">
        <Link style={{ textDecoration: "none" }} to={`/orders/${order.id}`}>
          <h3 className="bookTitleLink"> Order: {order.id} </h3>
          <h4 className="bookTitleLink">
            {this.getDateString(order.created_at)}
          </h4>
          <h5 className="bookTitleLink"> {order.books.length} Books</h5>
        </Link>
      </div>
    ));
  };

  render() {
    return (
      <div>
        <h1>{this.props.user.first_name}'s Orders</h1>
        <div className="OrderHolder">{this.renderOrders()}</div>
      </div>
    );
  }
}

export default Orders;
