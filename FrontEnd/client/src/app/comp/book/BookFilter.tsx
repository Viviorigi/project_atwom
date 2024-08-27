import { useEffect, useState } from "react";
import {
  ColorsFilter,
  FilterTitle,
  FilterWrap,
  PriceFilter,
  ProductCategoryFilter,
  SizesFilter,
  StyleFilter,
} from "../../styles/filter";
import { staticImages } from "../../utils/images";
import { ProductFilterList, StyleFilterList } from "../../data/data";
import { BookSearch } from "./book-search";
import axios from "axios";
import "../../../assets/css/book/book-filter.scss";

interface BookFilterProps {
  searchDto: BookSearch; // Prop nhận đối tượng BookSearch
  setSearchDto: React.Dispatch<React.SetStateAction<BookSearch>>;
}

interface FilterState {
  nxb: string; // Nhà xuất bản
  public_year: number; // Năm xuất bản
  cate_name: string; // Tên danh mục
}

// const BookFilter = ({ onFilterChange }) => {
const BookFilter: React.FC<BookFilterProps> = ({ searchDto, setSearchDto }) => {
  const [isProductFilterOpen, setProductFilterOpen] = useState(true);
  const [isPriceFilterOpen, setPriceFilterOpen] = useState(true);
  const [isColorFilterOpen, setColorFilterOpen] = useState(true);
  const [isSizeFilterOpen, setSizeFilterOpen] = useState(true);
  const [isStyleFilterOpen, setStyleFilterOpen] = useState(true);

  //---------------------------------------------------------------------
  const [bookList, setBookList] = useState([]);
  const [publisherList, setPublisherList] = useState([]);
  const [publishYearList, setPublishTearList] = useState([]);
  const [cateNameList, setCateNameList] = useState([]);
  const [nxbList, setNxbList] = useState([]);

  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    nxb: '',
    public_year: 0,
    cate_name: '',
  });

  useEffect(() => {
    setSearchDto({
      ...searchDto,
      cate_name: '',
      nxb: '',
      public_year: 0
      // timer:new Date().getTime()
    })
  }, [searchDto.keySearch])


  useEffect(() => {
    let url = `http://localhost:8080/book/list/all/filter?keySearch=${searchDto.keySearch}`;
    axios.get(url).then((resp: any) => {
      if (resp.data) {
        setBookList(resp.data);;
      }
    }).catch((err: any) => {

    })
  }, [searchDto.keySearch])

  useEffect(() => {
    let url = `http://localhost:8080/book/filter/publisher`;
    axios.post(url, bookList).then((resp: any) => {
      if (resp.data) {
        if (searchDto.keySearch == '') {
          setPublisherList([]);
        } else {
          setPublisherList(resp.data);
        }
        // console.log("Tác giả là: ");
        // console.log(resp.data);
      }
    }).catch((err: any) => {

    })
  }, [searchDto.timer])

  useEffect(() => {
    let url = `http://localhost:8080/book/filter/publishYear`;
    axios.post(url, bookList).then((resp: any) => {
      if (resp.data) {
        if (searchDto.keySearch == '') {
          setPublishTearList([]);
        } else {
          // console.log("Năm xuất bản: ");
          // console.log(resp.data);
          setPublishTearList(resp.data);
        }
      }
    }).catch((err: any) => {

    })
  }, [searchDto.timer])

  useEffect(() => {
    let url = `http://localhost:8080/book/filter/cateName`;
    axios.post(url, bookList).then((resp: any) => {
      if (resp.data) {
        if (searchDto.keySearch == '') {
          setCateNameList([]);
        } else {
          // console.log("Tên danh mục: ");
          // console.log(resp.data);
          setCateNameList(resp.data);
        }
      }
    }).catch((err: any) => {

    })
  }, [searchDto.timer])

  useEffect(() => {
    let url = `http://localhost:8080/book/filter/nxb`;
    axios.post(url, bookList).then((resp: any) => {
      if (resp.data) {
        if (searchDto.keySearch == '') {
          setNxbList([]);
        } else {
          // console.log("Tên danh mục: ");
          // console.log(resp.data);
          setNxbList(resp.data);
        }
      }
    }).catch((err: any) => {

    })
  }, [searchDto.timer])

  //------------------------------Xét giá trị cho filter-------------------------------------
  const handleFilterClick = (filterType: any, value: any) => {
    setSearchDto({
      ...searchDto,
      [filterType]: value,
      timer: new Date().getTime()
    });

    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: value,
    }));
  };
  //End of------------------------------Xét giá trị cho filter--------------------------
  // -------------Nút x----------------------------------------------------------------
  const clearFilter = (filterType: keyof FilterState) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: '',
    }));
    setSearchDto({
      ...searchDto,
      [filterType]: '',
      timer: new Date().getTime()
    });
  };
  // --------------------------------------------------------------------------


  const toggleFilter = (filter: any) => {
    switch (filter) {
      case "product":
        setProductFilterOpen(!isProductFilterOpen);
        break;
      case "price":
        setPriceFilterOpen(!isPriceFilterOpen);
        break;
      case "color":
        setColorFilterOpen(!isColorFilterOpen);
        break;
      case "size":
        setSizeFilterOpen(!isSizeFilterOpen);
        break;
      case "style":
        setStyleFilterOpen(!isStyleFilterOpen);
        break;
      default:
        break;
    }
  };

  const rangeMin = 100;
  const [minRange, setMinRange] = useState(300);
  const [maxRange, setMaxRange] = useState(700);

  const handleInputChange = (e: any) => {
    const inputName = e.target.name;
    const inputValue = parseInt(e.target.value);

    if (inputName === "min") {
      setMinRange(inputValue);
      if (maxRange - inputValue < rangeMin) {
        setMaxRange(inputValue + rangeMin);
      }
    } else if (inputName === "max") {
      setMaxRange(inputValue);
      if (inputValue - minRange < rangeMin) {
        setMinRange(inputValue - rangeMin);
      }
    }
  };

  const calculateRangePosition = (value: any, max: any) => {
    return (value / max) * 100 + "%";
  };

  return (
    <>
      <ProductCategoryFilter>
        {/* ----------------------------------------Lọc theo nhà xuất bản  --------------------*/}
        <FilterTitle
          className="filter-title flex items-center justify-between"
          onClick={() => toggleFilter("product")}
        >
          <p className="filter-title-text text-gray text-base font-semibold text-lg">
            Lọc theo nhà xuất bản
          </p>
          <span
            className={`text-gray text-xxl filter-title-icon ${!isProductFilterOpen ? "rotate" : ""
              }`}
          >
            <i className="bi bi-filter"></i>
          </span>
        </FilterTitle>
        <FilterWrap className={`${!isProductFilterOpen ? "hide" : "show"}`}>
          {nxbList?.map((data, index) => {
            return (
              <div className="product-filter-item" key={index}>
                <button
                  type="button"
                  className={`filter-item-head w-full flex items-center justify-between ${selectedFilters.nxb === data ? 'selected' : ''}`}
                  onClick={() => handleFilterClick('nxb', data)}
                >
                  <div style={{ textAlign: 'left' }}>
                    <span className="filter-head-title text-base text-gray font-semibold">
                      {data}
                    </span>
                  </div>
                  <span className="filter-head-icon text-gray">
                    <i className="bi bi-chevron-right"></i>
                  </span>
                </button>

                {selectedFilters.nxb === data && (
                  <button
                    className="clear-filter-btn"
                    onClick={() => clearFilter('nxb')}
                  >
                    &times;
                  </button>
                )}
              </div>
            );
          })}
        </FilterWrap>
      </ProductCategoryFilter >

      {/* ----------------------------------------Lọc theo năm xuất bản --------------------*/}
      <PriceFilter>
        <FilterTitle
          className="filter-title flex items-center justify-between"
          onClick={() => toggleFilter("price")}
        >
          <p className="filter-title-text text-gray text-base font-semibold text-lg">
            Lọc theo năm xuất bản
          </p>
          <span
            className={`text-gray text-xl filter-title-icon ${!isPriceFilterOpen ? "rotate" : ""
              }`}
          >
            <i className="bi bi-chevron-up"></i>
          </span>
        </FilterTitle>

        <FilterWrap
          className={`range filter-wrap ${!isPriceFilterOpen ? "hide" : "show"}`}>
          {publishYearList?.map((data, index) => {
            return (
              <div className="product-filter-item" key={index}>
                <button
                  type="button"
                  // className="filter-item-head w-full flex items-center justify-between"
                  className={`filter-item-head w-full flex items-center justify-between ${selectedFilters.public_year === data ? 'selected' : ''}`}
                  onClick={() => handleFilterClick('public_year', data)}
                >
                  {/* <span className="filter-head-title text-base text-gray font-semibold">
                    {data}
                  </span> */}
                  <div style={{ textAlign: 'left' }}>
                    <span className="filter-head-title text-base text-gray font-semibold">
                      {data}
                    </span>
                  </div>
                  <span className="filter-head-icon text-gray">
                    <i className="bi bi-chevron-right"></i>
                  </span>
                </button>
                {selectedFilters.public_year === data && (
                  <button
                    className="clear-filter-btn"
                    onClick={() => clearFilter('public_year')}
                  >
                    &times;
                  </button>
                )}
              </div>
            );
          })}
        </FilterWrap>
      </PriceFilter>

      {/* <ColorsFilter>
     {/* <ColorsFilter>
        <FilterTitle
          className="flex items-center justify-between"
          onClick={() => toggleFilter("color")}
        >
          <p className="filter-title-text text-gray text-base font-semibold text-lg">
            Lọc theo nhà xuất bản
          </p>
          <span
            className={`text-gray text-xl filter-title-icon ${!isColorFilterOpen ? "rotate" : ""
              }`}
          >
            <i className="bi bi-chevron-up"></i>
          </span>
        </FilterTitle>
        <FilterWrap className={`${!isColorFilterOpen ? "hide" : "show"}`}>
        </FilterWrap>
      </ColorsFilter> */}

      {/* -----------------------------------Lọc theo tên danh mục---------------------------- */}
      <SizesFilter>
        <FilterTitle
          className="flex items-center justify-between"
          onClick={() => toggleFilter("size")}
        >
          <p className="filter-title-text text-gray text-base font-semibold text-lg">
            Lọc theo loại tài liệu
          </p>
          <span
            className={`text-gray text-xl filter-title-icon ${!isSizeFilterOpen ? "rotate" : ""
              }`}
          >
            <i className="bi bi-chevron-up"></i>
          </span>
        </FilterTitle>
        <FilterWrap className={`${!isSizeFilterOpen ? "hide" : "show"}`}>
          {cateNameList?.map((data, index) => {
            return (
              <div className="product-filter-item" key={index}>
                <button
                  type="button"
                  className={`filter-item-head w-full flex items-center justify-between ${selectedFilters.cate_name === data ? 'selected' : ''}`}
                  onClick={() => handleFilterClick('cate_name', data)}
                >
                  <div style={{ textAlign: 'left' }}>
                    <span className="filter-head-title text-base text-gray font-semibold">
                      {data}
                    </span>
                  </div>
                  <span className="filter-head-icon text-gray">
                    <i className="bi bi-chevron-right"></i>
                  </span>
                </button>
                {selectedFilters.cate_name === data && (
                  <button
                    className="clear-filter-btn"
                    onClick={() => clearFilter('cate_name')}
                  >
                    &times;
                  </button>
                )}
              </div>
            );
          })}
        </FilterWrap>
      </SizesFilter>

      {/* -----------------------------------Lọc theo đánh giá---------------------------- */}
      <StyleFilter onClick={() => toggleFilter("style")}>
        <FilterTitle className="flex items-center justify-between">
          <p className="filter-title-text text-gray text-base font-semibold text-lg">
            Lọc theo đánh giá
          </p>
          <span
            className={`text-gray text-xl filter-title-icon ${!isStyleFilterOpen ? "rotate" : ""
              }`}
          >
            <i className="bi bi-chevron-up"></i>
          </span>
        </FilterTitle>
        <FilterWrap className={`${!isStyleFilterOpen ? "hide" : "show"}`}>
          {/* {StyleFilterList?.map((styleFilter) => {
            return (
              <div className="style-filter-item" key={styleFilter.id}>
                <button
                  type="button"
                  className="filter-item-head w-full flex items-center justify-between"
                >
                  <span className="filter-head-title text-base text-gray font-semibold">
                    {styleFilter.title}
                  </span>
                  <span className="filter-head-icon text-gray">
                    <i className="bi bi-chevron-right"></i>
                  </span>
                </button>
              </div>
            );
          })} */}
        </FilterWrap>
      </StyleFilter>
    </>
  );
};

export default BookFilter;
