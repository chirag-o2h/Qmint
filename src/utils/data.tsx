import React from "react"

// Assets
import { VaultIcon, SellToUsIcon, CalculatorIcon, LoanIcon, WishlistIcon, RecentIcon, CompareIcon, AppointmentsIcon } from "../assets/icons/index"


export const userData = {
  mobileNumber: "+61 7318 48300",
}

export const navigationItems = [
  {
    title: "Information",
    menues: ["Sitemap", "Payment", "Privacy Policy", "Terms of Service", "About Us", "Delivery", "Contact"],
  },
  {
    title: "Customer Service",
    menues: ["Search", "News", "Blog", "Recently viewed products", "Compare products list", "New products"],
  },
  {
    title: "My Vault",
    menues: ["My Vault", "Orders", "Addresses", "Shopping cart", "Wishlist"],
  },
]

export const actionMenuItems = [
  {
    text: "My Vault",
    href: "/my-vault",
    icon: <VaultIcon />,
    key: 'MyVault_MenuIcon_Enable'
  },
  {
    text: "Sell to Us",
    icon: <SellToUsIcon />,
    href: "/topic/sell-to-us",
    key: 'SellToUs_MenuIcon_Enable'
  },
  {
    text: "Calculators",
    icon: <CalculatorIcon />,
    href: "/calculators",
    key: 'Calculators_MenuIcon_Enable'
  },
  {
    text: "Loans",
    icon: <LoanIcon />,
    href: "/topic/loans",
    key: 'Loans_MenuIcon_Enable'
  },
  {
    text: "Watchlist",
    icon: <WishlistIcon />,
    href: "/watchlist",
    key: 'Watchlist_MenuIcon_Enable'
  },
  {
    text: "Recent",
    icon: <RecentIcon />,
    href: "/recently-viewed-products",
    key: 'Recent_MenuIcon_Enable'
  },
  {
    text: "Compare",
    icon: <CompareIcon />,
    href: "/compare-products",
    key: 'Compare_MenuIcon_Enable'
  },
  {
    text: "Appointments",
    icon: <AppointmentsIcon />,
    href: "/",
    key: 'AppointmentBooking_Enable'
  },
]


export const subMenuItems = [
  "Popular", "QMINT Bullion", "Newly Listed", "Gold Coins", "Gold Bars", "Silver Coins", "World Coins", "Coin Sets", "Last Stock", "On Sale"
]

export const megaMenuItems = [
  ["Popular", "QMINT Bullion", "Newly Listed", "Gold Coins", "Gold Bars", "Silver Coins", "World Coins", "Coin Sets", "Last Stock", "On Sale"],
  ["INVESTOR", "QMINT Direct", "Gold Bullion", "Silver Bullion", "Platinum", "Palladium", "Copper", "Base Metals", "Rare Earths", "Gemstones", "Nuggets", "Books"],
  ["COLLECTOR", "QMINT Rating", "Queensland", "Australia", "World", "Proof", "High Relief", "Graded", "Pre - Decimal", "Rare Coins", "Coin Care", "Sovereign Gold Coins"],
  ["Themes", "Black Friday Sale", "QMINT Select", "Flora", "Fauna", "Places", "Lunar", "Occasion", "Royals", "Series", "Objects", "Gifts", "Christmas"],
]

