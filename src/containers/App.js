import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Home from "../components/Home";
import Login from "../components/Login";
import Orders from "../components/Orders";
import OrderInformation from "../components/OrderInformation";
import Cart from "../components/Cart";
import Wishlists from "../components/Wishlists";
import Books from "../components/Books";
import Fiction from "../components/Fiction";
import BookInformation from "../components/BookInformation";

const BASEURL = "https://www.googleapis.com/books/v1/volumes";

class App extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
      // userId: 1,
      currentUser: {},
      currentUsersOrders: [],
      currentUsersWishlist: [],
      currentUsersCartBooks: [],
      sortBy: "All"
    };
  }

  componentDidMount() {
    this.fetchBooksFromSever().then(this.addVerifiedBooksToState());
    this.fetchUsersFromServer().then(this.addUserToState());
  }

  fetchUsersFromServer = () =>
    fetch(`http://localhost:3000/users/1`).then(resp => resp.json());

  addUserToState = () => data =>
    this.setState({
      currentUser: data,
      currentUsersOrders: data.orders,
      currentUsersWishlist: data.wishlist.wish_books,
      currentUsersCartBooks: data.cart.cart_books
    });

  fetchBooksFromSever = () => {
    return fetch(
      BASEURL +
        '?q=""&printType=books&orderBy=newest&startIndex=1&maxResults=40&langRestrict=en'
    ).then(resp => resp.json());
  };

  addVerifiedBooksToState = () => {
    return data =>
      data.items.map(book => {
        if (
          book.saleInfo.listPrice &&
          book.volumeInfo.title &&
          book.volumeInfo.authors &&
          book.volumeInfo.publisher &&
          book.volumeInfo.publishedDate &&
          book.volumeInfo.description &&
          book.volumeInfo.imageLinks &&
          book.searchInfo &&
          book.searchInfo.textSnippet
        ) {
          this.setState({
            books: [...this.state.books, book]
          });
        }
      });
  };

  getFilteredBooksFromServer = searchTerm => {
    return fetch(
      BASEURL +
        `?q=""+intitle:"${searchTerm}"&printType=books&orderBy=newest&startIndex=1&maxResults=40&langRestrict=en`
    )
      .then(resp => resp.json())
      .then(
        this.setState({
          books: []
        })
      )
      .then(this.addVerifiedBooksToState());
  };

  resetBooks = () => {
    this.fetchBooksFromSever()
      .then(
        this.setState({
          books: []
        })
      )
      .then(this.addVerifiedBooksToState());
  };

  setSortBy = e => {
    this.setState({ sortBy: e.target.value });
  };

  getSortedBooks = () => {
    if (this.state.sortBy === "Alphabetically") {
      return this.state.books.sort((a, b) =>
        a.volumeInfo.title.localeCompare(b.volumeInfo.title)
      );
    } else if (this.state.sortBy === "Price") {
      return this.state.books.sort(
        (a, b) => a.saleInfo.retailPrice.amount - b.saleInfo.retailPrice.amount
      );
    } else if (this.state.sortBy === "All") {
      return this.state.books;
    }
  };

  updateStateInformation = cart => {
    this.fetchUsersFromServer().then(this.addUserToState());
  };

  // fetchFilteredBooksFromServer = genre => {
  //   return fetch(
  //     BASEURL +
  //       `?q=%22%22+subject:${genre}&printType=books&orderBy=newest&maxResults=40&langRestrict=en`
  //   )
  //     .then(resp => resp.json())
  //     .then(data => this.setState({ [genre]: data.items }));
  // };

  render() {
    return (
      <Router>
        <div className="App">
          <NavBar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route
              path="/login"
              exact
              render={() => (
                <Login fetchUsers={this.fetchUsers} setUser={this.setUser} />
              )}
            />
            <Route
              path="/books"
              exact
              render={props => (
                <Books
                  {...props}
                  books={this.getSortedBooks()}
                  getFilteredBooksFromServer={this.getFilteredBooksFromServer}
                  resetBooks={this.resetBooks}
                  setSortBy={this.setSortBy}
                />
              )}
            />
            <Route
              path="/fiction"
              exact
              render={() => <Fiction books={this.state.fiction} />}
            />
            <Route
              path="/books/:id"
              exact
              render={props => (
                <BookInformation
                  {...props}
                  usersCart={this.state.currentUsersCartBooks}
                  updateInformation={this.updateStateInformation}
                  usersWishlist={this.state.currentUsersWishlist}
                  currentUser={this.state.currentUser}
                />
              )}
            />
            <Route
              path="/orders"
              exact
              render={() => (
                <Orders
                  user={this.state.currentUser}
                  orders={this.state.currentUsersOrders}
                />
              )}
            />
            <Route path="/orders/:id" exact component={OrderInformation} />
            <Route
              path="/cart"
              exact
              render={() => (
                <Cart
                  updateCart={this.updateStateInformation}
                  user={this.state.currentUser}
                  cartBooks={this.state.currentUsersCartBooks}
                />
              )}
            />
            <Route
              path="/wishlists"
              exact
              render={() => (
                <Wishlists
                  updateWishlist={this.updateStateInformation}
                  user={this.state.currentUser}
                  wishlist={this.state.currentUsersWishlist}
                />
              )}
            />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}
export default App;
