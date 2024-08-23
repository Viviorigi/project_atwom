import styled from "styled-components";
import { books } from "../../data/data";
import PropTypes from "prop-types";
import { breakpoints } from "../../styles/themes/default";
import BookItem from "./BookItem";
import { useEffect, useState } from "react";
import axios from "axios";
import imageBookDefault from "../../../assets/images/imageBookDefault.png"
import { Link } from "react-router-dom";
import Pagination from "../../comp/common/Pagination"
import { BookSearch } from "./book-search";

const BookListWrapper = styled.div`
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

const BookList = () => {

  const [searchDto, setSearchDto] = useState(new BookSearch('', 1, 0, new Date().getTime()))
  const [bookList, setBookList] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  //Phân trang
  const handlePageClick = (pageNumber: any) => {
    setSearchDto(() => ({
      ...searchDto,
      page: pageNumber,
    }));
  };

  const prev = () => {
    if (searchDto.page > 1) {
      setSearchDto(() => ({
        ...searchDto,
        page: searchDto.page - 1,
      }));
    }
  };
  const next = () => {
    if (searchDto.page < totalPages) {
      setSearchDto(() => ({
        ...searchDto,
        page: searchDto.page + 1,
      }));
    }
    // console.log("page = ");
    // console.log(searchDto.page);


  };

  useEffect(() => {
    let url = `http://localhost:8080/book/list/all?page=${searchDto.page}&keySearch=${searchDto.keySearch}`;
    axios.get(url).then((resp: any) => {
      if (resp.data) {
        setBookList(resp.data.content);
        setTotalPages(resp.data.totalPages);
        setTotalItems(resp.data.totalElements);
      }
    }).catch((err: any) => {

    })
  }, [searchDto.page, searchDto.timer])
  return (
    <BookListWrapper className="grid">
      <div className="book-grid">
        {bookList.map((book: any) => (
          <div key={book.id}> {/* Đặt `key` trên phần tử chính */}
            <div className="product-img">
              {/* <Link to={`/book/details?id=${book.id}`}> */}
              <Link to={`/book/details/?bookId=${book.id}`}>

                <img
                  // className="object-fit-cover"
                  src={book.image ? `http://localhost:8080/getImage?atchFleSeqNm=${book.image}` : imageBookDefault} onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null; // Prevent infinite loop in case fallback image also fails
                    target.src = imageBookDefault; // Set the fallback image
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
      <div className="row align-items-center justify-content-between py-2 pe-0 fs--1">
        <div className="col-auto d-flex">
          {/* <p className="mb-0 d-none d-sm-block me-3 fw-semi-bold text-900" data-list-info="data-list-info"><span className='fw-bold'>Total books: </span>  {totalItems} </p> */}
        </div>
        <div className="col-auto d-flex pagination-container">
          <Pagination totalPage={totalPages} currentPage={searchDto.page} handlePageClick={handlePageClick} prev={prev} next={next} />
        </div>
      </div>


    </BookListWrapper>

  );

};

export default BookList;

BookList.propTypes = {
  products: PropTypes.array,
};
