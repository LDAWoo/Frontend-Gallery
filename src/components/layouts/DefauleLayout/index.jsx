import PropTypes from "prop-types";
import Navbar from "~/components/Navbar";
import MainLayout from "..";

const DefaultLayout = ({ children }) => {
  return (
    <MainLayout>
      <Navbar />
      {children}
    </MainLayout>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
