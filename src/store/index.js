import { createGlobalState } from "react-hooks-global-state";
import { Bounce, toast } from "react-toastify";

const { setGlobalState, getGlobalState, useGlobalState } = createGlobalState({
  connectedAccount: { address: "", chain: "", name: "" },
  showModalNavbarDiscover: false,
  showModalNavbarMint: false,
  currentBalances: 0,
  showPanelSearch: false,
  modalConnectedWallet: {
    active: "",
    data: [],
  },
  showModalAppShortCut: false,
  showAreaLeft: false,
  showNavigation: true,
  showActivity: false,
  showAnalytics: false,
  showSettings: false,
  showFilter: false,
  showArtistInfo: false,
  showHomeGridStyle: "",
  trendingHomeRefresh: {
    data: [],
    loading: false,
  },
  trendingHomeFilter: {
    dataSearch: "",
    dataFilter: {
      floorPrice: 0,
    },
    modalFilter: false,
    favorites: false,
  },
  showBannerHome: true,
  showMarketplaceGridStyle: "",
  showNFTDetails: {
    active: false,
    data: [],
  },
  showActiveNFTDetails: {
    overview: false,
    activity: false,
    offers: false,
  },
  activeAnalyticsNavigation: "sales",
  connectedModal: false,
  closeModalConnectWallet: false,
  showModalUserDropDown: false,
  closeModalUserDropDown: false,
  showModalUserSignIn: false,
  showModalUserInboxEmail: false,
  activeSettingAndManageWallet: "",
  showModalAvatar: false,
  activeSetting: "",
  WidthAndHeightWindow: { width: window.innerWidth, height: window.innerHeight },
  showModalCart: false,
  carts: [],
  emailLoginOrSignUp: "",
  showModalWelcome: true,
  showModalInboxEmail: false,
  showModalEmailExpired: false,
  showModalAddAttributeNFT: {
    active: false,
    data: [],
  },
  currentAttribute: [],
  currentShowDisplayArtwork: null,
  currentSourceCreator: "",
  loading: false,
  profiles: {
    data: {},
    avatarName: "",
    avatarPreview: "",
  },
  owners: {
    data: [],
    loading: false,
  },
  showOwners: false,
  ownerArtworksFilter: {
    dataSearch: "",
    sortValues: {
      sortPrice: "high_to_low",
      sortListed: "all"
    },
  }
});

const truncate = (text, startChars, endChars, maxLength) => {
  if (text.length > maxLength) {
    var start = text.substring(0, startChars);
    var end = text.substring(text.length - endChars, text.length);

    while (start.length + end.length < maxLength) {
      start = start + ".";
    }
    return start + end;
  }
  return text;
};

const copyText = (text) => {
  if (text) {
    const tempInput = document.createElement("input");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    handleSuccessfully();
    return true;
  }

  return false;
};

const handleSuccessfully = () => {
  toast("🦄 Copy Successfully!", {
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

export { useGlobalState, setGlobalState, getGlobalState, truncate, copyText };
