# Peer Deps Externals Webpack Plugin
Webpack plugin to automatically add a library's `peerDependencies` to the bundle's `externals`.

## Motivation
When bundling a library using webpack, we generally want to keep from including 
[`peerDependencies`](https://nodejs.org/en/blog/npm/peer-dependencies/) since they are expected to be 
provided by the consumer of the library. By excluding these dependencies, we keep bundle size down and 
avoid bundling duplicate dependencies.

We can achieve this using the webpack [`externals`](https://webpack.js.org/configuration/externals/)
configuration option, providing it a list of the peer dependencies to exclude from the bundle. 
This plugin automates the process, automatically adding a library's `peerDependencies` to the `externals` configuration.

## Installation

### npm
```bash
npm install --save-dev peer-deps-externals-webpack-plugin
```

### yarn
```bash
yarn add --dev peer-deps-externals-webpack-plugin
```

## Usage
```javascript
// Webpack config
var PeerDepsExternalsPlugin = require('peer-deps-externals-webpack-plugin');

module.exports = {
  plugins: [
    new PeerDepsExternalsPlugin(),
  ],
}
```
