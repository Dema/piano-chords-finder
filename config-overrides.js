const {
  override,
  fixBabelImports,
  addBabelPlugin,
  addLessLoader,
  addBundleVisualizer,
  addWebpackPlugin,
  addPostcssPlugins,
} = require("customize-cra");
const { TypedCssModulesPlugin } = require("typed-css-modules-webpack-plugin");
// const CircularDependencyPlugin = require("circular-dependency-plugin");

module.exports = override(
  addWebpackPlugin(
    new TypedCssModulesPlugin({
      globPattern: "src/**/*.css",
      camelCase: "dashesOnly",
    })
  ),

  // addWebpackPlugin(new CircularDependencyPlugin()),
  addBundleVisualizer({}, true)
  // addPostcssPlugins([require("postcss-nested")])
);
