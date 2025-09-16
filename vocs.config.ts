import { defineConfig } from "vocs";

export default defineConfig({
  description: "Introducing Surge, a decentralized network that enables dApps and rollups to anchor directly to Bitcoin security with permissionless DKLs signature scheme while maintaining block consensus, interoperability, and data availability on Bitcoin.",
  logoUrl: {
    light: "/logo/surge-icon-rec-light.svg",
    dark: "/logo/surge-icon-rec-dark.svg",
  },
  ogImageUrl: "https://docs.surge.build/assets/Meta.png",
  font: {
    google: "Inter",
  },
  topNav: [
    { text: "Blog", link: "https://surge.build/blog" },
    // {
    //   text: "Bitcoin Playground",
    //   link: "https://surge.build/playground",
    // },
    { text: "Website", link: "https://www.surge.build/" },
  ],
  theme: {
    // accentColor: "#f56949"
    accentColor: "#f4431b",
    // colorScheme: "dark",
  },
  title: "Surge - Bitcoin's ultimate scaling MetaLayer",
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
            text: "🏗 Bitcoin Lending Landscape",
            link: "/overview/bitcoin-lending-landscape",
          },
          {
            text: "BTCFi - The New Bitcoin Frontier?",
            link: "/overview/btcFi",
          },
          {
            text: "Future of Bitcoin Scaling",
            link: "/overview/future-of-bitcoin-scaling",
          },
        ],
      },
      {
        text: "GUIDE",
        items: [
          {
            text: "Surge Node Setup",
            link: "/collaborate/node-setup-guid",
          },
        ],
      },
      {
        text: "BITCOIN REPORTS",
        items: [
          {
            text: "In-house Research",
            link: "/bitcoin-reports/in-house-research",
          },
          {
            text: "External Research",
            link: "/bitcoin-reports/external-research",
          },
        ],
      },
      {
        text: "RESOURCES",
        items: [
          {
            text: "Quick Links",
            link: "/resources/quick-links",
          },
          {
            text: "Media Kit",
            link: "/resources/media-kit",
          },
          {
            text: "Community Guidelines",
            link: "/resources/community-guidelines",
          },
          // {
          //   text: "Surge FAQs",
          //   link: "/resources/surge-faqs",
          // },
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