export const categoryFilterItems = [
  {
    label: "Mint",
    options: [
      { id: '1', name: 'QueenslandMint', value: 'QueenslandMint', label: 'Queensland Mint', checked: true, disabled: true, },
      { id: '2', name: 'ProductID', value: 'ProductID', label: 'Product ID', checked: true, },
      { id: '3', name: 'SerialNumber', value: 'SerialNumber', label: 'Serial Number', checked: true, disabled: true, },
    ],
    row: false,
  },
  {
    label: "Type",
    options: [
      { id: '1', name: 'coin', value: 'coin', label: 'Coin', checked: true, },
      { id: '2 ', name: 'bar', value: 'bar', label: 'Bar', checked: true, },
    ],
    row: true,
  },
  {
    label: "Availability",
    options: [
      { id: '1', name: 'All', value: 'All', label: 'All', checked: true, },
      { id: '2', name: 'Available to Order', value: 'Available to Order', label: 'Available to Order', checked: true, disabled: true, },
      { id: '3', name: 'In Stock', value: 'In Stock', label: 'In Stock', checked: true, disabled: true, },
      { id: '4', name: 'New', value: 'New', label: 'New', checked: true, disabled: true, },
    ],
    row: false,
  },
  {
    label: "Superfund Approved",
    options: [
      { id: '1', name: 'Yes', value: 'Yes', label: 'Yes' },
      { id: '2 ', name: 'No', value: 'No', label: 'No' },
    ],
    row: true,
  },
  {
    label: "Purity",
    options: [
      { id: '1', name: '9999', value: '9999', label: '9999' },
      { id: '2 ', name: '999+', value: '999+', label: '999+' },
    ],
    row: false,
  },
  {
    label: "Weight",
    options: [
      { id: '1', name: '9999', value: '9999', label: '9999' },
      { id: '2 ', name: '999+', value: '999+', label: '999+' },
    ],
    row: false,
  },
  {
    label: "Form",
    options: [
      { id: '1', name: '9999', value: '9999', label: '9999' },
      { id: '2 ', name: '999+', value: '999+', label: '999+' },
    ],
    row: false,
  },
  {
    label: "Variant",
    options: [
      { id: '1', name: '9999', value: '9999', label: '9999' },
      { id: '2 ', name: '999+', value: '999+', label: '999+' },
    ],
    row: false,
  },
  {
    label: "Series",
    options: [
      { id: '1', name: '9999', value: '9999', label: '9999' },
      { id: '2 ', name: '999+', value: '999+', label: '999+' },
    ],
    row: false,
  },
  {
    label: "Condition",
    options: [
      { id: '1', name: '9999', value: '9999', label: '9999' },
      { id: '2 ', name: '999+', value: '999+', label: '999+' },
    ],
    row: false,
  },
  {
    label: "Features",
    options: [
      { id: '1', name: '9999', value: '9999', label: '9999' },
      { id: '2 ', name: '999+', value: '999+', label: '999+' },
    ],
    row: false,
  },
  {
    label: "Origin",
    options: [
      { id: '1', name: '9999', value: '9999', label: '9999' },
      { id: '2 ', name: '999+', value: '999+', label: '999+' },
    ],
    row: false,
  },
  {
    label: "Theme",
    options: [
      { id: '1', name: '9999', value: '9999', label: '9999' },
      { id: '2 ', name: '999+', value: '999+', label: '999+' },
    ],
    row: false,
  },
  {
    label: "Monarch",
    options: [
      { id: '1', name: '9999', value: '9999', label: '9999' },
      { id: '2 ', name: '999+', value: '999+', label: '999+' },
    ],
    row: false,
  },
  {
    label: "Finish",
    options: [
      { id: '1', name: '9999', value: '9999', label: '9999' },
      { id: '2 ', name: '999+', value: '999+', label: '999+' },
    ],
    row: false,
  },
  {
    label: "Photo",
    options: [
      { id: '1', name: '9999', value: '9999', label: '9999' },
      { id: '2 ', name: '999+', value: '999+', label: '999+' },
    ],
    row: false,
  },
  {
    label: "By Mint",
    options: [
      { id: '1', name: '9999', value: '9999', label: '9999' },
      { id: '2 ', name: '999+', value: '999+', label: '999+' },
    ],
    row: false,
  },
]

export const sortByOptions = [
  { id: '1', name: 'Most Popular', value: 'Most Popular', label: 'Most Popular', },
  { id: '2', name: 'Price: Low to High', value: 'Price: Low to High', label: 'Price: Low to High' },
  { id: '3', name: 'Price: High to Low', value: 'Price: High to Low', label: 'Price: High to Low' },
  // { id: '4', name: 'Weight: Ascending', value: 'Weight: Ascending', label: 'Weight: Ascending' },
  // { id: '5', name: 'Weight: Descending', value: 'Weight: Descending', label: 'Weight: Descending' },
  // { id: '6', name: 'Year: Ascending', value: 'Year: Ascending', label: 'Year: Ascending' },
  // { id: '7', name: 'Year: Descending', value: 'Year: Descending', label: 'Year: Descending' },
  // { id: '8', name: 'Highest Rated', value: 'Highest Rated', label: 'Highest Rated' },
]

export const qmintRating = [
  {
    name: "Overall",
    percentage: 37.8,
  },
  {
    name: "Outer Pack",
    percentage: 40,
  },
  {
    name: "Inner Pack",
    percentage: 60,
  },
]

export const productImages = [
  "https://imagestoragecdn.blob.core.windows.net/documents/100g-Queensland-Mint-Gold-Cast-Bar-Front-min_210320221703508.png",
  "https://imagestoragecdn.blob.core.windows.net/documents/10oz-Queensland-Mint-Silver-Bar-Ultra-Shine-Duo-Strike-feature_210320221903236.png",
  "https://imagestoragecdn.blob.core.windows.net/documents/QMint-5oz-gold-Bar-min_210320221703215.png",
  "https://imagestoragecdn.blob.core.windows.net/documents/a-2007-Six-Coin-Gold-Set-Perth-Mint-OPEN_210320221703591.png",
  "https://imagestoragecdn.blob.core.windows.net/documents/2022-AustralianKangaroo-Silver-1oz-StraightOn_210320221903152.png",
  "https://imagestoragecdn.blob.core.windows.net/documents/QMint-2oz-gold-Bar-Front-min_210320221703362.png",
]

