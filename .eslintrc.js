module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true
    },
    "ignorePatterns": ["*.test.js"],
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018
    },
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "double"]
    }
};