import classNames from "classnames/bind";
import PropTypes from "prop-types";
import { useRef, useState } from "react";
import SplitPane, { Pane } from "react-split-pane";
import styles from "./SlipPaneCustom.module.sass";
const cx = classNames.bind(styles);

const SlipPaneCustom = ({ panel1, panel2, classPanel1, classPanel2, resizer, ...props }) => {
  const panel1Ref = useRef();
  const panel2Ref = useRef();
  const [heightHeight, setHeightPanel2] = useState(50);

  const getStylesPanel1 = () => {
    if (resizer) {
      return { maxHeight: "92%" };
    } else {
      return { maxHeight: "100%", height: "100%" };
    }
  };

  const getStylesPanel2 = () => {
    return { height: `calc(100% - ${heightHeight}px)`, minHeight: "0px" };
  };

  const handleChange = (e) => {
    if (panel2) {
      setHeightPanel2(e);
    }
  };

  return (
    <SplitPane onChange={handleChange} split="horizontal" pane1Style={getStylesPanel1()} pane2Style={getStylesPanel2()} {...props} defaultSize={200} primary="first" resizerClassName={`${cx("resizer")} ${resizer ? cx("active") : ""} `}>
      {panel1 && (
        <Pane ref={panel1Ref} className={classPanel1} size="100%">
          {panel1}
        </Pane>
      )}
      {panel2 && (
        <Pane ref={panel2Ref} className={classPanel2} size="100%">
          {panel2}
        </Pane>
      )}
    </SplitPane>
  );
};

SlipPaneCustom.propTypes = {
  panel1: PropTypes.node,
  panel2: PropTypes.node,
  classPanel1: PropTypes.string,
  classPanel2: PropTypes.string,
  resizer: PropTypes.bool,
};

export default SlipPaneCustom;
