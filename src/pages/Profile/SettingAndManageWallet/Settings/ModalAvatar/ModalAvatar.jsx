import classNames from "classnames/bind";
import PropTypes from "prop-types";
import ModalCenter from "~/components/Modal/ModalCenter/ModalCenter";
import Body from "./Body";
import styles from "./ModalAvatar.module.sass";
import { useGlobalState } from "~/store";
import Header from "./Header";

const cx = classNames.bind(styles);

const ModalAvatar = () => {
  const [showModalAvatar] = useGlobalState("showModalAvatar");
  return <ModalCenter type="showModalAvatar" isCloseModal={false} isOpen={showModalAvatar} header={<Header />} body={<Body />} classContent={cx("classContent")} />;
};

ModalAvatar.propTypes = {
  isOpen: PropTypes.bool,
};

export default ModalAvatar;
