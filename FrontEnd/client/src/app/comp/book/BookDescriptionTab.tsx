import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { feedbackData, productDescriptionTabHeads } from "../../data/data";
import Title from "../common/Title";
import { ContentStylings } from "../../styles/styles";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import Cookies from 'universal-cookie';
import { AuthConstant } from '../../constants/authConstant';

import { BookDTO } from "../../model/BookDTO";
import { FeedBackDTO } from "../../model/feedback/FeedBackDTO";
import StarRatings from 'react-star-ratings';
import axios from "axios";
import { toast } from "react-toastify";
import { ApiUrlUtil } from "../../utils/ApiUrlUtil";
import { HeadersUtil } from "../../utils/Headers.Util";
import { UserDetail } from "../../model/auth/UserDetail";
import defaultPersonImage from "../../../assets/images/imagePerson.png"
import { format } from 'date-fns';

import "../../../assets/css/book/book-feedback.scss";

const DetailsContent = styled.div`
  margin-top: 60px;
  @media (max-width: ${breakpoints.lg}) {
    margin-top: 40px;
  }

  // .details-content-wrapper {
  //   grid-template-columns: auto 500px;
  //   gap: 40px;

  //   @media (max-width: ${breakpoints.xl}) {
  //     grid-template-columns: auto 400px;
  //   }

  //   @media (max-width: ${breakpoints.lg}) {
  //     grid-template-columns: 100%;
  //     gap: 24px;
  //   }
  }
`;

const StarBar = styled.div`
  position: relative;
  width: 100%;
  height: 20px;
  background-color: #e0e0e0;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const StarFill = styled.div`
  position: absolute;
  height: 100%;
  background-color: #f39c12;
  border-radius: 10px;
  transition: width 0.3s ease;
`;

const Label = styled.span`
  display: inline-block;
  width: 100px;
  font-weight: bold;
`;

const DescriptionTabsWrapper = styled.div`
  .tabs-heads {
    column-gap: 20px;
    row-gap: 16px;
    margin-bottom: 24px;

    @media (max-width: ${breakpoints.sm}) {
      flex-wrap: wrap;
      margin-bottom: 16px;
    }

    @media (max-width: ${breakpoints.xs}) {
      gap: 12px;
    }
  }

  .tabs-head {
    padding-bottom: 16px;
    position: relative;

    &-active {
      color: ${defaultTheme.color_outerspace};

      &::after {
        content: "";
        position: absolute;
        left: 0;
        top: 100%;
        width: 40px;
        height: 1px;
        background-color: ${defaultTheme.color_outerspace};
      }
    }

    @media(max-width: ${breakpoints.sm}){
        padding-bottom: 12px;
    }
  }

  .tabs-badge{
    width: 20px;
    height: 20px;
    border-radius: 4px;
    font-size: 10px;
    margin-left: 6px;

    &-purple{
        background-color: ${defaultTheme.color_purple};
    }

    &-outerspace{
        background-color: ${defaultTheme.color_outerspace};
    }
  }

  .tabs-contents{
    max-height: 400px;
    overflow-y: scroll;

    &::-webkit-scrollbar{
        width: 6px;
    }

    &::-webkit-scrollbar-track{
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
        border-radius: 12px;
    }

    &::-webkit-scrollbar-thumb{
        background-color: ${defaultTheme.color_platinum};
        border-radius: 12px;
    }
  }

  .tabs-content{
    display: none;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.02);

    &.show{
        display: block;
    }

    @media(max-width: ${breakpoints.sm}){
        padding: 12px;
    }
  }
