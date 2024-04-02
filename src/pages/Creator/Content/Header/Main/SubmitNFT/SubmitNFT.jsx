import classNames from "classnames/bind";
import Button from "~/components/Button";
import Image from "~/components/Image";
import Title from "~/components/Title";
import styles from "./SubmitNFT.module.sass";
import { setGlobalState, useGlobalState } from "~/store";
import { createNFTPhantomSolana } from "~/api/PhantomSolana/PhantomSolana.services";
import PropTypes from "prop-types";

import { format } from "date-fns";
import { postCreateNFT, updateHistoryCreateNFT } from "~/api/CreatorNFT";
import { useContext, useEffect, useState } from "react";
import { getCategoryById } from "~/api/Category";
import { UserContext } from "~/components/Contexts/AppUserProvider";
import { Bounce, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import routesConfig from "~/configs";
import { useTranslation } from "react-i18next";
import { getLocale } from "~/locale/Locale";

const cx = classNames.bind(styles);
const SubmitNFT = ({ data }) => {
  const {t} = useTranslation();
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [loading] = useGlobalState("loading");
  const [primaryCategory, setPrimaryCategory] = useState("");
  const [secondaryCategory, setSecondaryCategory] = useState("");
  const locale = getLocale();
  const { artist } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      if (Object.keys(data).length > 0) {
        try {
          const categoryIds = [data.id_primary_category, data.id_secondary_category];
          const results = await Promise.all(categoryIds.map(getCategoryById));
          const [primaryCategoryData, secondaryCategoryData] = results;

          setPrimaryCategory(primaryCategoryData);
          setSecondaryCategory(secondaryCategoryData);
        } catch (e) {
          console.log(e);
        }
      }
    };
    fetchData();
  }, [data]);

  const items = [
    {
      id: 2,
      data: [
        {
          name: t("Creator.Main.Submit.items.item1"),
          value: data?.name,
          visible: data?.name,
        },
        {
          name: t("Creator.Main.Submit.items.item2"),
          value: data?.symbolNFT,
          visible: data?.symbolNFT,
        },
      ],
    },
    {
      id: 2,
      data: [
        {
          name: t("Creator.Main.Submit.items.item3"),
          value: data?.supply,
          visible: data?.supply,
        },
        {
          name: t("Creator.Main.Submit.items.item4"),
          value: data?.description,
          visible: data?.description
        },
        {
          name: t("Creator.Main.Submit.items.item5"),
          value: primaryCategory.name,
          visible: primaryCategory.name,
        },
        {
          name: t("Creator.Main.Submit.items.item6"),
          value: secondaryCategory.name,
          visible: secondaryCategory.name,
        },
      ],
    },
    {
      id: 3,
      data: [
        {
          name: t("Creator.Main.Submit.items.item7"),
          url: data?.image_url,
          type: "image",
          visible: data?.image_url,
        },
      ],
    },
    {
      id: 4,
      data: [
        {
          name: t("Creator.Main.Submit.items.item8"),
          url: data?.twitter_url,
          type: "link",
          visible: data?.twitter_url,
        },
        {
          name: t("Creator.Main.Submit.items.item9"),
          url: "https://discord/" + data?.discord_url,
          type: "link",
          visible: data?.discord_url
        },
        {
          name: t("Creator.Main.Submit.items.item10"),
          url: data?.website_url,
          type: "link",
          visible: data?.website_url
        },
      ],
    },
    {
      id: 5,
      data: [
        {
          name: t("Creator.Main.Submit.items.item11"),
          type: "date",
          value: data?.mint_date,
          visible: data?.mint_date
        },
      ],
    },
  ];

  const handleCreateNFT = async () => {
    const address = connectedAccount.address;
    if (!address) {
      setGlobalState("connectedModal", true);
      return;
    }
    const currentData = {
      id: data.id,
      wallet_address: address,
    };
    try {
      setGlobalState("loading", true);

      if (data.wallet_address !== address) {
        await updateHistoryCreateNFT(currentData);
      }

      const dataCreateNFT = {
        address: address,
        name: data?.name,
        symbol: data?.symbolNFT,
        description: data?.description,
        externalURL: data?.website_url,
        supply: data?.supply,
        image: data?.image_url,
      };

      
      const {signature,tokenAddress} = await createNFTPhantomSolana(dataCreateNFT);

      if (!signature) return;

      const dataSaveCreateNFT = {
        artistRequest: {
          id_artist: artist.id,
          email: artist.email,
          symbol: data?.symbolArtist,
          discord_url: data?.discord_url,
          twitter_url: data?.twitter_url,
          website_url: data?.website_url,
        },
        artworkRequest: {
          id_history_create_nft: data.id,
          wallet_address: address,
          tokenAddress: tokenAddress,
          name: data?.name,
          symbolNFT: data?.symbolNFT,
          description: data?.description,
          image_url: data?.image_url,
          chain: connectedAccount.chain,
          supply: data?.supply,
          mint_date: data?.mint_date,
        },
        transactionRequest: {
          signature: signature,
        },
        categoryIds: [data.id_primary_category, data.id_secondary_category],
      };

      await postCreateNFT(dataSaveCreateNFT);
      setGlobalState("loading", false);
      toastInformation(
        t("Creator.Main.Submit.Success")
      )

    } catch (e) {
      setGlobalState("loading", false);
      toastError(
        t("Creator.Main.Submit.Error")
      )
    }
  };

  const toastInformation = (message) => {
    toast(`🦄 ${message}`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
      onClose: () => onClose(),
    });
  };

  const toastError = (message) => {
    toast(`🦄 ${message}`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };



  const onClose = () => {
    navigate(routesConfig.dashboard);
  };

  return (
    <div className={cx("wrapper")}>
      <Title gallery title={t("Creator.LastStep")} large nowrap={false} />
      <Title title={t("Creator.Main.Submit.title")} white nowrap={false} fontBold extraLarge6 />
      <Title gallery title={t("Creator.Main.Submit.subTitle")} fontMedium xl nowrap={false} />

      <div className={`${cx("containerContent")} ${cx("mb")}`}>
        <div className={cx("container")}>
          {items.map((item, index) => (
            <div key={index} className={cx("containerData")}>
              {item?.data.map((x, index) => (
                <div key={index} className={cx("containerItem")}>
                  {x?.visible && 
                    <>
                      <div className={cx("nameItem")}>{x?.name}:</div>
                        <div className={cx("containerValue")}>
                          {x?.value && x?.type !== "date" && <div className={cx("valueItem")}>{x?.value}</div>}
                          {x?.url && x?.type === "image" && (
                            <div className={cx("containerImage")}>
                              <Image lazy={false} src={x?.url} className={cx("image")} />
                            </div>
                          )}
                          {x?.url && x?.type === "link" && <div className={cx("linkValue")}>{x?.url}</div>}
                          {x?.type === "date" && <div className={cx("valueItem")}>{x?.value && format(x?.value, "MMMM dd, yyyy pppp", {locale})} </div>}
                      </div>
                    </>
                  }
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={`${cx("mb")}`}>
        <Button title={t("Creator.Submit")} disabled={loading} className={`${cx("buttonSubmit")} ${loading ? cx("disabled") : ""}`} onClick={handleCreateNFT} />
      </div>
    </div>
  );
};

SubmitNFT.propTypes = {
  data: PropTypes.object.isRequired,
};

export default SubmitNFT;
