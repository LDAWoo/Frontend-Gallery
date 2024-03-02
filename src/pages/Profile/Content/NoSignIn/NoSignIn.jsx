import classNames from "classnames/bind";
import Button from "~/components/Button";
import { setGlobalState } from "~/store";
import styles from "./NoSignIn.module.sass";

const cx = classNames.bind(styles);
const NoSignIn = () => {
  const handleSignIn = () => {
    setGlobalState("showModalUserSignIn", true);
  };
  return (
    <div className={cx("wrapper")}>
      Sign In to see your profile page.
      <div className={cx("wrapperButton")}>
        <Button title="Sign In Now" background xl fontSemiBold onClick={handleSignIn} />
      </div>
    </div>
  );
};

export default NoSignIn;
