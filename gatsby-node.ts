import { execSync } from "child_process";

const path = require('path')
const { copyLibFiles } = require('@builder.io/partytown/utils');

exports.onPreBuild = async ({ reporter }: any) => {
    await copyLibFiles(path.join(__dirname, "public/static", "~partytown"));
};
// exports.onPreBootstrap = async () => {
//     await copyLibFiles(path.join(__dirname, "public/static", "~partytown"));
// };

exports.onCreateWebpackConfig = ({ actions }: any) => {
    actions.setWebpackConfig({
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
                'assets': path.resolve(__dirname, 'static/assets')
            },
        },
    })
};
exports.onCreateWebpackConfig = ({ stage, actions }: any) => {
    const webpackConfig: any = {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
                'assets': path.resolve(__dirname, 'static/assets'),
            },
        },
    };
    if (stage === "build-javascript" || stage === "develop") {
        try {
            const { execSync } = require('child_process');
            execSync('node generate-scss-vars.js', { stdio: 'inherit' });
        } catch (error) {
            console.log('Failed to generate SCSS variables', error);
        }
    }
    // if (stage === "build-javascript" || stage === "develop") {
    //     webpackConfig.optimization = {
    //         splitChunks: {
    //             chunks: 'all',
    //             // minSize: 10000,  // Minimum size for splitting chunks
    //             // minChunks: 10,    // Minimum number of chunks that must share a module before splitting
    //             // maxAsyncRequests: 10,  // Maximum number of parallel requests for chunks on initial load
    //         },
    //     };
    // }
    // if (stage === "build-javascript" || stage === "develop") {
    //     webpackConfig.optimization = {
    //         splitChunks: {
    //             chunks: 'all',  // This applies the optimization to both initial and async chunks
    //             minSize: 20000,  // Minimum size, in bytes, for a chunk to be generated (adjusted to a more typical threshold)
    //             minRemainingSize: 0,  // Minimum size of the chunk which remains after splitting
    //             minChunks: 1,  // Minimum number of chunks that must share a module before splitting (lowered to ensure more splitting)
    //             maxAsyncRequests: 30,  // Maximum number of parallel requests when loading on demand (increased for better async loading)
    //             maxInitialRequests: 30,  // Maximum number of parallel requests at an entry point (increased to allow more initial requests)
    //             enforceSizeThreshold: 50000,  // Force split for modules larger than this size (in bytes)
    //             cacheGroups: {
    //                 defaultVendors: {
    //                     test: /[\\/]node_modules[\\/]/,
    //                     priority: -10,
    //                     reuseExistingChunk: true,
    //                 },
    //                 default: {
    //                     minChunks: 2,
    //                     priority: -20,
    //                     reuseExistingChunk: true,
    //                 },
    //             },
    //         },
    //     };
    // }
    actions.setWebpackConfig(webpackConfig);
};
exports.onCreateBabelConfig = ({ actions }: any) => {
    actions.setBabelPlugin({
        name: '@babel/plugin-transform-react-jsx',
        options: {
            runtime: 'automatic',
        },
    });
};
exports.createPages = async ({ actions }: any) => {
    const { createRedirect } = actions;

    const redirects = [
        { fromPath: '/shop', toPath: '/category/shop/' },
        { fromPath: '/bullion', toPath: '/category/bullion' },
        { fromPath: '/gold', toPath: '/category/gold' },
        { fromPath: '/silver', toPath: '/category/silver' },
        { fromPath: '/gold-coins', toPath: '/category/gold-coins' },
        { fromPath: '/gold-bars', toPath: '/category/gold-bars' },
        { fromPath: '/silver-bars', toPath: '/category/silver-bars' },
        { fromPath: '/silver-coins', toPath: '/category/silver-coins' },
        { fromPath: '/platium', toPath: '/category/platium' },
        { fromPath: '/10-x-1oz-EOFY-Silver-Sale-Pack', toPath: '/product-details/10-x-1oz-EOFY-Silver-Sale-Pack' },
        { fromPath: '/2024-1oz-Koala-Silver-Coin', toPath: '/product-details/2024-1oz-Koala-Silver-Coin' },
        { fromPath: '/2024-1oz-Kangaroo-Silver-Coin', toPath: '/product-details/2024-1oz-Kangaroo-Silver-Coin' },
        { fromPath: '/2024-1oz-The-Perth-Mint-125th-Anniversary-Silver-Coin', toPath: '/product-details/2024-1oz-The-Perth-Mint-125th-Anniversary-Silver-Coin' },
        { fromPath: '/2024-1-2oz-Kangaroo-Gold-Coin-', toPath: '/product-details/2024-1-2oz-Kangaroo-Gold-Coin-' },
        { fromPath: '/2024-1oz-Kangaroo-Gold-Coin', toPath: '/product-details/2024-1oz-Kangaroo-Gold-Coin' },
        { fromPath: '/2024-1oz-Kookaburra-Silver-Coin', toPath: '/product-details/2024-1oz-Kookaburra-Silver-Coin' },
        { fromPath: '/2024-1-4oz-Kangaroo-Gold-Coin', toPath: '/product-details/2024-1-4oz-Kangaroo-Gold-Coin' },
        { fromPath: '/2024-1-10th-oz-Kangaroo-Gold-Coin', toPath: '/product-details/2024-1-10th-oz-Kangaroo-Gold-Coin' },
        { fromPath: '/Essential-Precious-Metals-Kit', toPath: '/product-details/Essential-Precious-Metals-Kit' },
        { fromPath: '/Bullion-Beginner-Bundle', toPath: '/product-details/Bullion-Beginner-Bundle' },
        { fromPath: '/2013-1oz-Austrian-Philharmonic-Silver-Coin', toPath: '/product-details/2013-1oz-Austrian-Philharmonic-Silver-Coin' },
        { fromPath: '/Gold-&-Silver-Bunker-Down-Pack', toPath: '/product-details/Gold-&-Silver-Bunker-Down-Pack' },
        { fromPath: '/1oz-Queensland-Mint-Kangaroo-Silver-Bar---MINI-Duo-Strike-with-Ultra-Shine', toPath: '/product-details/1oz-Queensland-Mint-Kangaroo-Silver-Bar---MINI-Duo-Strike-with-Ultra-Shine' },
        { fromPath: '/2022-1oz-Kangaroo-Platinum-Coin', toPath: '/product-details/2022-1oz-Kangaroo-Platinum-Coin' },
        { fromPath: '/1oz-Queensland-Mint-Silver-Crown', toPath: '/product-details/1oz-Queensland-Mint-Silver-Crown' },
        { fromPath: '/10oz-Queensland-Mint-Kangaroo-Silver-Bar---Duo-Strike-Ultra-Shine', toPath: '/product-details/10oz-Queensland-Mint-Kangaroo-Silver-Bar---Duo-Strike-Ultra-Shine' },
        { fromPath: '/1kg-Queensland-Mint-Kangaroo-Silver-Bar-with-Serial-Number', toPath: '/product-details/1kg-Queensland-Mint-Kangaroo-Silver-Bar-with-Serial-Number' },
        { fromPath: '/1oz-ABC-Gold-Minted-Bar', toPath: '/product-details/1oz-ABC-Gold-Minted-Bar' },
        { fromPath: '/10g-ABC-Gold-Minted-Bar', toPath: '/product-details/10g-ABC-Gold-Minted-Bar' },
        { fromPath: '/5g-ABC-Gold-Minted-Bar', toPath: '/product-details/5g-ABC-Gold-Minted-Bar' },
        { fromPath: '/1g-ABC-Gold-Minted-Bar', toPath: '/product-details/1g-ABC-Gold-Minted-Bar' },
        { fromPath: '/1oz-ABC-Platinum-Minted-Bar', toPath: '/product-details/1oz-ABC-Platinum-Minted-Bar' },
        { fromPath: '/100g-Perth-Mint-Gold-Minted-Bar', toPath: '/product-details/100g-Perth-Mint-Gold-Minted-Bar' },
        { fromPath: '/1g-Perth-Mint-Gold-Minted-Bar', toPath: '/product-details/1g-Perth-Mint-Gold-Minted-Bar' },
        { fromPath: '/5kg-ABC-Silver-Cast-Bar', toPath: '/product-details/5kg-ABC-Silver-Cast-Bar' },
        { fromPath: '/50g-ABC-Gold-Cast-Bar', toPath: '/product-details/50g-ABC-Gold-Cast-Bar' },
        { fromPath: '/500g-ABC-Gold-Cast-Bar', toPath: '/product-details/500g-ABC-Gold-Cast-Bar' },
        { fromPath: '/250g-ABC-Gold-Cast-Bar', toPath: '/product-details/250g-ABC-Gold-Cast-Bar' },
        { fromPath: '/1oz-Canadian-Maple-Leaf-Silver-Coin-Random-Year', toPath: '/product-details/1oz-Canadian-Maple-Leaf-Silver-Coin-Random-Year' },
        { fromPath: '/1oz-American-Eagle-Classic-Design-Silver-Coin', toPath: '/product-details/1oz-American-Eagle-Classic-Design-Silver-Coin' },
        { fromPath: '/1oz-American-Buffalo-Gold-Coin-Random-Year', toPath: '/product-details/1oz-American-Buffalo-Gold-Coin-Random-Year' },
        { fromPath: '/100oz-ABC-Silver-Cast-Bar', toPath: '/product-details/100oz-ABC-Silver-Cast-Bar' },
        { fromPath: '/100g-Queensland-Mint-Kangaroo-Gold-Cast-Bar', toPath: '/product-details/100g-Queensland-Mint-Kangaroo-Gold-Cast-Bar' },
        { fromPath: '/5oz-Queensland-Mint-Kangaroo-Gold-Cast-bar', toPath: '/product-details/5oz-Queensland-Mint-Kangaroo-Gold-Cast-bar' },
        { fromPath: '/5g-Perth-Mint-Gold-Minted-Bar', toPath: '/product-details/5g-Perth-Mint-Gold-Minted-Bar' },
        { fromPath: '/2oz-Queensland-Mint-Kangaroo-Gold-Cast-bar', toPath: '/product-details/2oz-Queensland-Mint-Kangaroo-Gold-Cast-bar' },
        { fromPath: '/1oz-Queensland-Mint-Kangaroo-Gold-Cast-bar', toPath: '/product-details/1oz-Queensland-Mint-Kangaroo-Gold-Cast-bar' },
        { fromPath: '/1oz-Perth-Mint-Gold-Minted-Bar', toPath: '/product-details/1oz-Perth-Mint-Gold-Minted-Bar' },
        { fromPath: '/1kg-Queensland-Mint-Kangaroo-Gold-Cast-Bar-with-Serial-Number', toPath: '/product-details/1kg-Queensland-Mint-Kangaroo-Gold-Cast-Bar-with-Serial-Number' },
        { fromPath: '/1kg-Perth-Mint-Silver-Cast-Bar', toPath: '/product-details/1kg-Perth-Mint-Silver-Cast-Bar' },
        { fromPath: '/10g-Perth-Mint-Gold-Minted-Bar', toPath: '/product-details/10g-Perth-Mint-Gold-Minted-Bar' },
        { fromPath: '/10oz-Queensland-Mint-Kangaroo-Gold-Cast-Bar', toPath: '/product-details/10oz-Queensland-Mint-Kangaroo-Gold-Cast-Bar' },
        { fromPath: '/1-2oz-Queensland-Mint-Kangaroo-Gold-Cast-Bar', toPath: '/product-details/1-2oz-Queensland-Mint-Kangaroo-Gold-Cast-Bar' },
        { fromPath: '/payment', toPath: '/topic/payment' },
        { fromPath: '/privacy-policy', toPath: '/topic/privacy-policy' },
        { fromPath: '/terms-of-service', toPath: '/topic/terms-of-trade' },
        { fromPath: '/delivery', toPath: '/topic/delivery' },
        //   { fromPath: '/shipping-calculator', toPath: '/shipping-calculator/' },
        { fromPath: '/vault-storage-calculator', toPath: '/vault-calculator/' },
    ];

    redirects.forEach(redirect => {
        createRedirect({
            fromPath: redirect.fromPath,
            toPath: redirect.toPath,
            isPermanent: true,
            redirectInBrowser: true,
        });
    });
};