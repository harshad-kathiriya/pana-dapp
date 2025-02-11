import arbitrum_testnet from "./assets/arbitrum_plain.svg";
import { NodeHelper } from "./helpers/NodeHelper";

export const EPOCH_INTERVAL = 2200;

// NOTE could get this from an outside source since it changes slightly over time
export const BLOCK_RATE_SECONDS = 13.14;

export const TOKEN_DECIMALS = 18;

export const SHOW_COUNTDOWN_PAGE = false;

export enum NetworkId {
  ARBITRUM_MAINNET = 42161,
  ARBITRUM_TESTNET = 421611,

  Localhost = 1337,
}

interface IAddresses {
  [key: number]: { [key: string]: string };
}

export const addresses: IAddresses = {
  [NetworkId.ARBITRUM_MAINNET]: {
    USDC_ADDRESS: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
    PANA_ADDRESS: "0x369eB8197062093a20402935D3a707b4aE414E9D",
    KARSHA_ADDRESS: "",
    PANA_USDC_LP: "0x300fDD222687db8686EA51847Db43fa988b518E0",
    STAKING_ADDRESS: "",

    DISTRIBUTOR_ADDRESS: "",
    BONDINGCALC_ADDRESS: "",

    BOND_DEPOSITORY: "",
    DAO_TREASURY: "",
    DAO_MULTISIG: "0xa178776D7B05931e31b2b955Dd97436F08046cFe",
    STAKING_POOLS: "0x1288D0bEd4F0a1381A0f63cbC97C7353908623be"
  },
  [NetworkId.ARBITRUM_TESTNET]: {
    USDC_ADDRESS: "0x91700A0a45bef3Ef488eC11792aE3b3199e0dC4e",
    PANA_ADDRESS: "0x053Bdec0bEC0b010C7dd37E82C2246d107d6B363",
    SPANA_ADDRESS: "0xE75C7C6C1491B91887FB4B72C4F42B0CD6B6EEBC",
    KARSHA_ADDRESS: "0x44333156C47AC50631236B02C97751583A334F41",
    PANA_USDC_LP: "0x91a2d26e987219E6a266784d5a816ceEf03cB3B8",
    STAKING_ADDRESS: "0x3D0DA0E2C27FE2A14D2BEEA7165F183EBC0CA64A",

    DISTRIBUTOR_ADDRESS: "0xA9A0B7CEE748A4C5BDF15EB749947FC5020AABDB",
    BONDINGCALC_ADDRESS: "0x8EE19FE0DA2C29BF864049B09997019781AB4FE2",

    BOND_DEPOSITORY: "0x7ADA3E4250c23001760Fb3983645B8778f24a515",
    BOND_DEPOSITORY_OLD: "0x0f4196ca36696D0938568ee7FD8ff7be83C1E7ef",
    DAO_TREASURY: "0xF7A4A8EFC0153262BC449D021F268A63F4B49417",

    PPANA_ADDRESS: "0x404D1F1300F28BFEE5FDED5FE9D5F898B93E65F5",
    PPANA_REDEEM_ADDRESS: "0x32C90D5E7AA30DD15B8AEBBEF565CF0BC732B329",
    DAO_MULTISIG: "0xde9eB6AB368290D17eb207206e2a067C65D98F15",
    STAKING_POOLS: "0xaffB1cB501DccC274F81D0C6d495DdDbEFE9687F"
  },
};

/**
 * Network details required to add a network to a user's wallet, as defined in EIP-3085 (https://eips.ethereum.org/EIPS/eip-3085)
 */

interface INativeCurrency {
  name: string;
  symbol: string;
  decimals?: number;
}

interface INetwork {
  chainName: string;
  chainId: number;
  nativeCurrency: INativeCurrency;
  rpcUrls: string[];
  blockExplorerUrl: string;
  image: SVGImageElement;
  imageAltText: string;
  uri: () => string;
  isOracleIntegrated: boolean;
}

// These networks will be available for users to select. Other networks may be functional
// (e.g. testnets, or mainnets being prepared for launch) but need to be selected directly via the wallet.
export const USER_SELECTABLE_NETWORKS = [NetworkId.ARBITRUM_MAINNET];

// Set this to the chain number of the most recently added network in order to enable the 'Now supporting X network'
// message in the UI. Set to -1 if we don't want to display the message at the current time.
export const NEWEST_NETWORK_ID = NetworkId.ARBITRUM_MAINNET;

export const NETWORKS: { [key: number]: INetwork } = {
  [NetworkId.ARBITRUM_MAINNET]: {
    chainName: "Arbitrum",
    chainId: 42161,
    nativeCurrency: {
      name: "Arbitrum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://arb1.arbitrum.io/rpc", "https://arbitrum-mainnet.infura.io/v3"],
    blockExplorerUrl: "https://arbiscan.io",
    image: arbitrum_testnet,
    imageAltText: "Arbitrum Logo",
    uri: () => NodeHelper.getMainnetURI(NetworkId.ARBITRUM_MAINNET),
    isOracleIntegrated: false
  },
  [NetworkId.ARBITRUM_TESTNET]: {
    chainName: "Arbitrum Testnet",
    chainId: 421611,
    nativeCurrency: {
      name: "Arbitrum",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://rinkeby.arbitrum.io/rpc"],
    blockExplorerUrl: "https://rinkeby-explorer.arbitrum.io/#",
    image: arbitrum_testnet,
    imageAltText: "Arbitrum Testnet",
    uri: () => NodeHelper.getMainnetURI(NetworkId.ARBITRUM_TESTNET),
    isOracleIntegrated: true
  },
};

// VIEWS FOR NETWORK is used to denote which paths should be viewable on each network
// ... attempting to prevent contract calls that can't complete & prevent user's from getting
// ... stuck on the wrong view
interface IViewsForNetwork {
  dashboard: boolean;
  stake: boolean;
  wrap: boolean;
  network: boolean;
  bonds: boolean;
  pPana: boolean;
}

export const VIEWS_FOR_NETWORK: { [key: number]: IViewsForNetwork } = {
  [NetworkId.ARBITRUM_MAINNET]: {
    dashboard: true,
    stake: false,
    wrap: false,
    network: false,
    bonds: false,
    pPana: false,
  },
  [NetworkId.ARBITRUM_TESTNET]: {
    dashboard: true,
    stake: true,
    wrap: true,
    network: true,
    bonds: true,
    pPana: true,
  },
};
