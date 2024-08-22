import {CustomUpArrowWrapper } from "../../styles/slider";
import  PropTypes from "prop-types";
import { FaChevronDown } from "react-icons/fa";

const CustomDownArrow = ({ onClick }:any) => {
  return (
    <CustomUpArrowWrapper
      className="custom-next-arrow"
      onClick={onClick}
    >
        <FaChevronDown />
    </CustomUpArrowWrapper>
  );
};

export default CustomDownArrow;

CustomDownArrow.propTypes = {
  onClick: PropTypes.func,
};
