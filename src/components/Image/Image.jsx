import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import styles from "./Image.module.sass";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);
function Image({ className, src, alt, imageBase, ...props }) {
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    if (imageBase && !currentSrc) {
      const imageBlob = base64ToBlob(imageBase, "image/jpeg");
      setCurrentSrc(URL.createObjectURL(imageBlob));
    }
  }, [imageBase, currentSrc]);

  return <img className={`${className ? className : cx("image")}`} src={currentSrc} alt={alt} {...props} />;
}

function base64ToBlob(base64String, contentType = "") {
  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: contentType });
}

Image.propTypes = {
  className: PropTypes.string,
  lazy: PropTypes.bool,
  src: PropTypes.string,
  alt: PropTypes.string,
  imageBase: PropTypes.string,
};

export default Image;
