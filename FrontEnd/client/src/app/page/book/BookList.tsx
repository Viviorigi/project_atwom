import styled from "styled-components";
import { FaStar } from 'react-icons/fa';
import { Container, ContentStylings, Section } from "../../styles/styles";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import Breadcrumb from "../../comp/common/Breadcrumb";
import { Link } from "react-router-dom";
import Title from "../../comp/common/Title";
import BookFilter from "../../comp/book/BookFilter";
import BookList from "../../comp/book/BookList";
import { books } from "../../data/data";
import imageBookDefault from "../../../assets/images/imageBookDefault.png"
import { useEffect, useState } from "react";
import axios from "axios";
import { Input, InputGroupWrapper } from "../../styles/form";
import { Form, InputGroup, FormControl, Modal, Button } from 'react-bootstrap';
import { BookSearch } from "../../comp/book/book-search";
import Pagination from "../../comp/common/Pagination"
import "../../../assets/css/book/book-list.scss";

const ProductsContent = styled.div`
  grid-template-columns: 320px auto;
  margin: 20px 0;

  @media (max-width: ${breakpoints.xl}) {
    grid-template-columns: 260px auto;
  }

  @media (max-width: ${breakpoints.lg}) {
    grid-template-columns: 100%;
    row-gap: 24px;
  }
`;

const ProductsContentLeft = styled.div`
  border: 1px solid rgba(190, 188, 189, 0.4);
  border-radius: 12px;
  box-shadow: rgba(0, 0, 0, 0.05) 0 10px 50px;
  overflow: hidden;

  @media (max-width: ${breakpoints.lg}) {
    display: grid;
  }
`;

const ProductsContentRight = styled.div`
  padding: 16px 40px;

  .products-right-top {
    margin-bottom: 40px;
    @media (max-width: ${breakpoints.lg}) {
      margin-bottom: 24px;
    }
    @media (max-width: ${breakpoints.sm}) {
      flex-direction: column;
      row-gap: 16px;
      align-items: flex-start;
    }
  }

  .products-right-nav {
    column-gap: 16px;
    li {
      a.active {
        color: ${defaultTheme.color_purple};
      }
    }
  }

  @media (max-width: ${breakpoints.lg}) {
    padding-left: 12px;
    padding-right: 12px;
  }

  @media (max-width: ${breakpoints.sm}) {
    padding-left: 0;
    padding-right: 0;
  }

  .product-card-list {
    grid-template-columns: repeat(auto-fill, repeat(290px, auto));
  }

  .product-card {
    padding-left: 0;
    padding-right: 0;
  }
`;

const DescriptionContent = styled.div`
  .content-stylings {
    margin-left: 32px;
    @media (max-width: ${breakpoints.sm}) {
      margin-left: 0;
    }
  }
`;

const ModalHeader = styled(Modal.Header)`
  border-bottom: 0;
`;

const ModalBody = styled(Modal.Body)`
  background-color: #f8f9fa;
  padding: 2rem;
`;

const CustomSelect = styled(Form.Control)`
  border-radius: 0;
  box-shadow: none;
`;

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


