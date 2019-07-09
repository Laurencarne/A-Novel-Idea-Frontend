import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import BookBar from "./BookBar";
import Slider from "./Slider";

const BASEURL = "https://www.googleapis.com/books/v1/volumes";

class Home extends Component {
  state = {
    redirect: false,
    index: 0,
    fictionBooks: [],
    juvenileFiction: [],
    education: []
  };

  componentDidMount() {
    this.fetchFilteredBooksForBookbarFromServer("Fiction").then(
      this.addVerifiedBooksToState("data", "Fiction")
    );
    this.fetchFilteredBooksForBookbarFromServer("Juvenile Fiction").then(
      this.addVerifiedBooksToState("data", "Juvenile Fiction")
    );
    this.fetchFilteredBooksForBookbarFromServer("Education").then(
      this.addVerifiedBooksToState("data", "Education")
    );
  }

  fetchFilteredBooksForBookbarFromServer = genre => {
    return fetch(
      BASEURL +
        `?q=%22%22+subject:"${genre}"&printType=books&orderBy=newest&maxResults=40&langRestrict=en`
    ).then(resp => resp.json());
  };

  addVerifiedBooksToState = (data, category) => {
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
          if (category === "Fiction") {
            this.setFictionBooksState(book);
          } else if (category === "Juvenile Fiction") {
            this.setJuvenileFictionBooksState(book);
          } else if (category === "Education") {
            this.setEducationBooksState(book);
          }
        }
      });
  };

  setFictionBooksState = book => {
    this.setState({
      fictionBooks: [...this.state.fictionBooks, book]
    });
  };

  setJuvenileFictionBooksState = book => {
    this.setState({
      juvenileFiction: [...this.state.juvenileFiction, book]
    });
  };

  setEducationBooksState = book => {
    this.setState({
      education: [...this.state.education, book]
    });
  };

  //////////////////////////////
  //SLIDER
  //////////////////////////////
  handleSliderClick = () => {
    this.setState({
      redirect: !this.state.redirect
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/books" />;
    }
  };
  //////////////////////////////
  //BOOKBAR
  //////////////////////////////
  nextBooks = booksState => {
    if (this.state.index >= booksState.length - 16) {
      this.setState({
        index: 0
      });
    } else {
      this.setState({
        index: this.state.index + 6
      });
    }
  };

  prevBooks = booksState => {
    if (this.state.index === 0) {
      this.setState({
        index: booksState.length - 6
      });
    } else if (this.state.index <= 16) {
      this.setState({
        index: 0
      });
    } else {
      this.setState({
        index: this.state.index - 6
      });
    }
  };
  //////////////////////////////
  //RENDER
  //////////////////////////////
  render() {
    let moreFictionBooks = this.state.fictionBooks.slice(
      this.state.index,
      this.state.index + 6
    );
    let moreJuvenileBooks = this.state.juvenileFiction.slice(
      this.state.index,
      this.state.index + 6
    );
    let moreEducationBooks = this.state.education.slice(
      this.state.index,
      this.state.index + 6
    );
    return (
      <div>
        <Slider handleSliderClick={this.handleSliderClick} />
        <BookBar
          nextBooks={() => this.nextBooks(this.state.fictionBooks)}
          prevBooks={() => this.prevBooks(this.state.fictionBooks)}
          moreBooks={moreFictionBooks}
          genre={"Fiction"}
        />
        <BookBar
          nextBooks={() => this.nextBooks(this.state.juvenileFiction)}
          prevBooks={() => this.prevBooks(this.state.juvenileFiction)}
          genre={"Young Adult"}
          moreBooks={moreJuvenileBooks}
        />
        <BookBar
          nextBooks={() => this.nextBooks(this.state.education)}
          prevBooks={() => this.prevBooks(this.state.education)}
          genre={"Education"}
          moreBooks={moreEducationBooks}
        />
        {this.renderRedirect()}
      </div>
    );
  }
}

export default Home;
