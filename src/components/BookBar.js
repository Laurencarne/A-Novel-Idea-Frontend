import React, { Fragment } from "react";
import BookBarBook from "./BookBarBook";

const BookBar = props => {
  return (
    <Fragment>
      <h3 className="genreCatagories">Top {props.genre} Reads</h3>
      <div className="BookBarCard">
        <button className="bookBarDirections" onClick={props.prevBooks}>
          <i class="fas fa-angle-double-left fa-1x" aria-hidden="true" />
        </button>
        {props.moreBooks.map(book => (
          <BookBarBook key={book.id} book={book} />
        ))}
        <button className="bookBarDirections" onClick={props.nextBooks}>
          <i class="fas fa-angle-double-right fa-1x" aria-hidden="true" />
        </button>
      </div>
    </Fragment>
  );
};

export default BookBar;
