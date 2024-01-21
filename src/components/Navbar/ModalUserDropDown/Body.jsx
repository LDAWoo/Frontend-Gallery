import classNames from "classnames/bind";
import { useNavigate } from "react-router-dom";
import { disconnectedWalletPhantomSolana } from "~/api/PhantomSolana/PhantomSolana.services";
import { disconnectIcon, dollarIcon } from "~/assets/Icon";
import Icon from "~/components/Icon";
import Title from "~/components/Title";
import routesConfig from "~/configs";
import { setGlobalState, truncate, useGlobalState } from "~/store";
import styles from "./Body.module.sass";
const cx = classNames.bind(styles);

const Body = () => {
  const navigate = useNavigate();
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [closeModalUserDropDown] = useGlobalState("closeModalUserDropDown");
  const items = [
    {
      id: "blockchain",
      groups: [
        {
          icon: dollarIcon,
          name: "Main",
          value: 0,
          actions: [
            {
              id: "address",
              name: truncate(connectedAccount.address, 5, 3, 11),
              icon: dollarIcon,
              active: true,
            },
            {
              id: "addFunds",
              name: "Add Funds",
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
              name: "Connect Different Wallet",
            },
            {
              id: "disconnect",
              name: "Disconnect",
            },
          ],
        },
      ],
    },
    {
      id: "menu",
      groups: [
        {
          name: "My Items",
          url: routesConfig.profile,
        },
        {
          name: "Rewards",
          subName: "Sign in",
          url: "",
        },
        {
          name: "Account Settings",
          url: routesConfig.profile + "?tab=settings",
        },
        {
          name: "Manage Wallets",
          url: routesConfig.profile + "?tab=manage-wallet",
        },
      ],
    },
  ];

  const handleAction = (id) => {
    console.log(id);
    if (id === "connectDifferentWallet") {
      setGlobalState("connectedModal", true);
    }
    if (id === "disconnect") {
      setGlobalState("closeModalUserDropDown", !closeModalUserDropDown);
      setTimeout(() => {
        disconnectedWalletPhantomSolana();
      }, 300);
    }
  };

  const handleClickMenuItem = (url) => {
    setGlobalState("closeModalUserDropDown", !closeModalUserDropDown);
    navigate(url);
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
                      <div className={cx("content")}>{`${group.value > -1 ? `${group.value} SOL` : ""}`}</div>
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
                <div key={index} className={cx("menuGroup")} onClick={() => handleClickMenuItem(group?.url)}>
                  <div className={cx("containerMenu")}>
                    <Title title={group?.name} fontBold />
                    {group?.subName && <div className={cx("subName")}>{group?.subName}</div>}
                  </div>
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
