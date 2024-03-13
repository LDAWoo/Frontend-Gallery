import classNames from "classnames/bind";
import styles from "./Home.module.sass";
import Banner from "~/components/Banner/Banner";
import Hero from "~/components/Hero/Hero";
import Body from "./Body";
const cx = classNames.bind(styles);

const Home = () => {
  return (
    <div className={`${cx("wrapper")}`}>
      <div className={`${cx("container")} no-scrollbar scrollbarCustom`}>
        <Banner />
        <Hero />
        <Body />
      </div>
    </div>
  );
};

export default Home;
