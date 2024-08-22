import {CustomUpArrowWrapper } from "../../styles/slider";
import  PropTypes from "prop-types";
import { FaChevronUp } from "react-icons/fa";

const CustomUpArrow = ({ onClick }:any) => {
  return (
    <CustomUpArrowWrapper
      className="custom-up-arrow"
      onClick={onClick}
    >
        <FaChevronUp />
    </CustomUpArrowWrapper>
  );
};

export default CustomUpArrow;

CustomUpArrow.propTypes = {
  onClick: PropTypes.func,
};