export const wishlistData = [
  {
    name: "10oz Queensland Mint Kangaroo Gold Cast Bar",
    image: "https://imagestoragecdn.blob.core.windows.net/documents/100g-Queensland-Mint-Gold-Cast-Bar-Front-min_210320221703508.png",
    price: "$1,702.35",
    qty: "1",
    total: "$33,386.29",
  },
  {
    name: "1/2oz Queensland Mint Kangaroo Gold Cast Bar",
    image: "https://imagestoragecdn.blob.core.windows.net/documents/10oz-Queensland-Mint-Silver-Bar-Ultra-Shine-Duo-Strike-feature_210320221903236.png",
    price: "$1,702.35",
    qty: "1",
    total: "$1,702.35",
  },
]

export const chartMenuData = [
  {
    name: "Gold",
    range: "3 Day Range",
    highPrice: "3472.84",
    lowPrice: "3362.23",
    color: "#e6b80b",
    data: [
      {
        name: "Page A",
        uv: 4000,
        pv: 2400,
        amt: 2400
      },
      {
        name: "Page B",
        uv: 3000,
        pv: 1398,
        amt: 2210
      },
      {
        name: "Page C",
        uv: 2000,
        pv: 9800,
        amt: 2290
      },
      {
        name: "Page D",
        uv: 2780,
        pv: 3908,
        amt: 2000
      },
      {
        name: "Page E",
        uv: 1890,
        pv: 4800,
        amt: 2181
      },
      {
        name: "Page F",
        uv: 2390,
        pv: 3800,
        amt: 2500
      },
      {
        name: "Page G",
        uv: 3490,
        pv: 4300,
        amt: 2100
      }],
  },
  {
    name: "Silver",
    range: "3 Day Range",
    highPrice: "40.61",
    lowPrice: "38.21",
    color: "#c0c0c0",
    data: [
      {
        name: "Page A",
        uv: 4000,
        pv: 2400,
        amt: 2400
      },
      {
        name: "Page B",
        uv: 3000,
        pv: 1398,
        amt: 2210
      },
      {
        name: "Page C",
        uv: 2000,
        pv: 9800,
        amt: 2290
      },
      {
        name: "Page D",
        uv: 2780,
        pv: 3908,
        amt: 2000
      },
      {
        name: "Page E",
        uv: 1890,
        pv: 4800,
        amt: 2181
      },
      {
        name: "Page F",
        uv: 2390,
        pv: 3800,
        amt: 2500
      },
      {
        name: "Page G",
        uv: 3490,
        pv: 4300,
        amt: 2100
      }],
  },
]

export const getInspiredData = [
  {
    title: "Cape, Wine, Wild life and Waterfalls",
    description: "This is the perfect first-time trip to South Africa, showcasing the very best of the Rainbow Nation before a spectacular finale by Victoria Falls..",
    country: "Africa",
    profileUrl: "https://picsum.photos/80",
    placeUrl: "https://picsum.photos/200/500?grayscale&blur=2",
  },
  {
    title: "Luxury Costa Rica Explorer",
    description: "A romantic, serene and eco-conscious experience of Costa Rica, staying at two luxurious, low impact retreats.",
    country: "South America",
    profileUrl: "https://picsum.photos/80",
    placeUrl: "https://picsum.photos/200/500?grayscale&blur=2",
  },
  {
    title: "Delta and Dsert Mobile Safari",
    description: "A week-long expedition across Botswana's diverse landscapes, from the dry Central Kalahari and Makgadikgadi to the Okavango Delta.",
    country: "Africa",
    profileUrl: "https://picsum.photos/80",
    placeUrl: "https://picsum.photos/200/500?grayscale&blur=2",
  },
  {
    title: "Cape, Wine, Wild life and Waterfalls",
    description: "This is the perfect first-time trip to South Africa, showcasing the very best of the Rainbow Nation before a spectacular finale by Victoria Falls..",
    country: "Africa",
    profileUrl: "https://picsum.photos/70",
    placeUrl: "https://picsum.photos/200/500?grayscale&blur=2",
  },
  {
    title: "Luxury Costa Rica Explorer",
    description: "A romantic, serene and eco-conscious experience of Costa Rica, staying at two luxurious, low impact retreats.",
    country: "South America",
    profileUrl: "https://picsum.photos/70",
    placeUrl: "https://picsum.photos/200/500?grayscale&blur=2",
  },
  {
    title: "Delta and Dsert Mobile Safari",
    description: "A week-long expedition across Botswana's diverse landscapes, from the dry Central Kalahari and Makgadikgadi to the Okavango Delta.",
    country: "Africa",
    profileUrl: "https://picsum.photos/70",
    placeUrl: "https://picsum.photos/200/500?grayscale&blur=2",
  },
]