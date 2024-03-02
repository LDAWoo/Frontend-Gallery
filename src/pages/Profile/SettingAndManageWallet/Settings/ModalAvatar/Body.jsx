import classNames from "classnames/bind";
import { useEffect, useRef } from "react";
import { FaPlus } from "react-icons/fa6";
import Button from "~/components/Button";
import { setGlobalState, useGlobalState } from "~/store";
import styles from "./Body.module.sass";
const cx = classNames.bind(styles);

const Body = () => {
  const inputRef = useRef();
  const [profiles] = useGlobalState("profiles");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile.type.split("/")[0] !== "image") return;

    const imageURL = URL.createObjectURL(selectedFile);
    setGlobalState("profiles", { ...profiles, avatarName: selectedFile, avatarPreview: imageURL });
  };

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(profiles.avatarPreview);
    };
  }, [profiles.avatarPreview]);

  const handleOpenFile = () => {
    inputRef.current.click();
  };
  return (
    <div className={cx("wrapper")}>
      <div className={cx("wrapperContainer")}>
        {profiles.avatarPreview && (
          <div className={cx("avatarReview")}>
            <img src={profiles.avatarPreview} className={cx("avatar")} />
          </div>
        )}
        <input type="file" ref={inputRef} className={cx("fileMetaData")} onChange={handleFileChange} />
        <div className={cx("wrapperButtonUpload")}>
          <Button background title="Upload your avatar" onClick={handleOpenFile} icon={FaPlus} size={16} xl fontMedium classButton={cx("classButton")} />
        </div>
      </div>
    </div>
  );
};

export default Body;
