import { defineConfig } from "vocs";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export default defineConfig({
  description: "Unlock Bitcoin's lending future with Surge's programmable dVaults. Secure Bitcoin collateral system with Taproot UTXOs, MPC signers, and decentralized lending infrastructure.",
  logoUrl: {
    light: "/logo/surge-icon-rec-light.svg",
    dark: "/logo/surge-icon-rec-dark.svg",
  },
  ogImageUrl: "/assets/meta_new.png",
  font: {
    google: "Inter",
  },
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
            link: "/",
          },
          {
            text: "Market Landscape",
            link: "/overview/bitcoin-lending-landscape",
          },
          {
            text: "Underserved Bitcoin Majority",
            link: "/overview/challenges",
          },
          {
            text: "Stablecoins adoption",
            link: "/overview/stablecoins",
          },
        ],
      },
      {
        text: "KNOW THE PRODUCT",
        items: [
          {
            text: "Our Thesis",
            link: "/product/our-thesis",
          },
          {
            text: "Product Overview",
            link: "/product/overview",
            collapsed: false,
            items: [
              {
                text: "For Bitcoiners",
                link: "/product/for-bitcoiners",
              },
              {
                text: "For Stablecoin Holders",
                link: "/product/for-stablecoiners",
              },
              {
                text: "For Infra Providers",
                link: "/product/providers",
              },
            ],
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
            text: "dVaults and Taproot",
            link: "/tech/vaults",
            collapsed: false,
            items: [
              {
                text: "Repayment",
                link: "/tech/payment",
              },
              {
                text: "Liquidation",
                link: "/tech/dvaults-liquidation",
              },
              {
                text: "Unilateral Exit",
                link: "/tech/exit",
              },
            ],
          },
          {
            text: "Threshold Schnorr (Signer Network)",
            link: "/tech/schnorr",
          },
          {
            text: "Execution State Machine",
            link: "/tech/execution",
            // collapsed: true,
            // items: [
            //   {
            //     text: "Oracle System",
            //     link: "/tech/oracles",
            //   },
            // ],
          },

          {
            text: "Liquidity Management & Stability Pools",
            link: "/tech/cross-chain-settlement",
          },
          {
            text: "Oracle System",
            link: "/tech/oracles",
          },
          {
            text: "FAQs",
            link: "/tech/faqs",
          },
        ],
      },
      // {
      //   text: "GUIDE",
      //   items: [
      //     {
      //       text: "Demo",
      //       link: "/guide/demo",
      //     },
      //     {
      //       text: "Node Setup",
      //       link: "/guide/surge-node-setup",
      //     },
      //   ],
      // },
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
      // {
      //   text: "RESOURCES",
      //   items: [
      //     // {
      //     //   text: "Quick Links",
      //     //   link: "/resources/quick-links",
      //     // },
      //     {
      //       text: "Media Kit",
      //       link: "/resources/media-kit",
      //     },
      //     {
      //       text: "Community Guidelines",
      //       link: "/resources/community-guidelines",
      //     },
      //   ],
      // },
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
