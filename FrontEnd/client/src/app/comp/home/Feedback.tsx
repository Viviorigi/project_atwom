import styled from "styled-components";
import { Container, Section } from "../../styles/styles";
import Title from "../common/Title";
import Slider from "react-slick";
import CustomNextArrow from "../common/CustomNextArrow";
import CustomPrevArrow from "../common/CustomPrevArrow";
import { feedbackData } from "../../data/data";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import { useEffect, useState } from "react";
import axios from "axios";
import defaultPersonImage from "../../../assets/images/imagePerson.png"
import StarRatings from 'react-star-ratings';
import { Link } from "react-router-dom";

import "./fb.scss"

const FeedbackItemWrapper = styled.div`
  padding-left: 16px;
  padding-right: 16px;

  @media (max-width: ${breakpoints.sm}) {
    padding: 0;
  }

  .feedback-item-wrap {
    border-radius: 10px;
    border: 1px solid ${defaultTheme.color_platinum};
    padding: 20px;
    height: 320px;
    transition: ${defaultTheme.default_transition};

    &:hover {
      background-color: ${defaultTheme.color_sea_green};
      border-color: ${defaultTheme.color_sea_green};

      .rating {
        color: ${defaultTheme.color_white};
      }

      .feedback-icon {
        border-color: ${defaultTheme.color_white};
      }

      .feedback-body,
      .feedback-intro {
        p,
        span {
          color: ${defaultTheme.color_white};
        }
      }
    }
  }

  .feedback-top {
    column-gap: 18px;
  }

  .feedback-icon {
    border-radius: 100%;
    overflow: hidden;
    border: 2px solid ${defaultTheme.color_white};

    img {
      scale: 1.1;
    }
  }

  .rating {
    margin: 14px 0;
    column-gap: 4px;
  }
`;

const Feedback = () => {
  const [feedBackList, setFeedBackList] = useState([]);

  useEffect(() => {
    let url = `http://localhost:8080/feedback/new`;
    axios
      .get(url)
      .then((resp: any) => {
        if (resp.data) {
          // console.log("Feed mới:");
          // console.log(resp.data);

          setFeedBackList(resp.data);
        }
      })
      .catch((err: any) => { });
  }, []);

  const settings = {
    infinite: false,
    speed: 300,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
          arrows: false,
        },
      },
    ],
  };
  return (
    <Section>
      <Container>
        <Title titleText={"Đánh giá"} />
        <Slider
          nextArrow={<CustomNextArrow />}
          prevArrow={<CustomPrevArrow />}
          {...settings}
        >
          {feedBackList?.map((feedback: any) => {
            return (

              <FeedbackItemWrapper key={feedback.id}>
                <Link to={`/book/details/?bookId=${feedback.book_id}`}>
                  <div className="feedback-item-wrap bg-white">
                    <div className="feedback-top flex items-center">
                      {/* Avatar Section */}
                      <div className="feedback-icon">
                        <img
                          src={feedback.user_avatar ? `http://localhost:8080/api/auth/getImage?atchFleSeqNm=${feedback.user_avatar}` : defaultPersonImage}
                          alt="PersonAvatar"
                          style={{
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                          }}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = defaultPersonImage;
                          }}
                        />
                      </div>

                      <div className="feedback-details flex flex-col ml-4">
                        <div className="user-info d-flex justify-content-between align-items-center">
                          <strong className="user-name">{feedback.user_name}</strong>
                          <span className="feedback-time text-muted">
                            {new Date(feedback.upd_dt).toLocaleDateString()}
                          </span>
                        </div>
                        {/* Rating Section */}
                        <div className="user-rating mb-2">
                          <StarRatings
                            rating={feedback.rating || 0} // Ensure you have a rating property in your feedback data
                            starRatedColor="#34B7F1"
                            numberOfStars={5}
                            starDimension="20px"
                            starSpacing="2px"
                            name="rating"
                          />
                        </div>

                        {/* Comment Section */}
                        <span className="text-sm">{feedback.comment}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </FeedbackItemWrapper>
            );
          })}


          {/* //--------------------------------------------------------- */}
        </Slider>
      </Container>
    </Section>
  );
};

export default Feedback;
