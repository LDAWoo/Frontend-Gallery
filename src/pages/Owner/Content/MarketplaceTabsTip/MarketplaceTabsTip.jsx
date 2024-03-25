import TabsTip from "~/components/TabsTip";

const items = [
  {
    name: "Items",
    tabs: "myItem",
  },
  // {
  //   name: "Offers",
  //   tabs: "offers",
  // },
  // {
  //   name: "AMM",
  //   tabs: "AMM",
  // },
  // {
  //   name: "Activity",
  //   tabs: "activity",
  // },
];

const MarketplaceTabsTip = () => {
  return <TabsTip data={items} params="tab" />;
};

MarketplaceTabsTip.propTypes = {};

export default MarketplaceTabsTip;
