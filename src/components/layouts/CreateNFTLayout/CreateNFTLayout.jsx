import PropTypes from "prop-types";
import MainLayout from "..";

const CreateNFTLayout = ({ children }) => {
  return <MainLayout>{children}</MainLayout>;
};

CreateNFTLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CreateNFTLayout;
