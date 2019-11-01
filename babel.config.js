module.exports = {
  presets: ["@vue/app"],
  plugins: [
    "@babel/plugin-proposal-object-rest-spread",
    "@babel/transform-runtime"
  ],
  env: {
    test: {
      plugins: ["require-context-hook"]
    }
  }
};
