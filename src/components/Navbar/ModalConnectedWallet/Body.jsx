import classNames from "classnames/bind";
import { useEffect, useState } from "react";
import { backpackIcon, dollarIcon, ethereumIcon, metaMaskIcon, phantomIcon } from "~/assets/Icon";
import Icon from "~/components/Icon";
import Title from "~/components/Title";
import styles from "./Body.module.sass";

const cx = classNames.bind(styles);

const blockChains = [
  {
    id: "solana",
    name: "Solana",
    icon: dollarIcon,
    data: [
      {
        name: "Phantom",
        icon: phantomIcon,
        active: true,
        recommended: true,
        background: "#ab9ff2",
      },
      {
        name: "Backpack",
        icon: backpackIcon,
        active: true,
        background: "transparent",
      },
    ],
  },
  {
    id: "ethereum",
    name: "Ethereum",
    icon: ethereumIcon,
    data: [
      {
        name: "Phantom",
        icon: phantomIcon,
        recommended: true,
        active: true,
        background: "#ab9ff2",
      },
      {
        name: "MetaMask",
        icon: metaMaskIcon,
        background: "transparent",
      },
    ],
  },
];

const Body = () => {
  const [active, setActive] = useState("");

  const [dataActive, setDataActive] = useState([]);

  useEffect(() => {
    setActive(blockChains[0]?.id);
    setDataActive(blockChains[0]?.data);
  }, []);

  const handleChooseBlockChain = (blockChain, data) => {
    setActive(blockChain);
    setDataActive(data);
  };

  const [extensions, setExtensions] = useState([]);

  return (
    <div className={cx("wrapper")}>
      <Title nowrap={false} xl title="Choose how you want to connect. If you don't have a wallet, you can select a provider and create one." />
      <div className={cx("container")}>
        <div className={cx("contentBlockchain")}>
          {blockChains.map((item, index) => (
            <div key={index} onClick={() => handleChooseBlockChain(item?.id, item?.data)} className={`${cx("containerItem")} ${active === item?.id ? cx("active") : ""}`}>
              <div className={cx("wrapperItem")}>
                <Icon icon={item?.icon} classIcon={cx("iconBlockchain")} />
                <Title title={item?.name} large fontBold className={`${cx("nameBlockchain")} ${active === item?.id ? cx("active") : ""}`} />
              </div>
              <span className={`${cx("line")} ${active === item?.id ? cx("active") : ""}`}></span>
            </div>
          ))}
        </div>
        <div className={cx("contentTechnology")}>
          {dataActive &&
            dataActive.map((item, index) => (
              <div key={index} className={`${cx("wrapperTechnology")} ${item?.active ? cx("active") : ""}`}>
                <Icon icon={item?.icon} classIcon={cx("iconTechnology")} style={{ backgroundColor: `${item.background}` }} />
                <div className={cx("nameTechnology")}>
                  <Title title={item?.name} xl fontSemiBold />
                  {item?.recommended && <span className={cx("detected")}>Detected</span>}
                </div>
                {item?.recommended && <div className={cx("technologyRecommended")}>Recommended</div>}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Body;
