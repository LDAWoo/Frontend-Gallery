import classNames from "classnames/bind";
import styles from "./Body.module.sass";
import { disconnectIcon, dollarIcon } from "~/assets/Icon";
import Icon from "~/components/Icon";
import { truncate, useGlobalState } from "~/store";
import { formatPrice } from "~/format";
import Title from "~/components/Title";
import { Link } from "react-router-dom";
const cx = classNames.bind(styles);

const Body = () => {
  const [connectedAccount] = useGlobalState("connectedAccount");
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
              name: truncate(connectedAccount, 5, 3, 11),
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
          url: "/me",
        },
        {
          name: "Rewards",
          subName: "Sign in",
          url: "/me",
        },
        {
          name: "Account Settings",
          url: "/me",
        },
        {
          name: "Manage Wallets",
          url: "/me",
        },
      ],
    },
  ];

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
                        <div key={index} className={`${cx("contentAction")} ${action.active ? cx("active") : ""}`}>
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
                <Link key={index} to={group?.url} className={cx("menuGroup")}>
                  <div className={cx("containerMenu")}>
                    <Title title={group?.name} fontBold />
                    {group?.subName && <div className={cx("subName")}>{group?.subName}</div>}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Body;