const BookListItem = () => {

  const [bookList, setBookList] = useState([]);
  // constructor(keySearch: string, cate_name: string, public_year: number, nxb: string, page: number, cate_id: number, timer: number)
  const [searchDto, setSearchDto] = useState(new BookSearch('', '', 0, '', 1, 0, new Date().getTime()))
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState(0);

  const [totalItemsElements, setTotalItemsElements] = useState(0);


  // Hàm xử lý dữ liệu từ BookFilter
  const handleFilterChange = (filterSelect: any) => {
    // console.log("đã truyền thành công");
    // console.log(filterSelect);

  };

  useEffect(() => {
    let url = `${process.env.REACT_APP_API_URL}/book/list/all?page=${searchDto.page}&keySearch=${searchDto.keySearch}&cateId=${searchDto.cate_id}&cateName=${searchDto.cate_name}&publicYear=${searchDto.public_year}&nxb=${searchDto.nxb}`;
    axios.get(url).then((resp: any) => {
      if (resp.data) {
        // console.log("Test dữ liệu");
        // console.log(resp.data);

        setBookList(resp.data.content);
        setTotalPages(resp.data.totalPages);
        setTotalItems(resp.data.totalElements);

      }
    }).catch((err: any) => {

    })
  }, [searchDto.page, searchDto.timer])

  // xử lý khi chữ thay đổi
  const handleChangeText = (event: any) => {
    setSearchDto({
      ...searchDto,
      [event.target.name]: event.target.value
    });
  }

  //
  const handleKeyUpSearch = (e: any) => {
    if (e.key === "Enter") {
      setSearchDto({
        ...searchDto,
        page: 1,
        timer: new Date().getTime(),
      });
    }
  };

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
  };

  const breadcrumbItems = [
    { label: "Trang chủ", link: "/" },
    { label: "Sách", link: "" },
  ];
  return (

    <main className="page-py-spacing">

      <div className="col-auto" style={{ display: 'flex', justifyContent: 'center' }}>
        {/* Search input */}
        <div className="search-box" style={{ display: 'flex', width: '50%' }}>
          {/* search input */}
          <input
            className="form-control search-input"
            type="search"
            placeholder="Search book"
            name="keySearch"
            aria-label="Search"
            value={searchDto.keySearch || ""}
            onChange={handleChangeText}
            onKeyUp={handleKeyUpSearch}
            style={{ flex: 1, marginRight: '0.5rem' }} // Chiếm hết không gian còn lại
          />
          <button
            className='btn btn-primary'
            onClick={() => {
              setSearchDto({
                ...searchDto,
                page: 1,
                timer: new Date().getTime(),
              });
            }}
            style={{ whiteSpace: 'nowrap' }} // Đảm bảo text không bị cắt
          >
            <span className="fas fa-search" />
          </button>
        </div>
      </div>
      <Container>
        <Breadcrumb items={breadcrumbItems} />
        <ProductsContent className="grid items-start">
          <ProductsContentLeft>
            <BookFilter searchDto={searchDto} setSearchDto={setSearchDto} />
            {/* <p>Filter là {selectedFilter}</p> */}
          </ProductsContentLeft>
          <ProductsContentRight>
            <div className="products-right-top flex items-center justify-between">
              <h4 className="text-xxl">A2m&apos;s Libary</h4>
              <ul className="products-right-nav flex items-center justify-end flex-wrap">
                <li>
                  <Link to="/" className="active text-lg font-semibold">
                    {/* New */}
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-lg font-semibold">
                    {/* Recommended */}
                  </Link>
                </li>
              </ul>
            </div>

            {/* đổ dữ liệu ở đây  */}
            {/* <BookList products={books.slice(0, 12)} /> */}
            <div className="no-records">Có <span>{totalItems}</span> bản ghi </div>
            <BookListWrapper className="grid">
              <div className="book-grid">
                {bookList.map((book: any) => (
                  <div key={book.id}> {/* Đặt `key` trên phần tử chính */}
                    <div className="product-img">
                      {/* <Link to={`/book/details?id=${book.id}`}> */}
                      <Link to={`/book/details/?bookId=${book.id}`}>
                        <img
                          // className="object-fit-cover"
                          src={book.image ? `${process.env.REACT_APP_API_URL}/getImage?atchFleSeqNm=${book.image}` : imageBookDefault} onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null; // Prevent infinite loop in case fallback image also fails
                            target.src = imageBookDefault; // Set the fallback image
                          }}
                          alt={book.title || 'Image not available'}
                          width="288px"
                          height="399px"
                        />
                      </Link>
                      {/* <div className="rating-badge">{book.ave_rating ? book.ave_rating.toFixed(1) : 'N/A'}</div> */}
                      {book.ave_rating &&
                        <div className="rating-badge">
                          <FaStar style={{ marginRight: '5px' }} />
                          {book.ave_rating && book.ave_rating.toFixed(1)}
                        </div>}
                    </div>
                    <div className="product-info">
                      <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#4a4e52', margin: '0' }}>{book.title}</p>
                      <p style={{ fontSize: '16px', fontWeight: 'normal', color: '#4a4e52', margin: '5px 0 0 0' }}>{book.publisher}</p>
                      {/* <p>{book.ave_rating}</p> */}
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

          </ProductsContentRight>
        </ProductsContent>
      </Container>
      <Section>
        <Container>
          <DescriptionContent>
            <Title titleText={"Sách Cho Mọi Người Trực Tuyến"} />
            <ContentStylings className="text-base content-stylings">
              <h4>Bộ Sưu Tập Sách Trực Tuyến Tại Thư Viện.</h4>
              <p>
                Tại thư viện của chúng tôi, bạn sẽ tìm thấy một bộ sưu tập phong phú các loại sách từ nhiều thể loại khác nhau, từ văn học cổ điển đến sách hiện đại. Chúng tôi cung cấp các cuốn sách được chọn lọc kỹ lưỡng, giúp bạn khám phá thế giới tri thức và văn hóa một cách dễ dàng và thuận tiện.
              </p>
              <p>
                Sách không chỉ là nguồn kiến thức vô tận mà còn là người bạn đồng hành trong hành trình khám phá thế giới. Với các sách về lịch sử, khoa học, và các tác phẩm văn học nổi tiếng, chúng tôi mang đến cho bạn cơ hội để mở rộng tầm hiểu biết và làm giàu trí tuệ.
              </p>
              <h4>
                Điểm Đến Một Cửa Để Mua Sắm Trang Phục Cho Mọi Người: Thư Viện.
              </h4>
              <p>
                Ngoài việc cung cấp sách, thư viện của chúng tôi còn là điểm đến lý tưởng để bạn tìm kiếm và mua sắm các tài liệu học tập, sách hướng dẫn và các nguồn tài nguyên hỗ trợ học tập. Với một không gian thân thiện và tiện nghi, chúng tôi mong muốn tạo ra một môi trường học tập đầy cảm hứng cho tất cả mọi người.
              </p>
              <p>
                Hãy ghé thăm thư viện trực tuyến của chúng tôi và khám phá những cuốn sách tuyệt vời, giúp bạn nâng cao kiến thức và trải nghiệm những câu chuyện thú vị. Chúng tôi cam kết mang đến cho bạn những sản phẩm chất lượng và dịch vụ tận tâm.
              </p>
              <Link to="/">Xem Thêm</Link>
            </ContentStylings>

          </DescriptionContent>
        </Container>
      </Section>
    </main>
  );
};

export default BookListItem;
