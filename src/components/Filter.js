// const saveGenre = (books, category) => {
//   return books.filter(book => {
//     if (book.volumeInfo && book.volumeInfo.categories) {
//       return book.volumeInfo.categories.includes(category);
//     }
//   });
// };
//
// const getGenres = books => {
//   let genres = [];
//   books.forEach(book => {
//     if (book.volumeInfo && book.volumeInfo.categories) {
//       genres = [...genres, ...book.volumeInfo.categories];
//     }
//   });
//   return [...new Set(genres)];
// };
// export { saveGenre, getGenres };
