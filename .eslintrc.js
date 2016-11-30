module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb",
    "env": {
        "mocha": true,
        "browser": true,
        "jquery": true,
        "es6": true
    },
    "globals": {
        "createjs": true
    },
    "rules": {
        "indent": ["error", 4],
        "prefer-arrow-callback": [0],
        "no-else-return": [0],
        "func-names": [0],
        "eol-last": [0],
        "quotes": [2, "single"],
        "no-var": [2],
        "max-len": ["error", 110],
        "no-unused-vars": [2, {"vars": "all", "varsIgnorePattern": "init", "args": "after-used"}]
    }
};