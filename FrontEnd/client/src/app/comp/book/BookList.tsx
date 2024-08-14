import styled from "styled-components";
import { books } from "../../data/data";
import  PropTypes  from "prop-types";
import { breakpoints } from "../../styles/themes/default";
import BookItem from "./BookItem";

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
  return (
    <BookListWrapper className="grid">
      {books?.map((book:any) => {
        return <BookItem key={book.id} product={book} />;
      })}
    </BookListWrapper>
  );
};

export default BookList;

BookList.propTypes = {
  products: PropTypes.array,
};
