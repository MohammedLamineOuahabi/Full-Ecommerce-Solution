import React from "react";
//import PropTypes from "prop-types";

const Rating = ({ rating, numReviews, color }) => {
  console.log("rating", rating);
  return (
    <>
      <span>
        <i
          style={{ color }}
          className={
            rating > 1 ? "fas fa-star" : rating > 0.5 ? "fas fa-star-half-alt" : "far fa-star"
          }
        ></i>
        <i
          style={{ color }}
          className={
            rating > 2 ? "fas fa-star" : rating > 1.5 ? "fas fa-star-half-alt" : "far fa-star"
          }
        ></i>
        <i
          style={{ color }}
          className={
            rating > 3 ? "fas fa-star" : rating > 2.5 ? "fas fa-star-half-alt" : "far fa-star"
          }
        ></i>
        <i
          style={{ color }}
          className={
            rating > 4 ? "fas fa-star" : rating > 3.5 ? "fas fa-star-half-alt" : "far fa-star"
          }
        ></i>
        <i
          style={{ color }}
          className={
            rating === 5 ? "fas fa-star" : rating > 4.5 ? "fas fa-star-half-alt" : "far fa-star"
          }
        ></i>
      </span>
      <span className="p-2">{`( ${numReviews} )`}</span>
    </>
  );
};

//we can define default value for a prop if not set
Rating.defaultProps = { color: "#fca652" };

//control props types using propTypes "impt" snippet
// Rating.propTypes = {
//   rating: PropTypes.number.isRequired,
//   numReviews: PropTypes.number.isRequired,
//   color: PropTypes.string
// };

export default Rating;
