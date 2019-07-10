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
    return fetch(`https://a-novel-idea.herokuapp.com/books`, {
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
    return fetch(`https://a-novel-idea.herokuapp.com/books`, {
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
      <div className="wrapper">
        <div className="sideA" />
        <div className="leftBox">
          <img
            className="bookImage"
            src={this.state.image}
            alt={this.state.book.title}
          />
          <h2 className="bookAuthor">By {this.state.book.authors}</h2>
          <h3 className="bookPriceLink">£{this.state.price.amount}</h3>
        </div>
        <div className="rightBox">
          <h1 className="bookTitle">{this.state.book.title}</h1>
          <h3 className="bookPublisher">
            Publisher: {this.state.book.publisher}
          </h3>
          <h4 className="bookPublishedDate">
            Published: {this.state.book.publishedDate}
          </h4>
          <h4 className="bookPageCount">
            Page Count: {this.state.book.pageCount}
          </h4>
          <h4 className="bookGenre"> Genres: {this.state.genre}</h4>
          <div>
            {this.renderWishButton()}
            {this.renderCartButton()}
          </div>
        </div>
        <div className="sideB" />
        <div className="bottomBox">
          <p
            className="bookDescription"
            dangerouslySetInnerHTML={{ __html: this.state.book.description }}
          />
        </div>
      </div>
    );
  }
}

export default BookInformation;
