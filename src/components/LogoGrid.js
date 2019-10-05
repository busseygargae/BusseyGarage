import React from "react";
import PropTypes from "prop-types";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

const LogoGrid = ({ gridItems }) => (
  <section>
    <div className="logo-grid">
      {gridItems.map(item => (
        <div key={item.text}>
          <PreviewCompatibleImage imageInfo={item} />
        </div>
      ))}
    </div>
  </section>
);

LogoGrid.propTypes = {
  gridItems: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      text: PropTypes.string
    })
  )
};

export default LogoGrid;
