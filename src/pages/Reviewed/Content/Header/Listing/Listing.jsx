import classNames from "classnames/bind";
import { LuCopy } from "react-icons/lu";
import Icon from "~/components/Icon";
import Image from "~/components/Image";
import TabsTip from "~/components/TabsTip";
import Title from "~/components/Title";
import { copyText, setGlobalState, truncate, useGlobalState } from "~/store";
import styles from "./Listing.module.sass";
import PropTypes from "prop-types";
import ListingSkeleton from "./ListingSkeleton";
import Button from "~/components/Button";
import { FaPlus } from "react-icons/fa6";
import Tooltip from "~/components/Tooltip";
import { postCreateMarketplace } from "~/api/Marketplace";
import { createMarketplacePhantomSolana, findMarketplacePhantomSolana } from "~/api/PhantomSolana/PhantomSolana.services";

const cx = classNames.bind(styles);

const items = [
  {
    id: 1,
    tabs: "overview",
    name: "Overview",
  },
  {
    id: 2,
    tabs: "claimCondition",
    name: "Claim Condition",
  },
  {
    id: 3,
    tabs: "settings",
    name: "Settings",
  },
];

const Listing = ({ data, loading }) => {
  const [WidthAndHeightWindow] = useGlobalState("WidthAndHeightWindow")
  const [loadingGlobal] = useGlobalState("loading");
  const [connectedAccount] = useGlobalState("connectedAccount");

  const handleCopyWalletAddress = () => {
    copyText(data?.wallet_address);
  };


  const handleCreateMarketplace = async() => {
    if(!connectedAccount){
      setGlobalState("connectedModal" ,true);
      return;
    }
    if(loadingGlobal) return;

    const dataCreate = {
      currentAddress: data?.wallet_address,
      creatorAddress: connectedAccount.address
    }

    try{   
      setGlobalState("loading", true);

      const {signature, marketplaceAddress, marketplaceAuthority} = await createMarketplacePhantomSolana(dataCreate.creatorAddress, dataCreate.currentAddress);
      
      const dataCreateMarketplace = {
        ...dataCreate,
        signature,
        marketplaceAddress,
        marketplaceAuthority
      }

      const results = await postCreateMarketplace(dataCreateMarketplace);
      console.log(results);

      setGlobalState("loading", false);
    }catch(e){
      setGlobalState("loading", false);
    }
  }

  return (
    <>
      <div className={cx("wrapper")}>
        <div className={cx("container")}>
          <div className={cx("containerNFT")}>
            <div className={cx('wrapperNFT')}>
              <div className={cx("wrapperMetaData")}>{loading ? <ListingSkeleton metaData /> : <Image src={data?.image_url} />}</div>

              <div className={cx("wrapperNameNFT")}>
                {loading ? (
                  <ListingSkeleton wrapperNameNFT />
                ) : (
                  <>
                    <Title title={data?.name} white fontBold xxl />
                    <Title title={data?.symbol} large nowrap medium />
                    <div className={cx("wrapperWalletAddress")} onClick={handleCopyWalletAddress}>
                      <Icon icon={LuCopy} size={14} classIcon={cx("wrapperCopyIcon")} />
                      {data?.wallet_address && <Title title={truncate(data?.wallet_address, 4, 3, 11)} large />}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className={cx('wrapperMarketplace')}>
                  <div>
                    {WidthAndHeightWindow.width > 786 ? <Button title="Create Marketplace" xl fontBold className={cx('buttonMarketplace')} background onClick={handleCreateMarketplace}/> 
                    : <Tooltip content="Create Marketplace" toolTip placement="bottom">
                       <div>
                          <Button icon={FaPlus} size={18} fontBold className={cx('buttonMarketplace')} background/>
                        </div>
                     </Tooltip> 
                    }
                  </div>
            </div>
          </div>

          <div>
            <TabsTip data={items} params="tabs" className={cx("wrapperTabTip")} />
          </div>
        </div>
      </div>
    </>
  );
};

Listing.propTypes = {
  data: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Listing;
