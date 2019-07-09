import React, { Component } from "react";
import { Link } from "react-router-dom";

const BASEURL = "https://www.googleapis.com/books/v1/volumes";

class BookInformation extends Component {
  state = {
    book: [],
    image: {},
    genre: [],
    price: {}
  };

  componentDidMount() {
    return fetch(BASEURL + `/${this.props.match.params.id}`)
      .then(resp => resp.json())
      .then(data => {
        if (
          data.volumeInfo &&
          data.volumeInfo.imageLinks.thumbnail &&
          data.volumeInfo.categories &&
          data.saleInfo.listPrice
        ) {
          this.setState({
            book: data.volumeInfo,
            image: data.volumeInfo.imageLinks.thumbnail,
            genre: data.volumeInfo.categories[0],
            price: data.saleInfo.listPrice
          });
        }
      });
  }

  renderCartButton = () => {
    if (
      !this.props.usersCart
        .map(book => book.book.google_id)
        .includes(this.props.match.params.id)
    ) {
      return (
        <>
          <button onClick={this.handleCartClick}> Add to Cart </button>
        </>
      );
    } else {
      return (
        <>
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <button className="selected"> View Cart </button>
          </Link>
        </>
      );
    }
  };

  renderWishButton = () => {
    if (
      !this.props.usersWishlist
        .map(book => book.book.google_id)
        .includes(this.props.match.params.id)
    ) {
      return (
        <>
          <button onClick={this.handleWishClick}> Add to WishList </button>
        </>
      );
    } else {
      return (
        <>
          <Link to="/wishlists" style={{ textDecoration: "none" }}>
            <button className="selected"> View WishList </button>
          </Link>
        </>
      );
    }
  };

  handleCartClick = e => {
    e.preventDefault();
    this.addBookToServerCart(this.setCartBookDetails());
  };

  addBookToServerCart = book => {
    return fetch(`http://localhost:3000/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(book)
    }).then(data => this.props.updateInformation());
  };

  setCartBookDetails = () => {
    const book = {
      book: {
        cart_id: this.props.currentUser.cart.id,
        google_id: this.props.match.params.id,
        title: this.state.book.title,
        author: this.state.book.authors.join(),
        price: this.state.price.amount,
        image: this.state.image,
        publisher: this.state.book.publisher,
        description: this.state.book.description,
        genre: this.state.genre,
        publishedDate: this.state.book.publishedDate,
        pageCount: this.state.book.pageCount
      }
    };
    return book;
  };

  handleWishClick = e => {
    e.preventDefault();
    this.addBookToServerWishlist(this.setWishlistBookDetails());
  };

  addBookToServerWishlist = book => {
    return fetch(`http://localhost:3000/books`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(book)
    })
      .then(resp => resp.json())
      .then(data => this.props.updateInformation());
  };

  setWishlistBookDetails = () => {
    const book = {
      book: {
        wishlist_id: this.props.currentUser.wishlist.id,
        google_id: this.props.match.params.id,
        title: this.state.book.title,
        author: this.state.book.authors.join(),
        price: this.state.price.amount,
        image: this.state.image,
        publisher: this.state.book.publisher,
        description: this.state.book.description,
        genre: this.state.genre,
        publishedDate: this.state.book.publishedDate,
        pageCount: this.state.book.pageCount
      }
    };
    return book;
  };

  render() {
    return (
      <div className="container">
        <h1 className="bookTitle">{this.state.book.title}</h1>
        <img
          className="bookImage"
          src={this.state.image}
          alt={this.state.book.title}
        />
        <h2 className="bookAuthor">{this.state.book.authors}</h2>
        <p className="bookPriceLink">£{this.state.price.amount}</p>
        <h3 className="bookPublisher">
          Publisher: {this.state.book.publisher}
        </h3>
        <h4 className="bookPublishedDate">
          Published: {this.state.book.publishedDate}
        </h4>
        <h6 className="bookPageCount">
          Page Count: {this.state.book.pageCount}
        </h6>
        <h6 className="bookGenre"> Genres: {this.state.genre}</h6>
        <p
          className="bookDescription"
          dangerouslySetInnerHTML={{ __html: this.state.book.description }}
        />
        <div>
          {this.renderWishButton()}
          {this.renderCartButton()}
        </div>
      </div>
    );
  }
}

export default BookInformation;
