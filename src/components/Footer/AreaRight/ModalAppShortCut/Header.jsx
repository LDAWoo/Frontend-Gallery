import classNames from "classnames/bind";

import { GiPianoKeys } from "react-icons/gi";
import Icon from "~/components/Icon";
import Title from "~/components/Title";
import styles from "./Header.module.sass";

const cx = classNames.bind(styles);
const Header = () => {
  return (
    <div className={cx("wrapper")}>
      <Title title="App shortcuts" fontSemiBold />
      <Icon icon={GiPianoKeys} size={16} />
    </div>
  );
};

Header.propTypes = {};

export default Header;
