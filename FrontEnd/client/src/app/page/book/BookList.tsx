import styled from "styled-components";
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

const BookListItem = () => {

  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    let url = `http://localhost:8080/book/list/all`;
    axios.get(url).then((resp: any) => {
      if (resp.data) {
        setBookList(resp.data);
        console.log(resp.data);
        
      }
    }).catch((err: any) => {

    })
  }, [])

  const breadcrumbItems = [
    { label: "Home", link: "/" },
    { label: "Products", link: "" },
  ];
  return (
    <main className="page-py-spacing">
      <Container>
        <Breadcrumb items={breadcrumbItems} />
        <ProductsContent className="grid items-start">
          <ProductsContentLeft>
            <BookFilter />
          </ProductsContentLeft>
          <ProductsContentRight>
            <div className="products-right-top flex items-center justify-between">
              <h4 className="text-xxl">A2m&apos;s Libary</h4>
              <ul className="products-right-nav flex items-center justify-end flex-wrap">
                <li>
                  <Link to="/" className="active text-lg font-semibold">
                    New
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-lg font-semibold">
                    Recommended
                  </Link>
                </li>
              </ul>
            </div>

            <BookList products={books.slice(0, 12)} />
            {/* {bookList.map((u:any) => {
              return (
                <div key={u.id}>
                  <div className="product-img">
                    <img
                      className="object-fit-cover"
                      src={u.image ? `http://localhost:8080/getImage?atchFleSeqNm=${u.image}` : imageBookDefault}  onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null; // Prevent infinite loop in case fallback image also fails
                        target.src = imageBookDefault; // Set the fallback image
                      }}
                      alt=""
                      width="50px"
                      height="50px"
                    />
                  </div>
                  <div className="product-info">
                    <p className="font-semibold text-xl">{u.title}</p>
                  </div>
                </div>
              );
            })} */}

          </ProductsContentRight>
        </ProductsContent>
      </Container>
      <Section>
        <Container>
          <DescriptionContent>
            <Title titleText={"Books for Everyone Online"} />
            <ContentStylings className="text-base content-stylings">
              <h4>Books Collection Online at Library.</h4>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed,
                molestiae ex atque similique consequuntur ipsum sapiente
                inventore magni ducimus sequi nemo id, numquam officiis fugit
                pariatur esse, totam facere ullam?
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Consequatur nam magnam placeat nesciunt ipsa amet, vel illo
                veritatis eligendi voluptatem!
              </p>
              <h4>
                One-stop Destination to Shop Every Clothing for Everyone:
                Library.
              </h4>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
                iure doloribus optio aliquid id. Quos quod delectus, dolor est
                ab exercitationem odio quae quas qui doloremque. Esse natus
                minima ratione reiciendis nostrum, quam, quisquam modi aut,
                neque hic provident dolorem.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi
                laborum dolorem deserunt aperiam voluptate mollitia.
              </p>
              <Link to="/">See More</Link>
            </ContentStylings>
          </DescriptionContent>
        </Container>
      </Section>
    </main>
  );
};

export default BookListItem;
