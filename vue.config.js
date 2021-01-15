// export const configureWebpack = {
//   resolve: {
//     alias: {
//       components: "@/components",
//       content: "components/content",
//       // common: "components/common",
//       common: "@/common",
//       assets: "@/assets",
//       network: "@/network",
//       views: "@/views"
//     }
//   }
// };
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        components: "@/components",
        content: "components/content",
        common: "components/common",
        assets: "@/assets",
        network: "@/network",
        views: "@/views"
      }
    }
  }
};
