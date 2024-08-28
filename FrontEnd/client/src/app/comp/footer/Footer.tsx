import styled from "styled-components";
import { Container } from "../../styles/styles";
import { Link } from "react-router-dom";
import { breakpoints, defaultTheme } from "../../styles/themes/default";

const FooterWrapper = styled.footer`
  padding-top: 60px;
  padding-bottom: 20px;
  background-color: ${defaultTheme.color_outerspace};
  color: ${defaultTheme.color_whitesmoke};
  height: auto;
  margin-top: auto;

  @media (max-width: ${breakpoints.lg}) {
    padding-top: 40px;
    padding-bottom: 20px;
  }

  .footer-top {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin-bottom: 20px;

    @media (max-width: ${breakpoints.md}) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: ${breakpoints.xs}) {
      grid-template-columns: 1fr;
      text-align: center;
    }

    .footer-item {
      &-title {
        margin-bottom: 12px;
        font-size: 18px;
        font-weight: 700;
      }

      .ftr-links {
        list-style: none;
        padding: 0;
        margin: 0;

        .ftr-link-item {
          margin-bottom: 8px;

          a {
            color: ${defaultTheme.color_whitesmoke};
            text-decoration: none;
            &:hover {
              color: ${defaultTheme.color_yellow};
              text-decoration: underline;
            }
          }
        }
      }
    }
  }

  .footer-middle {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;

    .ftr-social-links {
      display: flex;
      justify-content: space-between;
      column-gap: 10px;

      @media (max-width: ${breakpoints.xs}) {
        justify-content: center;
      }

      .ftr-social-link {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 35px;
        height: 35px;
        border-radius: 50%;
        background-color: ${defaultTheme.color_white};
        color: ${defaultTheme.color_outerspace};
        font-size: 18px;
        transition: background-color 0.3s, color 0.3s;

        &:hover {
          background-color: ${defaultTheme.color_yellow};
          color: ${defaultTheme.color_outerspace};
        }
      }
    }
  }

  .footer-bottom {
    border-top: 1px solid rgba(190, 188, 189, 0.4);
    text-align: center;
    padding-top: 20px;

    @media (max-width: ${breakpoints.lg}) {
      padding-top: 15px;
    }

    p {
      font-size: 14px;
      color: ${defaultTheme.color_whitesmoke};

      a {
        color: ${defaultTheme.color_yellow};
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <Container>
        <div className="footer-top">
          {/* Map through footerData and render footer items */}
        </div>
        <div className="footer-middle">
          <div className="ftr-social-links">
            {/* Map through socialLinksData and render social links */}
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            Bản quyền &copy; 2024 &nbsp;
            <Link to="/">ATWOM LIBRARY</Link>
            &nbsp;. All rights reserved.
          </p>
        </div>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
