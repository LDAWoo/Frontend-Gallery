import classNames from "classnames/bind";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { disconnectedWalletMetaMaskEthereum } from "~/api/MetaMaskEthereum/MetaMaskEthereum.services";
import { disconnectedWalletPhantomSolana } from "~/api/PhantomSolana/PhantomSolana.services";
import { disconnectIcon, dollarIcon } from "~/assets/Icon";
import { UserContext } from "~/components/Contexts/AppUserProvider";
import Icon from "~/components/Icon";
import Title from "~/components/Title";
import routesConfig from "~/configs";
import setCookie from "~/hooks/useRegisterSetCookie";
import { setGlobalState, truncate, useGlobalState } from "~/store";
import styles from "./Body.module.sass";
const cx = classNames.bind(styles);

const Body = () => {
  const navigate = useNavigate();
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [balances] = useGlobalState("currentBalances");
  const [closeModalUserDropDown] = useGlobalState("closeModalUserDropDown");
  const [showModalUserSignIn] = useGlobalState("showModalUserSignIn");
  const { artist, setArtist } = useContext(UserContext);
  const {t} = useTranslation();

  const items = [
    {
      id: "blockchain",
      groups: [
        {
          icon: dollarIcon,
          name: t("Navbar.Right.main"),
          balances: balances,
          chain: connectedAccount.chain === "solana" ? " SOL" : "",
          actions: [
            {
              id: "address",
              name: connectedAccount.address ? truncate(connectedAccount.address, 5, 3, 11) : "",
              icon: dollarIcon,
              active: true,
            },
            {
              id: "addFunds",
              name: "",
              active: true,
            },
          ],
        },
        {
          icon: disconnectIcon,
          active: true,
          actions: [
            {
              id: "connectDifferentWallet",
              name: t("Navbar.Right.mains.connectDifferent"),
            },
            {
              id: "disconnect",
              name: t("Navbar.Right.mains.disconnect"),
            },
          ],
        },
      ],
    },
    {
      id: "menu",
      groups: [
        {
          name: t("Navbar.Right.items.myItems"),
          url: routesConfig.profile,
        },
        {
          name: t("Navbar.Right.items.rewards"),
          subName: t("Navbar.Right.items.signIn"),
          type: "showModalUserSignIn",
          modal: showModalUserSignIn,
          active: Object.keys(artist).length > 0,
        },
        {
          name: t("Navbar.Right.items.accountSettings"),
          url: routesConfig.profile + "?tab=settings",
        },
        {
          name: t("Navbar.Right.items.manageWallets"),
          url: routesConfig.profile + "?tab=manage-wallet",
        },
      ],
    },
  ];

  const handleAction = (id) => {
    const name = connectedAccount.name;
    const chain = connectedAccount.chain;
    if (id === "connectDifferentWallet") {
      setGlobalState("connectedModal", true);
    }
    if (id === "disconnect") {
      setGlobalState("closeModalUserDropDown", !closeModalUserDropDown);
      setTimeout(() => {
        if (name === "phantom" && chain === "solana") {
          handleSignOut();
          disconnectedWalletPhantomSolana();
        }

        if (name === "metamask" && chain === "ethereum") {
          disconnectedWalletMetaMaskEthereum();
        }
      }, 300);
    }
  };

  const handleSignOut = () => {
    setCookie("token", "");
    setArtist({});
  };

  const handleClickUrlMenuItem = (url) => {
    handleCloseModalUserDropDown();
    navigate(url);
  };

  const handleClickModalMenuItem = (type, modal) => {
    handleCloseModalUserDropDown();
    setGlobalState(type, !modal);
  };

  const handleCloseModalUserDropDown = () => {
    setGlobalState("closeModalUserDropDown", !closeModalUserDropDown);
  };

  return (
    <div className={cx("wrapper")}>
      {items?.map((item, index) => (
        <div key={index} className={cx("container")}>
          {item?.id === "blockchain" && (
            <div className={cx("itemBlockchain")}>
              {item?.groups.map((group, index) => (
                <div key={index} className={cx("containerGroup")}>
                  <div className={cx("containerIcon")}>
                    <Icon icon={group?.icon} size={20} classIcon={`${cx("iconGroup")} ${group.active ? cx("active") : ""}`} />
                  </div>
                  <div className={cx("containerContent")}>
                    <div className={cx("contentGroup")}>
                      <div className={cx("content")}>{group?.name}</div>
                      {group.balances && group.chain && <div className={cx("content")}>{group.balances + group.chain}</div>}
                    </div>
                    <div className={cx("contentGroup")}>
                      {group?.actions.map((action, index) => (
                        <div key={index} className={`${cx("contentAction")} ${action.active ? cx("active") : ""}`} onClick={() => handleAction(action.id)}>
                          {action?.name}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <span className={cx("border")} />
          {item?.id === "menu" && (
            <div className={cx("itemMenu")}>
              {item?.groups.map((group, index) => (
                <div key={index}>
                  <>
                    {group?.url && (
                      <div className={cx("menuGroup")} onClick={() => handleClickUrlMenuItem(group?.url)}>
                        <div className={cx("containerMenu")}>
                          <Title title={group?.name} fontBold />
                        </div>
                      </div>
                    )}
                    {!group?.active && !group?.url && (
                      <div className={cx("menuGroup")} onClick={() => handleClickModalMenuItem(group?.type, group?.modal)}>
                        <div className={cx("containerMenu")}>
                          <Title title={group?.name} fontBold />
                          {group?.subName && <div className={cx("subName")}>{group?.subName}</div>}
                        </div>
                      </div>
                    )}
                  </>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Body;
