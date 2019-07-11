import React, { Component } from "react";
import { Link } from "react-router-dom";

class Orders extends Component {
  renderOrders = () => {
    return this.props.orders.map(order => (
      <div className="InnerOrder">
        <Link style={{ textDecoration: "none" }} to={`/orders/${order.id}`}>
          <h3 className="bookTitleLink"> Order: {order.id} </h3>
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
