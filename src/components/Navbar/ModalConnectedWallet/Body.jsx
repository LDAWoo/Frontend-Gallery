import classNames from "classnames/bind";
import { useEffect } from "react";
import { connectedWalletMetaMaskEthereum } from "~/api/MetaMaskEthereum/MetaMaskEthereum.services";
import { connectedWalletPhantomSolana } from "~/api/PhantomSolana/PhantomSolana.services";
import { dollarIcon, phantomIcon } from "~/assets/Icon";
import Icon from "~/components/Icon";
import Title from "~/components/Title";
import { setGlobalState, useGlobalState } from "~/store";
import styles from "./Body.module.sass";

const cx = classNames.bind(styles);

const blockChains = [
  {
    id: "solana",
    name: "Solana",
    icon: dollarIcon,
    data: [
      {
        id: "phantom",
        name: "Phantom",
        icon: phantomIcon,
        active: true,
        recommended: true,
        background: "#ab9ff2",
      },
      // {
      //   id: "backpack",
      //   name: "Backpack",
      //   icon: backpackIcon,
      //   active: true,
      //   background: "transparent",
      // },
    ],
  },
  // {
  //   id: "ethereum",
  //   name: "Ethereum",
  //   icon: ethereumIcon,
  //   data: [
  //     {
  //       id: "phantom",
  //       name: "Phantom",
  //       icon: phantomIcon,
  //       recommended: true,
  //       active: true,
  //       background: "#ab9ff2",
  //     },
  //     {
  //       id: "metamask",
  //       name: "MetaMask",
  //       icon: metaMaskIcon,
  //       background: "transparent",
  //     },
  //   ],
  // },
];

const Body = () => {
  const [modalConnectedWallet] = useGlobalState("modalConnectedWallet");
  const [closeModalConnectWallet] = useGlobalState("closeModalConnectWallet");
  useEffect(() => {
    if (modalConnectedWallet?.data.length > 0) return;
    setGlobalState("modalConnectedWallet", { active: blockChains[0]?.id, data: blockChains[0]?.data });
  }, [modalConnectedWallet]);

  const handleChooseBlockChain = (blockChain, data) => {
    setGlobalState("modalConnectedWallet", { active: blockChain, data });
  };

  const handleConnectedWallet = async (chain, id) => {
    if (chain === "solana" && id === "phantom") {
      await connectedWalletPhantomSolana(chain, id);
    }
    if (chain === "ethereum" && id === "metamask") {
      await connectedWalletMetaMaskEthereum(chain, id);
    }
    setGlobalState("closeModalConnectWallet", !closeModalConnectWallet);
  };

  return (
    <div className={cx("wrapper")}>
      <Title nowrap={false} xl title="Choose how you want to connect. If you don't have a wallet, you can select a provider and create one." />
      <div className={cx("container")}>
        <div className={cx("contentBlockchain")}>
          {blockChains.map((item, index) => (
            <div key={index} onClick={() => handleChooseBlockChain(item?.id, item?.data)} className={`${cx("containerItem")} ${modalConnectedWallet.active === item?.id ? cx("active") : ""}`}>
              <div className={cx("wrapperItem")}>
                <Icon icon={item?.icon} classIcon={cx("iconBlockchain")} />
                <Title title={item?.name} large fontBold className={`${cx("nameBlockchain")} ${modalConnectedWallet.active === item?.id ? cx("active") : ""}`} />
              </div>
              <span className={`${cx("line")} ${modalConnectedWallet.active === item?.id ? cx("active") : ""}`}></span>
            </div>
          ))}
        </div>
        <div className={cx("contentTechnology")}>
          {modalConnectedWallet.data &&
            modalConnectedWallet.data.map((item, index) => (
              <div onClick={() => handleConnectedWallet(modalConnectedWallet.active, item?.id)} key={index} className={`${cx("wrapperTechnology")} ${item?.active ? cx("active") : ""}`}>
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
