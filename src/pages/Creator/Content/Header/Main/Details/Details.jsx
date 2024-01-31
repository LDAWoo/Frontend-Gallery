import classNames from "classnames/bind";

import { TwitterAuthProvider, signInWithPopup } from "firebase/auth";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { uploadToIPFS } from "~/NFTMarketplace/NFTMarketplace";
import { updateHistoryCreateNFT } from "~/api/CreatorNFT";
import Button from "~/components/Button";
import TextArea from "~/components/TextArea";
import TextInput from "~/components/TextInput";
import Title from "~/components/Title";
import routesConfig from "~/configs";
import { auth } from "~/firebase/config";
import { setGlobalState, useGlobalState } from "~/store";
import Category from "./Category/Category";
import styles from "./Details.module.sass";

const cx = classNames.bind(styles);

const Details = ({ data }) => {
  const navigate = useNavigate();
  const fileInputRef = useRef();
  const [loading] = useGlobalState("loading");
  const [disable, setDisable] = useState(false);

  const [formState, setFormState] = useState({
    description: "",
    primaryCategories: "",
    secondaryCategories: "",
    imageURL: "",
    twitterURL: "",
    discordURL: "",
    websitesURL: "",
  });

  useEffect(() => {
    setFormState((prev) => ({
      ...prev,
      description: data.description || "",
      primaryCategories: data.id_primary_category || "",
      secondaryCategories: data.id_secondary_category || "",
      imageURL: data.image_url || "",
      twitterURL: data.twitter_url || "",
      discordURL: data.discord_url || "",
      websitesURL: data.website_url || "",
    }));
  }, [data]);

  const onFileDrop = async (e) => {
    const files = e.target.files[0];
    if (files.type.split("/")[0] !== "image") return;
    const url = await uploadToIPFS(files);
    setFormState((prev) => ({ ...prev, imageURL: url }));
  };

  const handleUpload = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const handleAuthenticationWithTwitter = async () => {
    const provider = new TwitterAuthProvider();
    try {
      const res = await signInWithPopup(auth, provider);
      const screenName = res._tokenResponse.screenName;
      setFormState((prev) => ({ ...prev, twitterURL: `https://twitter.com/${screenName}` }));
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const fetchData = async () => {
      const currentData = {
        id: data.id,
        description: formState.description,
        image_url: formState.imageURL,
        id_primary_category: formState.primaryCategories,
        id_secondary_category: formState.secondaryCategories,
        twitter_url: formState.twitterURL,
        discord_url: formState.discordURL,
        website_url: formState.websitesURL,
      };
      try {
        setGlobalState("loading", true);
        await updateHistoryCreateNFT(currentData);
        setGlobalState("loading", false);
        navigate(`${routesConfig.creator.replace(":id", data.id)}?source=hashList`);
      } catch (error) {
        console.log(error);
        setGlobalState("loading", false);
      }
    };

    fetchData();
  };

  useEffect(() => {
    const { description, primaryCategories, secondaryCategories, twitterURL } = formState;
    setDisable(description.length === 0 || primaryCategories.length === 0 || secondaryCategories.length === 0 || twitterURL.length === 0);
  }, [formState]);

  return (
    <div className={cx("wrapper")}>
      <Title gallery title="Step 2 of 5" large nowrap={false} />
      <Title title="Listing details" white nowrap={false} fontBold extraLarge6 />
      <Title gallery title="Enter in the details on your collection that will be used for your marketplace page on gardeneden.io" fontMedium xl nowrap={false} />

      <div className={`${cx("containerContent")} ${cx("mb")}`}>
        <Title title="Collection Description" white xl fontMedium nowrap={false} />
        <TextArea type="text" name="description" value={formState.description} placeholder="2000 unique NFTs governed by DAO" onChange={handleChange} />
      </div>

      <div className={`${cx("containerContent")} ${cx("mb")}`}>
        <Title title="NFT Image (500x500px)" gallery xl fontMedium nowrap={false} />
        <div>
          <input ref={fileInputRef} type="file" className={cx("inputFileImage")} onChange={onFileDrop} />
          <Button title="Upload" background className={cx("buttonUploadImage")} onClick={handleUpload} />
        </div>
        <Title title="Max file size 5MB. This is the image that will show on your collection page." nowrap={false} gallery xl fontMedium />
        {formState.imageURL && <img src={formState.imageURL} alt="uploadImage" className={cx("imageUpload")} />}
      </div>

      <Category primaryCategories={formState.primaryCategories} secondaryCategories={formState.secondaryCategories} setPrimaryCategories={(value) => handleChange({ target: { name: "primaryCategories", value } })} setSecondaryCategories={(value) => handleChange({ target: { name: "secondaryCategories", value } })} />

      <div className={`${cx("mb")}`}>
        <Title title="Social & Web Links" white nowrap={false} fontBold xxxl />
      </div>

      <Title title="Input your social and websites links for your collection. These links will be displayed on your collection page" white nowrap={false} fontMedium xl />

      <div className={`${cx("containerContent")}`}>
        <Title title="Please link your Twitter" white xl fontMedium nowrap={false} />
        <div>
          <Button title="Link Twitter" border className={cx("buttonLinkTwitter")} onClick={handleAuthenticationWithTwitter} />
        </div>
        {formState.twitterURL && (
          <Link to={formState.twitterURL} target="_blank" rel="noopener noreferrer" className={cx("linkTwitterProfile")}>
            {formState.twitterURL}
          </Link>
        )}
      </div>

      <div className={`${cx("containerContent")} ${cx("mb")}`}>
        <Title title="Discord Invite Code (Optional)" white nowrap={false} fontMedium xl />
        <Title title={`https://discord.gg/`} gallery medium />
        <TextInput type="text" name="discordURL" value={formState.discordURL} placeholder="98yXPI" onChange={handleChange} />
      </div>

      <div className={`${cx("containerContent")} ${cx("mb")}`}>
        <Title title="Website Url (Optional)" white nowrap={false} fontMedium xl />
        <TextInput type="text" name="websitesURL" value={formState.websitesURL} placeholder="https://supercollection.io" onChange={handleChange} />
      </div>

      <div className={`${cx("mb")}`}>
        <Button title="Save & Proceed" disabled={disable || loading} className={`${cx("buttonSave")} ${disable ? cx("disable") : ""}`} onClick={handleSave} />
      </div>
    </div>
  );
};

Details.propTypes = {
  data: PropTypes.object.isRequired,
};

export default Details;
