import classNames from "classnames/bind";
import styles from "./Profile.module.sass";
import Title from "~/components/Title";
import TextInput from "~/components/TextInput";
import { truncate, useGlobalState } from "~/store";
import TextArea from "~/components/TextArea";
import Button from "~/components/Button";
const cx = classNames.bind(styles);

const Profile = () => {
  const [address] = useGlobalState("connectedAccount");
  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <Title title="Username" large fontBold />
        <TextInput type="text" name="username" classInput={cx("wrapperInput")} />
        <span className={cx("subName")}>{`Your profile link trainfleet.io/u/${truncate(address, 5, 3, 11)}`}</span>
      </div>
      <div className={cx("container")}>
        <Title title="Display name" large fontBold />
        <TextInput type="text" name="displayname" classInput={cx("wrapperInput")} />
      </div>
      <div className={cx("container")}>
        <Title title="Short bio" large fontBold />
        <TextArea type="text" name="shortbio" placeHolder="Tell us about yourself in a few works" />
      </div>
      <div className={cx("container")}>
        <Title title="Email" large fontBold />
        <TextInput type="email" name="email" classInput={cx("wrapperInput")} />
        <span className={cx("subName")}>{`Your email for marketplace notifcations`}</span>
      </div>
      <div className={cx("container")}>
        <Title title="Twitter" large fontBold />
        <Button title="Link Twitter" backgroundGallery xxl style={{ height: "40px" }} />
      </div>
      <div className={cx("container")}>
        <Title title="Discord" large fontBold />
        <Button title="Link Discord" backgroundGallery xxl style={{ height: "40px" }} />
      </div>
      <div className={cx("container")}>
        <Title title="Telegram" large fontBold />
        <TextInput type="text" name="telegram" classInput={cx("wrapperInput")} />
      </div>
      <div className={cx("container")}>
        <Button disabled background xxl title="Save Settings" style={{ height: "40px" }} />
      </div>
    </div>
  );
};

export default Profile;
