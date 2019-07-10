import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import BookBar from "./BookBar";
import Slider from "./Slider";

const BASEURL = "https://www.googleapis.com/books/v1/volumes";

class Home extends Component {
  state = {
    redirect: false,
    Fiction: 0,
    Juvenile: 0,
    Education: 0,
    fictionBooks: [],
    junvenileBooks: [],
    educationBooks: []
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
      junvenileBooks: [...this.state.junvenileBooks, book]
    });
  };

  setEducationBooksState = book => {
    this.setState({
      educationBooks: [...this.state.educationBooks, book]
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
  nextBooks = (booksState, category) => {
    if (category === "Fiction") {
      let index = this.state.Fiction;
      this.showNextBooks(index, booksState, category);
    } else if (category === "Juvenile") {
      let index = this.state.Juvenile;
      this.showNextBooks(index, booksState, category);
    } else if (category === "Education") {
      let index = this.state.Education;
      this.showNextBooks(index, booksState, category);
    }
  };

  showNextBooks = (index, booksState, category) => {
    if (index >= booksState.length - 12) {
      this.setState({
        [category]: 0
      });
    } else {
      this.setState({
        [category]: index + 6
      });
    }
  };

  prevBooks = (booksState, category) => {
    if (category === "Fiction") {
      let index = this.state.Fiction;
      this.showPrevBooks(index, booksState, category);
    } else if (category === "Juvenile") {
      let index = this.state.Juvenile;
      this.showPrevBooks(index, booksState, category);
    } else if (category === "Education") {
      let index = this.state.Education;
      this.showPrevBooks(index, booksState, category);
    }
  };

  showPrevBooks = (index, booksState, category) => {
    if (index === 0) {
      this.setState({
        [category]: booksState.length - 6
      });
    } else if (index <= 6) {
      this.setState({
        [category]: 0
      });
    } else {
      this.setState({
        [category]: index - 6
      });
    }
  };

  //////////////////////////////
  //RENDER
  //////////////////////////////
  render() {
    let moreFictionBooks = this.state.fictionBooks.slice(
      this.state.Fiction,
      this.state.Fiction + 6
    );
    let moreJuvenileBooks = this.state.junvenileBooks.slice(
      this.state.Juvenile,
      this.state.Juvenile + 6
    );
    let moreEducationBooks = this.state.educationBooks.slice(
      this.state.Education,
      this.state.Education + 6
    );
    return (
      <div>
        <Slider handleSliderClick={this.handleSliderClick} />
        <BookBar
          nextBooks={() => this.nextBooks(this.state.fictionBooks, "Fiction")}
          prevBooks={() => this.prevBooks(this.state.fictionBooks, "Fiction")}
          moreBooks={moreFictionBooks}
          genre={"Fiction"}
        />
        <BookBar
          nextBooks={() =>
            this.nextBooks(this.state.junvenileBooks, "Juvenile")
          }
          prevBooks={() =>
            this.prevBooks(this.state.junvenileBooks, "Juvenile")
          }
          genre={"Young Adult"}
          moreBooks={moreJuvenileBooks}
        />
        <BookBar
          nextBooks={() =>
            this.nextBooks(this.state.educationBooks, "Education")
          }
          prevBooks={() =>
            this.prevBooks(this.state.educationBooks, "Education")
          }
          genre={"Education"}
          moreBooks={moreEducationBooks}
        />
        {this.renderRedirect()}
      </div>
    );
  }
}

export default Home;
