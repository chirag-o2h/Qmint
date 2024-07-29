const fs = require('fs');

const additionalUrls = [
    {
        "linkUrl": "/product-details/1-2-oz-queensland-mint-gold-cast-bar",
        "name": "1/2oz Queensland Mint Kangaroo Gold Cast Bar",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/1oz-queensland-mint-gold-cast-bar",
        "name": "1oz Queensland Mint Kangaroo Gold Cast bar",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/50g-abc-gold-cast-bar",
        "name": "50g ABC Gold Cast Bar",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/2-oz-queensland-mint-gold-cast-bar",
        "name": "2oz Queensland Mint Kangaroo Gold Cast bar",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/100g-queensland-mint-cast-gold-bar",
        "name": "100g Queensland Mint Kangaroo Gold Cast Bar",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/5-oz-queensland-mint-gold-cast-bar",
        "name": "5oz Queensland Mint Kangaroo Gold Cast bar",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/250g-abc-gold-cast-bar",
        "name": "250g ABC Gold Cast Bar",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/10-oz-queensland-mint-gold-cast-bar",
        "name": "10oz Queensland Mint Kangaroo Gold Cast Bar",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/500g-abc-gold-cast-bar",
        "name": "500g ABC Gold Cast Bar",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/1-kg-queensland-mint-gold-cast-bar",
        "name": "1kg Queensland Mint Kangaroo Gold Cast Bar with Serial Number",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/1g-abc-gold-minted-bar",
        "name": "1g ABC Gold Minted Bar",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/1g-perth-mint-gold-minted-bar",
        "name": "1g Perth Mint Gold Minted Bar",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/5g-abc-gold-minted-bar",
        "name": "5g ABC Gold Minted Bar",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/5-g-perth-mint-gold-minted-bar-2",
        "name": "5g Perth Mint Gold Minted Bar",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/10-g-perth-mint-gold-minted-bar",
        "name": "10g Perth Mint Gold Minted Bar",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/10g-abc-gold-minted-bar",
        "name": "10g ABC Gold Minted Bar",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/1-oz-perth-mint-gold-minted-bar",
        "name": "1oz Perth Mint Gold Minted Bar",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/100g-perthmint-gold-minted-bar",
        "name": "100g Perth Mint Gold Minted Bar",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/2024-1oz-kangaroo-gold-coin",
        "name": "2024 1oz Kangaroo Gold Coin",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/2024-1-2oz-kangaroo-gold-coin",
        "name": "2024 1/2oz Kangaroo Gold Coin ",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/2024-1-4oz-kangaroo-gold-coin",
        "name": "2024 1/4oz Kangaroo Gold Coin",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/2024-1-10th-oz-kangaroo-gold-coin",
        "name": "2024 1/10th oz Kangaroo Gold Coin",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/1oz-krugerrand-south-africa-gold-coin-randomyear",
        "name": "1oz Krugerrand Gold Coin (Random Year)",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/1oz-canadian-maple-gold-coin",
        "name": "1oz Canadian Maple Gold Coin (Random Year)",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/1-oz-american-buffalo-gold-coin-2016",
        "name": "1oz American Buffalo Gold Coin (Random Year)",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/1oz-canadian-maple-silver-coin",
        "name": "1oz Canadian Maple Leaf Silver Coin (Random Year)",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/1oz-queensland-mint-silver-crown",
        "name": "1oz Queensland Mint Silver Crown",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/2024-1oz-kangaroo-silver-coin",
        "name": "2024 1oz Kangaroo Silver Coin",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/2013-1oz-austrian-philharmonic-silver-coin",
        "name": "2013 1oz Austrian Philharmonic Silver Coin",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/2024-1oz-kookaburra-silver-coin",
        "name": "2024 1oz Kookaburra Silver Coin",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/2024-1oz-koala-silver-coin",
        "name": "2024 1oz Koala Silver Coin",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/1oz-queensland-mint-kangaroo-silver-mini-duo-strike-bar-with-ultra-shine",
        "name": "1oz Queensland Mint Kangaroo Silver Bar - MINI Duo Strike with Ultra Shine",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/10oz-queensland-mint-kangaroo-silver-bar-duo-strike-ultra-shine",
        "name": "10oz Queensland Mint Kangaroo Silver Bar - Duo Strike Ultra Shine",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/1kg-queensland-mint-silver-bar-with-serial-number",
        "name": "1kg Queensland Mint Kangaroo Silver Bar with Serial Number",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/1kg-abc-silver-cast-bar",
        "name": "1kg ABC Silver Cast bar",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/1-kg-perth-mint-silver-cast-bar",
        "name": "1kg Perth Mint Silver Cast Bar",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/100oz-abc-silver-cast-bar",
        "name": "100oz ABC Silver Cast Bar",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/5kg-abc-silver-cast-bar",
        "name": "5kg ABC Silver Cast Bar",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/1oz-platinum-abc-minted-bar",
        "name": "1oz ABC Platinum Minted Bar",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/2022-1oz-kangaroo-platinum-coin",
        "name": "2022 1oz Kangaroo Platinum Coin",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/instant-kookaburra-collection-2007-2017",
        "name": "Instant Kookaburra Collection - 2007-2017",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/2024-1oz-the-perth-mint-125th-anniversary-silver-coin",
        "name": "2024 1oz The Perth Mint 125th Anniversary Silver Coin",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/2024-1oz-lunar-series-iii-year-of-the-dragon-silver-coin",
        "name": "2024 1oz Lunar Series III Year of the Dragon Silver Coin",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/silver-gold-bunker-down-pack",
        "name": "Gold & Silver Bunker Down Pack",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/bullion-beginner-bundle",
        "name": "Bullion Beginner Bundle",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/10x10-silver-and-gold-trader-maxpax",
        "name": "10+10 Silver and Gold Trader MaxPax",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/max-value-quad-silver-bar-pack",
        "name": "Max Value Quad Silver Bar Pack",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/maxpax-ultimate-silver-coin-bundle",
        "name": "MaxPax Ultimate Silver Coin Bundle",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/maxpax-investment-kickstart-bundle-small",
        "name": "MaxPax Investment Kickstart Bundle - Small",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/maxpax-investment-kickstart-bundle-medium",
        "name": "MaxPax Investment Kickstart Bundle - Medium",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/topic/gold-context-page",
        "name": "Discover the Timeless Value of Gold with BULLIONMARK",
        "groupTitle": "General"
    },
    {
        "linkUrl": "/topic/maximise-your-knowledge",
        "name": "Maximise Your Knowledge",
        "groupTitle": "General"
    },
    {
        "linkUrl": "/topic/smart-metals",
        "name": "Smart Metals",
        "groupTitle": "General"
    },
    {
        "linkUrl": "/topic/precious-metals-available-at-bullionmark",
        "name": "Investing in Precious Metals with BULLIONMARK: An Overview of Australia's Top Choices",
        "groupTitle": "General"
    },
    {
        "linkUrl": "/topic/Guide-to-Selling-Your-Precious-Metals",
        "name": "Selling Your Precious Metals",
        "groupTitle": "General"
    },
    {
        "linkUrl": "/topic/gold-or-silver-how-to-choose",
        "name": "Gold or Silver? How to Choose",
        "groupTitle": "General"
    },
    {
        "linkUrl": "/topic/understanding-bullion-maximise-your-investment-with-bullionmark",
        "name": "What is Bullion?",
        "groupTitle": "General"
    },
    {
        "linkUrl": "/topic/what-is-a-troy-ounce-understanding-precious-metals-with-bullionmark",
        "name": "What is a Troy Ounce? Understanding Precious Metals with BULLIONMARK",
        "groupTitle": "General"
    },
    {
        "linkUrl": "/topic/bars-vs-coins-investing-in-bullion-with-bullionmark",
        "name": "Bars vs Coins: Investing in Bullion with BULLIONMARK",
        "groupTitle": "General"
    },
    {
        "linkUrl": "/topic/popular-bullion-coins-worldwide-invest-with-bullionmark",
        "name": "Popular Bullion Coins Worldwide: Invest with BULLIONMARK",
        "groupTitle": "General"
    },
    {
        "linkUrl": "/topic/popular-australian-coins-invest-with-bullionmark",
        "name": "Popular Australian Coins: Invest with BULLIONMARK",
        "groupTitle": "General"
    },
    {
        "linkUrl": "/topic/sovereign-minted-bullion-vs-privately-minted-bullion-invest-with-bullionmark",
        "name": "Sovereign Minted Bullion vs Privately Minted Bullion: Invest with BULLIONMARK",
        "groupTitle": "General"
    },
    {
        "linkUrl": "/topic/how-to-store-silver-secure-your-investment-with-bullionmark",
        "name": "How to Store Silver: Secure Your Investment with BULLIONMARK",
        "groupTitle": "General"
    },
    {
        "linkUrl": "/topic/how-to-store-gold-secure-your-investment-with-bullionmark",
        "name": "How to Store Gold: Secure Your Investment with BULLIONMARK",
        "groupTitle": "General"
    },
    {
        "linkUrl": "/topic/payment",
        "name": "Payment",
        "groupTitle": "General"
    },
    {
        "linkUrl": "/topic/shipping-calculator",
        "name": "Shipping Calculator",
        "groupTitle": "General"
    },
    {
        "linkUrl": "/topic/privacy-policy",
        "name": "Privacy Policy",
        "groupTitle": "General"
    },
    {
        "linkUrl": "/topic/aboutus",
        "name": "About us",
        "groupTitle": "General"
    },
    {
        "linkUrl": "/topic/terms-and-conditions",
        "name": "Terms & Conditions",
        "groupTitle": "General"
    },
    {
        "linkUrl": "/topic/sell-to-us",
        "name": "BULLIONMARK BuyBack Service: Maximise the Value of Every Ounce ",
        "groupTitle": "General"
    },
    {
        "linkUrl": "/topic/resources",
        "name": "Resources",
        "groupTitle": "General"
    },
    {
        "linkUrl": "/topic/allocated-holdings",
        "name": "Allocated Holdings",
        "groupTitle": "General"
    },
    {
        "linkUrl": "/topic/big-vs-small-weighing-the-pros-and-cons-of-bullion-bar-and-coin-sizes",
        "name": "Big vs Small: Weighing the Pros and Cons of Bullion Bar and Coin Sizes",
        "groupTitle": "General"
    },
    {
        "linkUrl": "/topic/vault-storage",
        "name": "Allocated Vault Storage at BULLIONMARK",
        "groupTitle": "General"
    },
    {
        "linkUrl": "/topic/delivery",
        "name": "Delivery Methods",
        "groupTitle": "General"
    },
    {
        "linkUrl": "/topic/account-id-requirements",
        "name": "What ID do I need to open an account?",
        "groupTitle": "General"
    },
    {
        "linkUrl": "/topic/shipping-methods",
        "name": "Shipping Methods at BULLIONMARK",
        "groupTitle": "General"
    },
    {
        "linkUrl": "/topic/subaccounts",
        "name": "How to Create a Subaccount with BULLIONMARK",
        "groupTitle": "General"
    },
    {
        "linkUrl": "/topic/local-pickup-information",
        "name": "Local Pickup at BULLIONMARK",
        "groupTitle": "General"
    },
    {
        "linkUrl": "/topic/account-types",
        "name": "Account Types",
        "groupTitle": "General"
    },
    {
        "linkUrl": "/category/buy",
        "name": "Buy",
        "groupTitle": "Categories"
    },
    {
        "linkUrl": "/category/just-in",
        "name": "Just In",
        "groupTitle": "Categories"
    },
    {
        "linkUrl": "/category/mates-rates",
        "name": "Mates Rates",
        "groupTitle": "Categories"
    },
    {
        "linkUrl": "/category/gold",
        "name": "Gold",
        "groupTitle": "Categories"
    },
    {
        "linkUrl": "/category/gold-bars",
        "name": "Gold Bars",
        "groupTitle": "Categories"
    },
    {
        "linkUrl": "/category/gold-coins",
        "name": "Gold Coins",
        "groupTitle": "Categories"
    },
    {
        "linkUrl": "/category/silver",
        "name": "Silver",
        "groupTitle": "Categories"
    },
    {
        "linkUrl": "/category/silver-bars",
        "name": "Silver Bars",
        "groupTitle": "Categories"
    },
    {
        "linkUrl": "/category/silver-coins",
        "name": "Silver Coins",
        "groupTitle": "Categories"
    },
    {
        "linkUrl": "/category/max-deals",
        "name": "Max Deals",
        "groupTitle": "Categories"
    },
    {
        "linkUrl": "/category/maxpax-metal-packages",
        "name": "MaxPax Metal Packages",
        "groupTitle": "Categories"
    },
    {
        "linkUrl": "/category/platinum",
        "name": "Platinum",
        "groupTitle": "Categories"
    },
    {
        "linkUrl": "/category/maxpax",
        "name": "MaxPax",
        "groupTitle": "Categories"
    },
    {
        "linkUrl": "/category/bullion",
        "name": "Bullion",
        "groupTitle": "Categories"
    },
    {
        "linkUrl": "/category/small-bullion",
        "name": "Small Bullion",
        "groupTitle": "Categories"
    },
    {
        "linkUrl": "/category/large-bullion",
        "name": "Large Bullion",
        "groupTitle": "Categories"
    },
    {
        "linkUrl": "/category/sell-to-us",
        "name": "Sell",
        "groupTitle": "Categories"
    },
    {
        "linkUrl": "/category/maxpax",
        "name": "Deals",
        "groupTitle": "Categories"
    },
    {
        "linkUrl": "/category/resources",
        "name": "Resources",
        "groupTitle": "Categories"
    },
    {
        "linkUrl": "/category/fathers-day",
        "name": "Father's Day",
        "groupTitle": "Categories"
    },
    {
        "linkUrl": "/product-details/maxpax-investment-kickstart-bundle-large",
        "name": "MaxPax Investment Kickstart Bundle - Large",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/1oz-american-eagle-silver-coin",
        "name": "1oz American Eagle Classic Design Silver Coin",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/10x10oz-queensland-mint-silver-slab",
        "name": "10x10oz Queensland Mint Silver Slab",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/5-x-10oz-vaults-choice-silver-bars",
        "name": "5 x 10oz Vaults Choice Silver Bar",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/1kg-pamp-silver-cast-bar",
        "name": "1kg PAMP Silver Cast Bar",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/10-oz-perth-mint-silver-cast-bar",
        "name": "10oz Perth Mint Silver Cast Bar",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/20-x-1oz-johnson-matthey-silver-slab",
        "name": "20 x 1oz Johnson Matthey Silver Slab",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/bhas-silver-cast-bar-22863kg",
        "name": "22.863kg BHAS Silver Cast Bar - Serial 515182",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/2024-1oz-ram-queensland-coat-of-arms-silver-coin",
        "name": "2024 1oz RAM Queensland Coat of Arms Silver Coin",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/10oz-perth-mint-gold-cast-bar",
        "name": "10oz Perth Mint Gold Cast Bar",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/2011-1-10th-oz-kangaroo-gold-coin",
        "name": "2011 1/10th oz Kangaroo Gold Coin",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/1-oz-kookaburra-silver-coin-2010",
        "name": "2010 1oz Kookaburra Silver Coin",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/roll-of-20-x-2010-1oz-kookaburra-silver-coins",
        "name": "Roll of 20 x 2010 1oz Kookaburra Silver Coins",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/maxpax-entry-bundle",
        "name": "MaxPax Entry Bundle",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/marlin-silver-saver-tube",
        "name": "Marlin Silver Saver Tube",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/maxpax-mates-metal-bundle",
        "name": "MaxPax Mates Metal Bundle",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/2024-1oz-south-african-krugerrand-silver-coin",
        "name": "2024 1oz South African Krugerrand Silver Coin",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/2001-gregorian-millennium-bi-metalic-proof-coin-in-presentation-case",
        "name": "2001 Gregorian Millennium - Bi-Metalic Proof Coin in Presentation Case",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/2024-2oz-125th-anniversary-of-perth-mint-silver-gilded-proof-coin",
        "name": "2024 2oz 125th Anniversary of Perth Mint Silver Gilded Proof Coin",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/2022-1oz-lunar-series-iii-year-of-the-tiger-gilded-silver-coin-in-presentation-box",
        "name": "2022 1oz Lunar Series III Year of the Tiger Gilded Silver Coin in Presentation Box",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/2022-1oz-australian-kangaroo-silver-high-relief-coloured-coin-in-presentation-box",
        "name": "2022 1oz Australian Kangaroo Silver High Relief Coloured Coin in presentation box",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/2021-1oz-australian-wedge-tailed-eagle-platinum-coin-in-presentation-box",
        "name": "2021 1oz Australian Wedge-Tailed Eagle Platinum Coin in presentation box",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/2021-1-4-oz-australian-nugget-35th-anniversary-gold-proof-coin",
        "name": "2021 1/4oz Australian Nugget 35th Anniversary Gold Proof Coin in presentation box",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/2015-5-anzac-centenary-triangular-silver-proof-coin-in-presentation-box",
        "name": "2015 $5 Anzac Centenary Triangular Silver Proof Coin in Presentation Box",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/2013-1-oz-mythical-creatures-phoenix-silver-coin-in-presentation-case",
        "name": "2013 1oz Mythical Creatures - Phoenix Silver Coin in Presentation Case",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/2012-1-10th-oz-koala-gold-proof-coin-in-wooden-box",
        "name": "2012 1/10th oz Koala Gold Proof Coin in Wooden Box",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/2010-4-x-1oz-ned-kelly-silver-proof-coin-collection",
        "name": "2010 4 x 1oz Ned Kelly Silver Proof Coin Collection",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/2005-60th-anniversary-end-2nd-world-war-6-coin-copper-nickel-and-aluminium-bronze-proof-set",
        "name": "2005 WWII 60th Anniversary Base Metal 6-Coin Proof Set",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/2003-54-3g-holey-dollar-and-the-dump-silver-proof-coin-in-presentation-box",
        "name": "2003 54.3g Holey Dollar and the Dump Silver Proof Coin in Presentation Box",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/1997-australian-sterling-silver-masterpieces-5-proof-coin-set-in-presentation-box",
        "name": "1997 Opening of a Continent - Masterpieces in Silver 5 Coin Proof Set",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/1991-australian-masterpieces-in-silver-9-coin-jubilee-proof-set",
        "name": "1991 Australian Masterpieces in Silver 9-Coin Jubilee Proof Set",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/1990-australian-masterpieces-in-silver-4-coin-dollar-proof-set",
        "name": "1990 Australian Masterpieces in Silver 4-Coin Dollar Proof Set",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/1990-australian-10g-gold-200-the-pride-of-australia-platypus-proof-coin-in-box",
        "name": "1990 10g $200 Pride of Australia Platypus Gold Proof Coin (Boxed)",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/1-oz-perth-mint-gold-cast-bar",
        "name": "1oz Perth Mint Gold Cast Bar",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/1oz-happy-fathers-day-colourised-silver-coin-blue",
        "name": "1oz Happy Fathers Day Colourised Silver Coin (Blue)",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/1oz-happy-fathers-day-colourised-silver-coin-modern",
        "name": "1oz Happy Fathers Day Colourised Silver Coin (Modern)",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/1oz-best-dad-ever-colourised-silver-coin",
        "name": "1oz Best Dad Ever Colourised Silver Coin",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/2024-1oz-britannia-silver-coin-king-charles-iii",
        "name": "2024 1oz Britannia Silver Coin - King Charles III",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/2023-great-britain-1-oz-silver-myths-legends-king-arthur-bu",
        "name": "2023 1oz Myths and Legends King Arthur Silver Coin",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/2022-1-oz-chinese-myths-and-legends-phoenix-silver-coin",
        "name": "2022 1oz Myths & Legends Phoenix Silver Coin",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/2022-samoa-1oz-silver-looney-tunes-daffy-duck-bu",
        "name": "2022 1oz Looney Tunes Daffy Duck Silver Coin",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/2022-1oz-looney-tunes-bugs-bunny-silver-coin",
        "name": "2022 1oz Looney Tunes Bugs Bunny Silver Coin",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/2020-1oz-big-five-series-african-elephant-platinum-coin",
        "name": "2020 1oz Big Five Series - African Elephant Platinum Coin",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/2011-10oz-kookaburra-silver-coin",
        "name": "2011 10oz Kookaburra Silver Coin",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/1oz-nasa-meatball-silver-round",
        "name": "1oz NASA Meatball Silver Round",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/1oz-morgan-dollar-silver-round",
        "name": "1oz Morgan Dollar Silver Round",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/1oz-get-your-kicks-on-route-66-silver-round",
        "name": "1oz Get Your Kicks on Route 66 - Silver Round",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/1oz-aztec-silver-round",
        "name": "1oz Aztec Calendar & Pyramid Silver Round",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/product-details/1-oz-american-buffalo-silver-round-2011",
        "name": "1oz American Buffalo Silver Coin",
        "groupTitle": "Products"
    },
    {
        "linkUrl": "/blog/ownership-vs-exposure-precious-metals",
        "name": "Ownership vs Exposure to Precious Metals: Understanding the Differences and Risks",
        "groupTitle": "Blog Posts"
    },
    {
        "linkUrl": "/blog/understanding-gold-industry-jargon-guide",
        "name": "Understanding Gold Industry Jargon: A Comprehensive Guide for Investors",
        "groupTitle": "Blog Posts"
    },
    {
        "linkUrl": "/blog/understanding-spot-price-of-gold",
        "name": "Understanding the Spot Price of Gold: A Comprehensive Guide",
        "groupTitle": "Blog Posts"
    },
    {
        "linkUrl": "/blog/can-you-buy-gold-at-spot-price",
        "name": "Can You Buy Gold at Spot Price? Understanding the True Costs",
        "groupTitle": "Blog Posts"
    }
]

const generateXml = (urls) => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  
  urls.forEach(url => {
    xml += `  <url>\n    <loc>https://bullionmark.netlify.app${url.linkUrl}</loc>\n    <changefreq>daily</changefreq>\n    <priority>0.7</priority>\n  </url>\n`;
  });

  xml += `</urlset>`;
  return xml;
};

const xmlContent = generateXml(additionalUrls);

fs.writeFileSync('static/custom-sitemap.xml', xmlContent);

console.log('Custom sitemap generated!');
