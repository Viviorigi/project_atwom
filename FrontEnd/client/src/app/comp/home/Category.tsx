import styled from "styled-components";
import { Container, Section } from "../../styles/styles";
import Slider from "react-slick";
import CustomNextArrow from "../common/CustomNextArrow";
import CustomPrevArrow from "../common/CustomPrevArrow";
import { commonCardStyles } from "../../styles/card";
import { breakpoints } from "../../styles/themes/default";
import Title from "../common/Title";
import { newArrivalData } from "../../data/data";
import { useEffect, useState } from "react";
import axios from "axios";
import imageBookDefault from "../../../assets/images/imageBookDefault.png"
import { Link } from "react-router-dom";


const ProductCardBoxWrapper = styled.div`
  ${commonCardStyles}
  .product-img {
    height: 262px;
    width: 262px;
  }

  @media (max-width: ${breakpoints.sm}) {
    padding-left: 6px;
    padding-right: 6px;
  }
`;

const ArrivalSliderWrapper = styled.div`
  .custom-prev-arrow {
    top: 43%;
    left: -18px;
    @media (max-width: ${breakpoints.xxl}) {
      left: 24px;
    }

    @media (max-width: ${breakpoints.xs}) {
      left: 4px;
    }
  }

  .custom-next-arrow {
    top: 43%;
    right: -18px;
    @media (max-width: ${breakpoints.xxl}) {
      right: 24px;
    }

    @media (max-width: ${breakpoints.xs}) {
      right: 4px;
    }
  }
`;

const Category = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    centerMode: true,
    variableWidth: true,
  };

  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    // let url = `http://localhost:8080/book/new`;
    // axios.get(url).then((resp: any) => {
    //   if (resp.data) {
    //     setBookList(resp.data);
    //   }
    // }).catch((err: any) => {

    // })
  }, [])

  return (
    <Section>
      <Container>
        <Title titleText={"New Book"} />
        <ArrivalSliderWrapper>
          <Slider
            nextArrow={<CustomNextArrow />}
            prevArrow={<CustomPrevArrow />}
            {...settings}
          >

            {bookList.map((u: any) => {
              return (
                <ProductCardBoxWrapper key={u.id}> 
                  <div className="product-img">
                    {/* <Link to={`/book/details/?id=${u.id}`}> */}
                    <Link to={`/book/details/?bookId=${u.id}`}>
                      <img
                        className="object-fit-cover"
                        src={u.image ? `http://localhost:8080/getImage?atchFleSeqNm=${u.image}` : imageBookDefault} onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null; // Prevent infinite loop in case fallback image also fails
                          target.src = imageBookDefault; // Set the fallback image
                        }}
                        alt=""
                        width="100px"
                        height="100px"
                      />
                    </Link>
                  </div>
                  <div className="product-info">
                    <p className="font-semibold text-xl">{u.title}</p>
                  </div>
                </ProductCardBoxWrapper>
              );
            })}
          </Slider>

        </ArrivalSliderWrapper>
      </Container>


    </Section>
  );
};

export default Category;