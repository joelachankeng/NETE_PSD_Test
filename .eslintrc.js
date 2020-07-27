module.exports = {
  "extends": "google",
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module",
    "allowImportExportEverywhere": false
  },
  "rules": {
    "no-var": 0,
    "quotes": 0,
    "max-len": [2, {
      code: 200,
      tabWidth: 2,
      ignoreUrls: true,
      ignorePattern: '^goog\.(module|require)',
    }],
    "valid-jsdoc": [2, {
      requireParamDescription: false,
      requireReturnDescription: false,
      requireReturn: false,
      prefer: {
        returns: 'returns'
      },
    }],
    "comma-dangle": 0,
    "linebreak-style": 0,
    "eol-last": 0
  }
};