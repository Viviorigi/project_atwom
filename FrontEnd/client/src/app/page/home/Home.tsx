import styled from "styled-components";
import Hero from "../../comp/home/Hero";
import Category from "../../comp/home/Category";
import Feedback from "../../comp/home/Feedback";
import imageBookDefault from "../../../assets/images/imageBookDefault.png"

const HomeScreenWrapper = styled.main``;

const Home = () => {
  return (
    <HomeScreenWrapper>
      <Hero />
      <Category />
      <Feedback />
      {/* <Featured />
      <NewArrival />
      <SavingZone />
      <Catalog catalogTitle={"Categories For Men"} products={mensCatalog} />
      <Catalog catalogTitle={"Categories For Women"} products={womensCatalog} />
      <Brands />
      <Catalog catalogTitle={"In The LimeLight"} products={limelightCatalog} />
      <Feedback /> */}
    </HomeScreenWrapper>
  );
};

export default Home;
