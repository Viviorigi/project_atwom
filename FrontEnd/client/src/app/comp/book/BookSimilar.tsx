import { Link, useLocation } from "react-router-dom";
import { books } from "../../data/data";
import { Section } from "../../styles/styles";
import Title from "../common/Title";
import BookList from "./BookList";
import { useEffect, useState } from "react";
import axios from "axios";
import imageBookDefault from "../../../assets/images/imageBookDefault.png"
import { BookDTO } from "../../model/BookDTO";
import styled from "styled-components";
import { breakpoints } from "../../styles/themes/default";

const BookListWrapper = styled.div`
  // column-gap: 20px;
  // row-gap: 40px;
  // grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));

  // @media (max-width: ${breakpoints.sm}) {
  //   gap: 12px;
  //   grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  // }
  
  display: flex;
  flex-direction: column;
  gap: 20px;

  .book-grid {
    display: grid;
    column-gap: 20px;
    row-gap: 40px;
    grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
    margin-bottom: 20px; /* Đảm bảo khoảng cách với phân trang */
    
    @media (max-width: 576px) {
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
  }

  .pagination-container {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;

const ProductSimilar = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('bookId');

  const [bookList, setBookList] = useState([]);
  useEffect(() => {
    let url = `${process.env.REACT_APP_API_URL}/book/similar?id=${id}`;
    axios.get(url).then((resp: any) => {
      if (resp.data) {
        // console.log("test similar");
        // console.log(resp.data);
        
        setBookList(resp.data);
      }
    }).catch((err: any) => {

    })
  }, [id])

  return (
    <Section>
      <Title titleText={"Sản phẩm tương tự"} />
      {/* <BookList products={books.slice(0, 4)} /> */}

      <BookListWrapper className="grid">
        <div className="book-grid">
          {bookList.map((book: any) => (
            <div key={book.id}> 
              <div className="product-img">
                <Link to={`/book/details/?bookId=${book.id}`}>
                  <img
                    src={book.image ? `${process.env.REACT_APP_API_URL}/getImage?atchFleSeqNm=${book.image}` : imageBookDefault} onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;  
                      target.src = imageBookDefault;  
                    }}
                    alt={book.title || 'Image not available'}
                    width="288px"
                    height="399px"
                  />
                </Link>
              </div>
              <div className="product-info">
                <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#4a4e52', margin: '0' }}>{book.title}</p>
                <p style={{ fontSize: '16px', fontWeight: 'normal', color: '#4a4e52', margin: '5px 0 0 0' }}>{book.publisher}</p>
              </div>
            </div>
          ))}

        </div>
      </BookListWrapper>
    </Section>
  );
};

export default ProductSimilar;
