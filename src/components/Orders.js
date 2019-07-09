import React, { Component } from "react";
import { Link } from "react-router-dom";

class Orders extends Component {
  renderOrders = () => {
    return this.props.orders.map(order => (
      <div>
        <Link style={{ textDecoration: "none" }} to={`/orders/${order.id}`}>
          <h3 className="bookTitleLink"> Order Number: {order.id} </h3>
          <h5 className="bookAuthorLink"> {order.books.length} Books</h5>
          <hr />
        </Link>
      </div>
    ));
  };

  render() {
    return (
      <div>
        <h1>{this.props.user.first_name}'s Orders</h1>
        <div>{this.renderOrders()}</div>
      </div>
    );
  }
}

export default Orders;
