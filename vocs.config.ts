import { defineConfig } from "vocs";

export default defineConfig({
  description: "Unlock Bitcoin's lending future with Surge's programmable dVaults. Secure Bitcoin collateral system with Taproot UTXOs, MPC signers, and decentralized lending infrastructure.",
  logoUrl: {
    light: "/logo/surge-icon-rec-light.svg",
    dark: "/logo/surge-icon-rec-dark.svg",
  },
  ogImageUrl: "https://docs.surge.build/assets/Meta.png",
  font: {
    google: "Inter",
  },
  // topNav: [
  //   { text: "Blog", link: "https://surge.build/blog" },
  // {
  //   text: "Bitcoin Playground",
  //   link: "https://surge.build/playground",
  // },
  //   { text: "Website", link: "https://www.surge.build/" },
  // ],
  theme: {
    // accentColor: "#f56949"
    accentColor: "#f4431b",
    // colorScheme: "dark",
  },
  title: "Surge - Bitcoin's Lending Future",
  sidebar: {
    "/": [
      {
        text: "OVERVIEW",
        items: [
          {
            text: "Introduction",
            link: "/overview/introduction",
          },
          {
            text: "Bitcoin Lending Landscape",
            link: "/overview/bitcoin-lending-landscape",
          },
          {
            text: "Key Challenges for Bitcoiners",
            link: "/overview/challenges",
          },
          {
            text: "Stablecoins - A $3 Trillion Opportunity",
            link: "/overview/stablecoins",
          },
        ],
      },
      {
        text: "PRODUCT & THESIS",
        items: [
          {
            text: "Our Thesis & Vision",
            link: "/product/our-thesis-vision",
          },
          {
            text: "Product Overview",
            link: "/product/overview",
          },
          {
            text: "Signers & Validators",
            link: "/product/signers-validators",
          },
        ],
      },
      {
        text: "KNOW THE TECH",
        items: [
          {
            text: "Overview",
            link: "/tech/overview",
          },
          {
            text: "dVault Script Tree",
            link: "/tech/vaults",
          },
          {
            text: "Execution State Machine",
            link: "/tech/execution-layer",
          },
          {
            text: "Cross-Chain Communication",
            link: "/tech/cross-chain-communication",
          },
        ],
      },
      {
        text: "GUIDE",
        items: [
          {
            text: "Demo",
            link: "/guide/demo",
          },
          {
            text: "Node Setup",
            link: "/guide/surge-node-setup",
          },
        ],
      },
      // {
      //   text: "BITCOIN REPORTS",
      //   items: [
      //     {
      //       text: "In-house Research",
      //       link: "/bitcoin-reports/in-house-research",
      //     },
      //     {
      //       text: "External Research",
      //       link: "/bitcoin-reports/external-research",
      //     },
      //   ],
      // },
      {
        text: "RESOURCES",
        items: [
          // {
          //   text: "Quick Links",
          //   link: "/resources/quick-links",
          // },
          {
            text: "Media Kit",
            link: "/resources/media-kit",
          },
          {
            text: "Community Guidelines",
            link: "/resources/community-guidelines",
          },
        ],
      },
    ],
  },
  socials: [
    {
      icon: "github",
      link: "https://github.com/surgebuild/",
    },
    {
      icon: "x",
      link: "https://x.com/surgebuild",
    },
    // {
    //   icon: "telegram",
    //   link: "https://t.me/surgebuild",
    // },
  ],
});
