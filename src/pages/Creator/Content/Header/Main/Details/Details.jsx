import classNames from "classnames/bind";

import { useEffect, useRef, useState } from "react";
import Button from "~/components/Button";
import Select from "~/components/Select";
import TextArea from "~/components/TextArea";
import TextInput from "~/components/TextInput";
import Title from "~/components/Title";
import styles from "./Details.module.sass";
import { uploadToIPFS } from "~/NFTMarketplace/NFTMarketplace";
import { setGlobalState, useGlobalState } from "~/store";
import { useNavigate } from "react-router-dom";
import routesConfig from "~/configs";
const cx = classNames.bind(styles);

const items = [
  {
    name: "-",
    value: "",
  },
  {
    name: "fpst",
    value: "fpst",
  },
  {
    name: "game",
    value: "game",
  },
  {
    name: "art",
    value: "art",
  },
  {
    name: "music",
    value: "music",
  },
];
const Details = () => {
  const navigate = useNavigate();
  const [formDataCreateNFT] = useGlobalState("formDataCreateNFT");
  const fileInputRef = useRef();
  const [avatar, setAvatar] = useState(formDataCreateNFT.currentUrlImage);
  const [description, setDescription] = useState(formDataCreateNFT.collectionDescription);
  const [categories, setCategories] = useState({
    primary: "",
    secondary: "",
  });

  const handleSelectPrimaryCategory = (value) => {
    setCategories((prev) => ({ ...prev, primary: value }));
  };
  const handleSelectSecondaryCategory = (value) => {
    setCategories((prev) => ({ ...prev, secondary: value }));
  };

  // useEffect(() => {
  //   return () => {
  //     avatar && URL.revokeObjectURL(avatar);
  //   };
  // }, [avatar]);

  const onFileDrop = async (e) => {
    const files = e.target.files[0];
    if (files.type.split("/")[0] !== "image") return;
    files.preview = URL.createObjectURL(files);
    setAvatar(files);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleChangeDescription = (e) => {
    const value = e.target.value.trim();
    setDescription(value);
  };

  const handleSave = async () => {
    const collectionImage = await uploadToIPFS(avatar);
    setGlobalState("formDataCreateNFT", { ...formDataCreateNFT, currentUrlImage: avatar.preview, collectionImage: collectionImage, collectionDescription: description });
    navigate(`${routesConfig.creator}?source=hashList`);
  };

  return (
    <div className={cx("wrapper")}>
      <Title gallery title="Step 2 of 5" large nowrap={false} />
      <Title title="Listing details" white nowrap={false} fontBold extraLarge6 />
      <Title gallery title="Enter in the details on your collection that will be used for your marketplace page on gardeneden.io" fontMedium xl nowrap={false} />

      <div className={`${cx("containerContent")} ${cx("mb")}`}>
        <Title title="Collection Description" white xl fontMedium nowrap={false} />
        <TextArea type="text" name="description" value={description} placeholder="2000 unique NFTs governed by DAO" onChange={handleChangeDescription} />
      </div>

      <div className={`${cx("containerContent")} ${cx("mb")}`}>
        <Title title="Profile Image (500x500px)" gallery xl fontMedium nowrap={false} />
        <div>
          <input ref={fileInputRef} type="file" className={cx("inputFileImage")} onChange={onFileDrop} />
          <Button title="Upload" background className={cx("buttonUploadImage")} onClick={handleUpload} />
        </div>
        <Title title="Max file size 5MB. This is the image that will show on your collection profile page." nowrap={false} gallery xl fontMedium />
        {avatar && <img src={avatar.preview} alt="uploadImage" className={cx("imageUpload")} />}
      </div>

      <div className={cx("contentCategory")}>
        <Title title="Categories" white nowrap={false} fontBold xxxl />
        <div className={`${cx("containerContent")} ${cx("mb")}`}>
          <Title title="Primary Category" gallery xl fontMedium nowrap={false} />
          <Select translate placement="auto" data={items} disableValue={categories.secondary} value={categories.primary} onChange={handleSelectPrimaryCategory} />
          <Title title="Select the primary category that you would like for this collection to be listed under" nowrap={false} gallery xl fontMedium />
        </div>

        <div className={`${cx("containerContent")} ${cx("mb")}`}>
          <Title title="Secondary Category" gallery xl fontMedium nowrap={false} />
          <Select translate placement="auto" data={items} disableValue={categories.primary} value={categories.secondary} onChange={handleSelectSecondaryCategory} />
          <Title title="Select the  secondary category for this collection to be listed under" nowrap={false} gallery xl fontMedium />
        </div>
      </div>

      <div className={`${cx("mb")}`}>
        <Title title="Social & Web Links" white nowrap={false} fontBold xxxl />
      </div>

      <Title title="Input your social and websites links for your collection. These links will be displayed on your collection page" white nowrap={false} fontMedium xl />

      <div className={`${cx("containerContent")}`}>
        <Title title="Please link your Twitter" white xl fontMedium nowrap={false} />
        <div>
          <Button title="Link Twitter" border className={cx("buttonLinkTwitter")} />
        </div>
      </div>

      <div className={`${cx("containerContent")} ${cx("mb")}`}>
        <Title title="Discord Invite Code (Optional)" white nowrap={false} fontMedium xl />
        <Title title={`https://discord.gg/`} gallery medium />
        <TextInput type="text" name="discord" placeholder="98yXPI" />
      </div>

      <div className={`${cx("containerContent")} ${cx("mb")}`}>
        <Title title="Website Url (Optional)" white nowrap={false} fontMedium xl />
        <TextInput type="text" name="websiteUrl" placeholder="https://supercollection.io" />
      </div>

      <div className={`${cx("mb")}`}>
        <Button title="Save & Proceed" className={cx("buttonSave")} onClick={handleSave} />
      </div>
    </div>
  );
};

export default Details;
