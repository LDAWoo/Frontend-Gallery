import classNames from "classnames/bind";
import Button from "~/components/Button";
import Image from "~/components/Image";
import Title from "~/components/Title";
import styles from "./SubmitNFT.module.sass";
import { useGlobalState } from "~/store";
import { createNFT } from "~/NFTMarketplace/NFTMarketplace";
import { createNFTPhantomSolana } from "~/api/PhantomSolana/PhantomSolana.services";
const cx = classNames.bind(styles);
const SubmitNFT = () => {
  const [formDataCreateNFT] = useGlobalState("formDataCreateNFT");
  const [connectedAccount] = useGlobalState("connectedAccount");
  const items = [
    {
      id: 2,
      data: [
        {
          name: "name",
          value: formDataCreateNFT.collectionName,
        },
        {
          name: "symbol",
          value: formDataCreateNFT.collectionSymbol,
        },
      ],
    },
    {
      id: 2,
      data: [
        {
          name: "total supply",
          value: formDataCreateNFT.collectionPrice,
        },
        {
          name: "description",
          value: formDataCreateNFT.collectionDescription,
        },
        {
          name: "categories primary",
          value: "games",
        },
        {
          name: "categories secondary",
          value: "virtual_worlds",
        },
      ],
    },
    {
      id: 3,
      data: [
        {
          name: "collection pfp",
          url: formDataCreateNFT.currentUrlImage,
          type: "image",
        },
      ],
    },
    {
      id: 4,
      data: [
        {
          name: "twitter",
          url: "https://www.googleapis.com/",
          type: "link",
        },
        {
          name: "discord",
          url: "https://www.googleapis.com/",
          type: "link",
        },
        {
          name: "website",
          url: "https://www.googleapis.com/",
          type: "link",
        },
      ],
    },
    {
      id: 5,
      data: [
        {
          name: "mint date",
          value: "March 17, 2024 9:00 PM GMT ( GMT )",
        },
      ],
    },
  ];

  const handleCreateNFT = async () => {
    const address = connectedAccount.address;
    const name = formDataCreateNFT.collectionName;
    const symbol = formDataCreateNFT.collectionSymbol;
    const description = formDataCreateNFT.collectionDescription;
    const external_url = "";
    const royalty = 10;
    const supply = formDataCreateNFT.collectionPrice;
    const image = formDataCreateNFT.currentUrlImage;

    console.log(formDataCreateNFT);
    createNFTPhantomSolana(address, name, symbol, description, external_url, supply, royalty, image, address);
  };

  return (
    <div className={cx("wrapper")}>
      <Title gallery title="The last step" large nowrap={false} />
      <Title title="Review & Submit" white nowrap={false} fontBold extraLarge6 />
      <Title gallery title="You are ready to submit your listing application. Please  review the details below and confirm it is connect. Click submit when you are ready to submit." fontMedium xl nowrap={false} />

      <div className={`${cx("containerContent")} ${cx("mb")}`}>
        <div className={cx("container")}>
          {items.map((item, index) => (
            <div key={index} className={cx("containerData")}>
              {item?.data.map((x, index) => (
                <div key={index} className={cx("containerItem")}>
                  <div className={cx("nameItem")}>{x?.name}:</div>
                  {x?.value && <div className={cx("valueItem")}>{x?.value}</div>}
                  {x?.url && x?.type === "image" && (
                    <div className={cx("containerImage")}>
                      <Image lazy={false} src={x?.url} className={cx("image")} />
                    </div>
                  )}
                  {x?.url && x?.type === "link" && <div className={cx("linkValue")}>{x?.url}</div>}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={`${cx("mb")}`}>
        <Button title="Submit" className={cx("buttonSubmit")} onClick={handleCreateNFT} />
      </div>
    </div>
  );
};

export default SubmitNFT;
