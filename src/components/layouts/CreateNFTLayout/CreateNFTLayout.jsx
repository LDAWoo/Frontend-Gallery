import PropTypes from "prop-types";
import MainLayout from "..";
import classNames from "classnames/bind";
import styles from "./CreateNFTLayout.module.sass";
import NavbarCreator from "~/components/NavbarCreator";

const cx = classNames.bind(styles);

const CreateNFTLayout = ({ children }) => {
  return (
    <MainLayout>
      <div className={cx("wrapper")}>
        <NavbarCreator />
        {children}
      </div>
    </MainLayout>
  );
};

CreateNFTLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CreateNFTLayout;
