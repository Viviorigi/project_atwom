import styled from "styled-components";
import { HeaderMainWrapper, SiteBrandWrapper } from "../../styles/header";
import { Container } from "../../styles/styles";
import { Link, useLocation } from "react-router-dom";
import { Input, InputGroupWrapper } from "../../styles/form";
import { breakpoints, defaultTheme } from "../../styles/themes/default";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../redux/slices/sidebarSlice";
import { staticImages } from "../../utils/images";
import Cookies from "universal-cookie";
import { useEffect, useState } from "react";
import { BaseLinkGreen, BaseLinkOutlineDark } from "../../styles/button";
import { jwtDecode } from "jwt-decode";
import { AuthConstant } from "../../constants/authConstant";

const NavigationAndSearchWrapper = styled.div`
  column-gap: 20px;
  .search-form {
    @media (max-width: ${breakpoints.lg}) {
      width: 100%;
      max-width: 500px;
    }
    @media (max-width: ${breakpoints.sm}) {
      display: none;
    }
  }

  .input-group {
    min-width: 320px;

    .input-control {
      @media (max-width: ${breakpoints.sm}) {
        display: none;
      }
    }

    @media (max-width: ${breakpoints.xl}) {
      min-width: 160px;
    }

    @media (max-width: ${breakpoints.sm}) {
      min-width: auto;
      grid-template-columns: 100%;
    }
  }

  @media (max-width: ${breakpoints.lg}) {
    width: 100%;
    justify-content: flex-end;
  }
`;

const NavigationMenuWrapper = styled.nav`
  .nav-menu-list {
    margin-left: 20px;

    @media (max-width: ${breakpoints.lg}) {
      flex-direction: column;
    }
  }

  .nav-menu-item {
    margin-right: 20px;
    margin-left: 20px;

    @media (max-width: ${breakpoints.xl}) {
      margin-left: 16px;
      margin-right: 16px;
    }
  }

  .nav-menu-link {
    &.active {
      color: ${defaultTheme.color_outerspace};
      font-weight: 700;
    }

    &:hover {
      color: ${defaultTheme.color_outerspace};
    }
  }

  @media (max-width: ${breakpoints.lg}) {
    position: absolute;
    top: 0;
    right: 0;
    width: 260px;
    background: ${defaultTheme.color_white};
    height: 100%;
    z-index: 999;
    display: none;
  }
`;

const IconLinksWrapper = styled.div`
  column-gap: 18px;
  .icon-link {
    width: 36px;
    height: 36px;
    border-radius: 6px;

    &.active {
      background-color: ${defaultTheme.color_sea_green};
      img {
        filter: brightness(100);
      }
    }

    &:hover {
      background-color: ${defaultTheme.color_whitesmoke};
    }
  }

  @media (max-width: ${breakpoints.xl}) {
    column-gap: 8px;
  }

  @media (max-width: ${breakpoints.xl}) {
    column-gap: 6px;
  }
`;
interface JwtPayload {
  exp: number;
}

const Header = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cookie = new Cookies();
  useEffect(() => {

    const access_token = cookie.get('access_token');

    if (access_token) {
      try {
        const decodedToken = jwtDecode<JwtPayload>(access_token);

        const expiryTime = decodedToken.exp * 1000;

        const currentTime = new Date().getTime();

        if (currentTime < expiryTime) {
          setIsLoggedIn(true);
        } else {
          cookie.remove(AuthConstant.ACCESS_TOKEN);
          cookie.remove('fullName');
          cookie.remove('avatar');
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.log(error);

      }
    }
  }, [isLoggedIn])

  return (
    <HeaderMainWrapper className="header flex items-center">
      <Container className="container">
        <div className="header-wrap flex items-center justify-between">
          <div className="flex items-center">
            <button
              aria-label="d"
              type="button"
              className="sidebar-toggler"
              onClick={() => dispatch(toggleSidebar())}
            >
              <i className="bi bi-list"></i>
            </button>
            <SiteBrandWrapper to="/" className="inline-flex">
              <div className="brand-img-wrap flex items-center justify-center">
                <img
                  className="site-brand-img"
                  src={staticImages.logo}
                  alt="site logo"
                />
              </div>
              <span className="site-brand-text text-outerspace">ATWOM BOOK</span>
            </SiteBrandWrapper>
          </div>
          <NavigationAndSearchWrapper className="flex items-center">
            <NavigationMenuWrapper>
              <ul className="nav-menu-list flex items-center">

              </ul>
            </NavigationMenuWrapper>
            <form className="search-form">
              <InputGroupWrapper className="input-group">
                <span className="input-icon flex items-center justify-center text-xl text-gray">
                  <i className="bi bi-search"></i>
                </span>
                <Input
                  type="text"
                  className="input-control w-full"
                  placeholder="Search"
                />
              </InputGroupWrapper>
            </form>
          </NavigationAndSearchWrapper>

          <IconLinksWrapper className="flex items-center">
            <Link
              to="/book"
              className={`icon-link ${location.pathname === "/book" ? "active" : ""
                } inline-flex items-center justify-center`}
            >
              <img src={staticImages.book_menu} alt="" />
            </Link>
            {isLoggedIn && 
              <>
                <Link
              to="/wishlist"
              className={`icon-link ${location.pathname === "/wishlist" ? "active" : ""
                } inline-flex items-center justify-center`}
            >
              <img src={staticImages.heart} alt="" />
            </Link>

            <Link
              to="/account"
              className={` ${location.pathname === "/account" ||
                location.pathname === "/account/add"
                ? "active"
                : ""
                } inline-flex items-center justify-center`}
              style={{ marginTop: "14px" }}
            >
              {/* <p>{fullName}</p> */}
            </Link>

            <Link
              to="/account"
              className={`icon-link ${location.pathname === "/account" ||
                location.pathname === "/account/add"
                ? "active"
                : ""
                } inline-flex items-center justify-center`}
            >

              <img src={staticImages.user} alt="" />
            </Link>
            <Link
              to="/cart"
              className={`icon-link ${location.pathname === "/cart" ? "active" : ""
                } inline-flex items-center justify-center`}
            >
              <img src={staticImages.cart} alt="" />
            </Link>
              </>
            }
            
            {!isLoggedIn &&
              <div className="flex items-center ">
                <BaseLinkGreen to="/login">Login</BaseLinkGreen>
                <BaseLinkOutlineDark to="/register">Sign up</BaseLinkOutlineDark>
              </div>}

          </IconLinksWrapper>
        </div>
      </Container>
    </HeaderMainWrapper>
  );
};

export default Header;

