import styled from "styled-components";
import { Container } from "../../styles/styles";
import { BaseLinkGreen } from "../../styles/button";
import  imgNotFound  from "../../../assets/images/404notfoundimg.png"
const NotFoundScreenWrapper = styled.main`
    margin: 24px 0;
    .page-not-found-img{
        width: 240px;
        overflow: hidden;
    }
    .page-not-found-msg{
        border-radius: 6px;
        padding: 24px 0;
        margin-top: 16px;
        max-width: 400px;
        gap: 12px;
    }
`;

const NotFound = () => {
  return (
    <NotFoundScreenWrapper className="page-py-spacing">
      <Container>
        <div className="flex items-center justify-center flex-col">
          <div className="page-not-found-img flex items-center justify-center">
            <img
              src={imgNotFound}
              alt=""
              className="object-fit-cover"
            />
          </div>
          <div className="page-not-found-msg w-full flex flex-col justify-center items-center">
            <p className="text-4xl font-semibold text-outerspace">
              Oops! Page not found.
            </p>
            <p className="text-gray text-center">
              The page you are looking for might have been removed or
              temporarily unavailable.
            </p>
            <BaseLinkGreen to="/">Back to HomePage</BaseLinkGreen>
          </div>
        </div>
      </Container>
    </NotFoundScreenWrapper>
  );
};

export default NotFound;
