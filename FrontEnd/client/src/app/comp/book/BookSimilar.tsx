import { books } from "../../data/data";
import { Section } from "../../styles/styles";
import Title from "../common/Title";
import BookList from "./BookList";

const ProductSimilar = () => {
  return (
    <Section>
      <Title titleText={"Similar Products"} />
      <BookList products={books.slice(0, 4)} />
    </Section>
  );
};

export default ProductSimilar;