`;

const BookDescriptionTab = (props: any) => {
  // const [book, setBook] = useState<BookDTO>(new BookDTO());
  const { book } = props;
  // console.log(book);
  const [feedBack, setFeedBack] = useState<FeedBackDTO>(new FeedBackDTO());
  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<UserDetail>(new UserDetail());

  const [feedBackList, setFeedBackList] = useState([]);
  const [ratingList, setRatingList] = useState([]);
  const cookie = new Cookies();

  useEffect(() => {
    if (cookie.get(AuthConstant.ACCESS_TOKEN)) {
      setIsLoggedIn(true);
      // console.log("Đã đăng nhập");
      // console.log(cookie.get(AuthConstant.ACCESS_TOKEN));
    } else {
      // console.log("Chưa hề đăng nhập");
    }
  }, [])

  useEffect(() => {
    const url = ApiUrlUtil.buildQueryString(`http://localhost:8080/get-info`);

    axios.post(url, {}, {
      headers: HeadersUtil.getHeadersAuth()
    })
      .then(response => {
        // console.log(response.data);
        setUserInfo(response.data);
      })
      .catch(error => {
        console.error("Error:", error.response ? error.response.data : error.message);
      });
  }, []);

  //--------------------------Lấy ra feedBack-------------------------------

  useEffect(() => {
    if (book?.id) {
      fetchFeedbackList();
    }
  }, [book?.id]);


  const fetchFeedbackList = () => {
    if (!book?.id) return; // Không làm gì nếu book.id không tồn tại

    const url = `http://localhost:8080/feedback/list?id=${book.id}`;
    axios.get(url)
      .then((resp: any) => {
        setFeedBackList(resp.data);
      })
      .catch((err: any) => {
        toast.error("Không thể lấy feedback");
      });
  };

  //--End lấy feed back-----------------------------------------------------

  //Xử lý feedBack-----------------------------------------------------------
  const changeRating = (newRating: any) => {
    setRating(newRating);
    setFeedBack((prevFeedBack) => ({
      ...prevFeedBack,
      rating: newRating,
    }));
  };

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
    setFeedBack((prevFeedBack) => ({
      ...prevFeedBack,
      comment: event.target.value,
      // upd_dt: new Date().toISOString()
    }));
    // console.log("feedback: ");
    // console.log(new Date().toISOString());
  };

  //-------------------------Lấy ra rating------------------------------------
  useEffect(() => {
    if (book?.id) {
      fetchRatingList();
    }
  }, [book?.id]);


  const fetchRatingList = () => {
    if (!book?.id) return; // Không làm gì nếu book.id không tồn tại

    const url = `http://localhost:8080/feedback/rating-counts?id=${book.id}`;
    axios.get(url)
      .then((resp: any) => {
        console.log("data: ");
        console.log(resp);
        setRatingList(resp.data);
      })
      .catch((err: any) => {
        toast.error("Không thể lấy feedback");
      });
  };

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error("Vui lòng xếp hạng trước khi gửi.")
      return; // Không gửi dữ liệu nếu rating chưa được chọn
    }
    save();
  };

  // --------------------------------Lưu feedBack--------------------------------
  const save = () => {
    if (book?.id) {
      feedBack.book_id = book?.id
    }
    if (userInfo != null && userInfo.userUid != null) {
      feedBack.user_id = userInfo.userUid;
    }
    setFeedBack((prevFeedBack) => ({
      ...prevFeedBack,
      // comment: event.target.value,
      upd_dt: new Date().toISOString()
    }));
    let url = `http://localhost:8080/feedback/add`;
    axios.post(url, feedBack, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((resp: any) => {
      if (resp.data === "success") {
        fetchFeedbackList();
        toast.success("Feed back thành công");
      }
    }).catch((err: any) => {
      // console.log(err);
      toast.error("Không thể lưu feedback");
    })
  }

  //End ---------Xử lý feedBack-----------------------------------------------------------
  //-------------------xử lý rating--------------------------------------------
  const getPercentage = (index: number) => {
    if (ratingList.length === 0) return 0;
    const total = ratingList.reduce((acc, curr) => acc + curr, 0);
    return (ratingList[index] / total) * 100;
  };


  const [activeDesTab, setActiveDesTab] = useState(
    productDescriptionTabHeads[0].tabHead
  );

  const handleTabChange = (tabHead: any) => {
    setActiveDesTab(tabHead);
  };
  return (
    <DetailsContent>
      <Title titleText={"Book Description"} />

      <div className="details-content-wrapper grid">
        <DescriptionTabsWrapper>

          <div className="tabs-heads flex items-center flex-wrap">
            {productDescriptionTabHeads.map((tab: any) => {
              return (
                <button
                  key={tab.id}
                  type="button"
                  className="tabs-head text-gray font-medium text-lg flex items-center"
                  onClick={() => handleTabChange(tab.tabHead)}
                >
                  <span
                    className={`${tab.tabHead === activeDesTab ? "text-sea-green" : ""
                      }`}
                  >
                    {tab.tabText}
                  </span>
                  {tab.badgeValue && (
                    <span
                      className={`tabs-badge inline-flex items-center justify-center text-white tabs-badge-${tab.badgeColor}`}
                    >
                      {tab.badgeValue}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="tabs-contents">
            <div
              className={`tabs-content ${activeDesTab === "tabDescription" ? "show" : ""
                }`}
            >
              <ContentStylings>
                {book?.description && <div className="align-middle text-start text-1100"
                  dangerouslySetInnerHTML={{ __html: book?.description }} />}

              </ContentStylings>
            </div>
            <div
              className={`tabs-content content-stylings ${activeDesTab === "tabComments" ? "show" : ""
                }`}
            >
              {/* <div className="container mt-4"> */}
              {/* ----------Feed back------------------------------------------------------------ */}
              <div className="container mt-4">

                <div className="row">
                  {/* Phần hiển thị phản hồi */}
                  <div className="col-md-6">

                    {ratingList.map((percentage, index) => (
                      <div key={index}>
                        <Label>⭐ {index + 1} Star</Label>
                        <StarBar>
                          <StarFill style={{ width: `${percentage}%` }} />
                        </StarBar>
                      </div>
                    ))}

                    {/* -----------Danh sách feed back --------------------------- */}
                    <div className="feedback-container">
                      {feedBackList.map((fb: any, index: any) => (
                        <div key={index} className="feedback-item">
                          <div className="feedback-header">
                            <div className="avatar-container">
                              <img
                                src={fb.user_avatar ? `http://localhost:8080/api/auth/getImage?atchFleSeqNm=${fb.user_avatar}` : defaultPersonImage}
                                alt="PersonAvatar"
                                style={{
                                  width: '50px',
                                  height: '50px',
                                  borderRadius: '50%',
                                  objectFit: 'cover'
                                }}
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.onerror = null;
                                  target.src = defaultPersonImage;
                                }}
                              />
                            </div>
                            <div className="feedback-content">
                              <div className="user-info">
                                <strong className="user-name">{fb.user_name}</strong>
                              </div>
                              <div className="user-rating">
                                <StarRatings
                                  rating={fb.rating || 0} // Ensure you have a rating property in your feedback data
                                  starRatedColor="#34B7F1"
                                  numberOfStars={5}
                                  starDimension="20px"
                                  starSpacing="2px"
                                  name="rating"
                                // isSelectable={false}
                                />
                              </div>
                              <p className="feedback-comment">{fb.comment}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* -------------------------------------------------- */}
                  </div>

                  {/* Phần đánh giá và bình luận */}
                  <div className="col-md-6">
                    {isLoggedIn &&
                      <div className="card p-3">
                        <h4 className="card-title">Đánh giá của bạn</h4>

                        {/* StarRatings component */}
                        <div className="d-flex justify-content-center mb-3">
                          <StarRatings
                            rating={rating}
                            starRatedColor="yellow"
                            changeRating={changeRating}
                            numberOfStars={5}
                            name='rating'
                          />
                        </div>

                        {/* Comment input */}
                        <div className="form-group">
                          <label htmlFor="comment">Bình luận:</label>
                          <textarea
                            id="comment"
                            className="form-control"
                            rows={4}
                            placeholder="Nhập bình luận của bạn"
                            value={comment}
                            onChange={handleCommentChange}
                          />
                        </div>
                        <button
                          className={`btn btn-primary ${!isLoggedIn ? 'disabled' : ''}`}
                          onClick={handleSubmit}
                          disabled={!isLoggedIn}
                        >
                          Gửi
                        </button>
                      </div>
                    }

                    {
                      isLoggedIn ||
                      <div className="login-prompt card p-3">
                        <h4 className="login-title">Đăng nhập để đánh giá</h4>
                        <p className="login-message">Để đánh giá sản phẩm và gửi bình luận, bạn cần đăng nhập để tiếp tục.</p>
                        <a href="/login" className="btn btn-secondary">Đăng nhập</a>
                      </div>
                    }
                  </div>
                </div>
              </div>

              {/* -------------------------------------End of feedback---------------------------- */}
            </div>


            {/* <div
              className={`tabs-content content-stylings ${activeDesTab === "tabQNA" ? "show" : ""
                }`}
            >
              Question & Answers
            </div> */}
          </div>
        </DescriptionTabsWrapper>
      </div>
    </DetailsContent>
  );
};

export default BookDescriptionTab;
