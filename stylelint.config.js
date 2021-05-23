module.exports = {
  extends: [
    "stylelint-config-recommended",
    "stylelint-config-property-sort-order-smacss",
  ],
  plugins: [],
  rules: {
    "no-descending-specificity": null,
    "color-no-hex": true,
    "at-rule-no-unknown": null,
    "selector-pseudo-class-no-unknown": [
      true,
      {
        ignorePseudoClasses: ["global", "local"],
      },
    ],
  },
};
