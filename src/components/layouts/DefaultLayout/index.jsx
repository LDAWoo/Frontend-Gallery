import PropTypes from "prop-types";
import Navbar from "~/components/Navbar";
import MainLayout from "..";
import Footer from "~/components/Footer";

const DefaultLayout = ({ children }) => {
  return (
    <MainLayout>
      <Navbar />
      {children}
      <Footer />
    </MainLayout>
  );
};

DefaultLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DefaultLayout;
