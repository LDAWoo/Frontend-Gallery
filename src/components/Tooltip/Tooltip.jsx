import PropTypes from "prop-types";
import Tippy from "@tippyjs/react";
import TippyHeadless from "@tippyjs/react/headless";
import "tippy.js/dist/svg-arrow.css";
import classNames from "classnames/bind";
import styles from "./Tooltip.module.sass";

const cx = classNames.bind(styles);

const Tooltip = ({ toolTip = false, interactive, delay, translate, content, items, width, onClickOutside, isVisible, placement, className, children, ...props }) => {
  const ToolTipTippy = () => (
    <Tippy delay={delay} content={content} animation className={`${!className ? `${cx("wrapperTippy")}` : className}`} placement={placement} {...props}>
      {children}
    </Tippy>
  );

  const renderItems = () => (
    <div className={`${cx("wrapperTippyHeadless")} ${translate ? cx("active") : ""}`} style={{ width: width, height: "auto" }}>
      {items}
    </div>
  );

  const ToolTipTippyHeadless = () => (
    <TippyHeadless onClickOutside={onClickOutside} interactive={interactive} visible={isVisible} render={renderItems} placement={placement} {...props}>
      {children}
    </TippyHeadless>
  );

  return <>{toolTip ? <ToolTipTippy /> : <ToolTipTippyHeadless />}</>;
};

Tooltip.propTypes = {
  delay: PropTypes.arrayOf(PropTypes.number),
  interactive: PropTypes.bool,
  translate: PropTypes.bool,
  content: PropTypes.node,
  placement: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  toolTip: PropTypes.bool,
  items: PropTypes.object,
  isVisible: PropTypes.bool,
  onClickOutside: PropTypes.func,
  width: PropTypes.number,
};

export default Tooltip;
