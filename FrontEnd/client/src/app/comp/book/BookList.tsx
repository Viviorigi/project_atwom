import styled from "styled-components";
import { books } from "../../data/data";
import PropTypes from "prop-types";
import { breakpoints } from "../../styles/themes/default";
import BookItem from "./BookItem";
import { useEffect, useState } from "react";
import axios from "axios";

const BookListWrapper = styled.div`
  column-gap: 20px;
  row-gap: 40px;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));

  @media (max-width: ${breakpoints.sm}) {
    gap: 12px;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
`;

const BookList = () => {

  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    let url = `http://localhost:8080/book/list/all`;
    axios.get(url).then((resp: any) => {
      if (resp.data) {
        setBookList(resp.data);
      }
    }).catch((err: any) => {

    })
  }, [])
  return (
    <BookListWrapper className="grid">
      {bookList.map((book: any) => (
        <div key={book.id}> {/* Đặt `key` trên phần tử chính */}
          <div className="product-img">
            <img
              className="object-fit-cover"
              src={book.image ? `http://localhost:8080/files/${book.image}` : 'path/to/default-image.png'}
              alt={book.title || 'Image not available'}
              width="100px"
              height="100px"
            />
          </div>
        </div>
      ))}
      {/* {books?.map((book: any) => {
        return <BookItem key={book.id} product={book} />;
      })} */}
    </BookListWrapper>
  );
};

export default BookList;

BookList.propTypes = {
  products: PropTypes.array,
};
