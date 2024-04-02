import PropTypes from "prop-types";
import MainLayout from "..";
import classNames from "classnames/bind";
import styles from "./CreateNFTLayout.module.sass";
import NavbarCreator from "~/components/NavbarCreator";
import { useContext } from "react";
import { UserContext } from "~/components/Contexts/AppUserProvider";

const cx = classNames.bind(styles);

const CreateNFTLayout = ({ children }) => {
  const { artistLoading,artist } = useContext(UserContext);
  return (
    <MainLayout>
      <div className={cx("wrapper")}>
        {!artistLoading && Object.keys(artist).length > 0  && <NavbarCreator />}
        {children}
      </div>
    </MainLayout>
  );
};

CreateNFTLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CreateNFTLayout;
