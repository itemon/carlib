/**
 * pack src/index.js -> bundle.js
 */
import resolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import flow from 'rollup-plugin-flow'
import yaml from 'rollup-plugin-yaml'

module.exports = {
  input: 'src/index.js',
  output: {
    file: 'bin/carlib-cli',
    format: 'cjs',
    banner: '#!/usr/bin/env node'
  },
  external: ['mysql', 'axios'],
  plugins: [
    resolve(),
    commonjs({
      include: 'node_modules/**',
      extensions: [ '.js', '.coffee' ],
    }),
    yaml({
      include: "src/config/**",
    }),
    flow(),
    babel({
      exclude: 'node_modules/**',
      babelrc: false,
      runtimeHelpers: true,
      presets: [
        ['@babel/preset-env', { modules: false }],
        '@babel/preset-flow'
      ],
      plugins: [
        //"@babel/plugin-external-helpers"
        "@babel/plugin-transform-runtime",

        "@babel/plugin-syntax-dynamic-import",
        "@babel/plugin-syntax-import-meta",
        "@babel/plugin-proposal-class-properties",
        "@babel/plugin-proposal-json-strings",
        [
          "@babel/plugin-proposal-decorators",
          {
            "legacy": true
          }
        ],
        "@babel/plugin-proposal-function-sent",
        "@babel/plugin-proposal-export-namespace-from",
        "@babel/plugin-proposal-numeric-separator",
        "@babel/plugin-proposal-throw-expressions"
      ]
    })
  ]
}
