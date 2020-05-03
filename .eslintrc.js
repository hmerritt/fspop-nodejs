module.exports = {
    "plugins": ["prettier"],
    "extends": ["eslint:recommended", "plugin:prettier/recommended"],
    "env": {
        "node": true
    },
    "parserOptions": {
        "ecmaVersion": 8,
    },
    "rules": {
        "prettier/prettier": [
			"error", {
				"tabWidth": 4,
				"singleQuote": false
			}
		]
    }
}
