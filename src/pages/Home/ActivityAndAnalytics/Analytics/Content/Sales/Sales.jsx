import classNames from "classnames/bind";
import ProgressiveLineChart from "~/components/Chart/ProgressiveLineChart";
import styles from "./Sales.module.sass";
import Title from "~/components/Title";
import Button from "~/components/Button";
import { arrowDownUp } from "~/assets/Icon";
const cx = classNames.bind(styles);

const Sales = () => {
  const data = [];
  const data2 = [];
  let prev = 0;
  let prev2 = 5;
  for (let i = 0; i < 100; i++) {
    prev += 5 - Math.random() * 10;
    data.push({ x: i, y: prev });
    prev2 += 5 - Math.random() * 10;
    data2.push({ x: i, y: prev2 });
  }
  return (
    <div className={cx("wrapper")}>
      <div className={cx("containerFilterPrice")}>
        <Title title="Floor Price" xl fontSemiBold />
        <div>
          <Button backgroundGallery title="24h" titlePosition="before" icon={arrowDownUp} />
        </div>
      </div>
      <div className={cx("containerChart")}>
        <ProgressiveLineChart data={data} data2={data2} />
      </div>
    </div>
  );
};

export default Sales;
