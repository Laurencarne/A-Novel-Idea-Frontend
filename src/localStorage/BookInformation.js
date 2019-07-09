import React, { Component } from "react";
import { Link } from "react-router-dom";

const BASEURL = "https://www.googleapis.com/books/v1/volumes";

let basket = [];
const save = (key, value) => localStorage.setItem(key, JSON.stringify(value));

class BookInformation extends Component {
  state = {
    clicked: false,
    book: [],
    image: {},
    genre: [],
    price: {},
    id: ""
  };

  handleCartClick = () => {
    this.setState({
      clicked: true
    });
    basket = [...basket, this.setBookDetails()];
    save("basket", basket);
  };

  componentDidMount() {
    fetch(BASEURL + `/${this.props.match.params.id}`)
      .then(resp => resp.json())
      .then(data =>
        this.setState({
          book: data.volumeInfo,
          image: data.volumeInfo.imageLinks,
          genre: data.volumeInfo.categories[0],
          price: data.saleInfo.listPrice,
          id: data.id
        })
      );
  }

  renderCartButton = () => {
    if (!localStorage.getItem("basket").includes(this.state.id)) {
      return (
        <>
          <button onClick={this.handleCartClick}> Add to Cart </button>
        </>
      );
    } else {
      return (
        <>
          <Link to="/cart" style={{ textDecoration: "none" }}>
            <button> View Cart </button>
          </Link>
        </>
      );
    }
  };

  // renderWishButton = () => {
  //   if (!localStorage.getItem("basket").includes(this.state.id)) {
  //     return (
  //       <>
  //         <button onClick={this.handleWishClick}> Add to WishList </button>
  //       </>
  //     );
  //   } else {
  //     return (
  //       <>
  //         <Link to="/wishlists" style={{ textDecoration: "none" }}>
  //           <button> View WishList </button>{" "}
  //         </Link>
  //       </>
  //     );
  //   }
  // };

  // handleWishClick = e => {
  //   console.log("Clicked");
  //   e.preventDefault();
  //   this.addBookToServerWishlist(this.setBookDetails());
  // };

  // addBookToServerWishlist = book => {
  //   return fetch(`http://localhost:3000/wishlists`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify(book)
  //   }).then(resp => resp.json());
  // };

  setBookDetails = () => {
    const book = {
      id: this.state.id,
      title: this.state.book.title,
      author: this.state.book.authors.join(),
      price: this.state.price.amount,
      image: this.state.image.thumbnail,
      publisher: this.state.book.publisher,
      description: this.state.book.description,
      genre: this.state.genre,
      publishedDate: this.state.book.publishedDate,
      pageCount: this.state.book.pageCount
    };
    return book;
  };

  render() {
    return (
      <div>
        <h1 className="bookTitle">{this.state.book.title}</h1>
        <img
          className="bookImage"
          src={this.state.image.thumbnail}
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
        {this.renderCartButton()}
      </div>
    );
  }
}

export default BookInformation;
