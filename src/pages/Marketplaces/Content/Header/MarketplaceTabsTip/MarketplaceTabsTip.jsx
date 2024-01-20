import TabsTip from "~/components/TabsTip";

const items = [
  {
    name: "Items",
    tabs: "items",
  },
  {
    name: "Offers",
    tabs: "offers",
  },
  {
    name: "AMM",
    tabs: "AMM",
  },
];

const MarketplaceTabsTip = () => {
  return <TabsTip data={items} params="activeTabs" />;
};

MarketplaceTabsTip.propTypes = {};

export default MarketplaceTabsTip;
