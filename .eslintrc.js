/*
 * @Description:
 * @Version: 1.0.0
 * @Author: lax
 * @Date: 2020-10-22 18:58:04
 * @LastEditors: lax
 * @LastEditTime: 2021-12-19 20:39:07
 * @FilePath: \tao_solar_terms\.eslintrc.js
 */
module.exports = {
	parser: "@babel/eslint-parser",
	root: true,
	env: {
		node: true,
		es2021: true,
	},
	extends: [
		"airbnb-base/legacy",
		"plugin:prettier/recommended",
		"plugin:jest/recommended",
	],
	plugins: ["prettier"],
	parserOptions: {
		ecmaVersion: 11,
		sourceType: "module",
	},
	rules: {
		"no-bitwise": 0,
		"no-plusplus": 0,
		"no-underscore-dangle": 0,
		"prefer-destructuring": 0,
		"no-unused-expressions": 0,
		"no-nested-ternary": 0,
		"array-callback-return": 0,
		"class-methods-use-this": 0,
		"no-param-reassign": 0,
		camelcase: 0,
	},
	overrides: [
		{
			files: ["**/__test__/*.{j,t}s?(x)", "**/test/unit/**/*.test.{j,t}s?(x)"],
			env: {
				jest: true,
			},
		},
	],
};
