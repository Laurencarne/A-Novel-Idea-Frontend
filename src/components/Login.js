import React, { Component } from "react";
import { Redirect } from "react-router-dom";

let currentUser = {};
class Login extends Component {
  state = {
    username: "",
    error: "",
    users: [],
    user: {}
  };

  componentDidMount() {
    fetch("http://localhost:3000/users").then(resp =>
      resp.json().then(data =>
        data.map(user =>
          this.setState({
            users: [...this.state.users, user]
          })
        )
      )
    );
  }

  handleUserChange = e => {
    this.setState({
      username: e.target.value
    });
  };

  dismissError = () => {
    this.setState({ error: "" });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (!this.state.username) {
      return this.setState({ error: "Username is required" });
    } else if (
      this.state.users.map(user => user.username).includes(e.target[0].value)
    ) {
      currentUser = this.state.users.find(
        user => user.username === e.target[0].value
      );
      this.setState({ error: "", redirect: true });
      this.setUserDetails(currentUser);
    } else {
      console.log("nope");
      return this.setState({ error: "Username is not recognised" });
    }
  };

  setUserDetails = currentUser => {
    this.props.setUser(currentUser.id);
  };

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
  };

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          {this.state.error && (
            <h3 data-test="error" onClick={this.dismissError}>
              <button onClick={this.dismissError}>✖</button>
              {this.state.error}
            </h3>
          )}

          <label>Username</label>
          <input
            type="text"
            value={this.state.username}
            onChange={this.handleUserChange}
          />

          <button type="submit">Login</button>
        </form>
        {this.renderRedirect()}
      </div>
    );
  }
}

export default Login;
