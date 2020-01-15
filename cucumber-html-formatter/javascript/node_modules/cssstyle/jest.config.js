module.exports = {
  "verbose": true,
  "collectCoverage": true,
  "collectCoverageFrom": [
    "lib/**/*.js",
    "!lib/implementedProperties.js",
    "!lib/properties.js",
  ],
  "coverageDirectory": "coverage",
};
