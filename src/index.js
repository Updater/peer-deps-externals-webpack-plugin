'use strict';

const ExternalModuleFactoryPlugin = require('webpack/lib/ExternalModuleFactoryPlugin');

class PeerDepsExternalsPlugin {
  apply(compiler) {
    const peerDependencies = getPeerDependencies();

    // webpack 5+
    if (typeof compiler.options.output.library === 'object') {
      compiler.hooks.compile.tap('PeerDepsExternalsPlugin', ({ normalModuleFactory }) => {
        new ExternalModuleFactoryPlugin(
          compiler.options.output.library.type,
          peerDependencies
        ).apply(normalModuleFactory);
      });
    }
    // webpack 4+
    else {
      compiler.hooks.compile.tap('compile', params => {
        new ExternalModuleFactoryPlugin(
          compiler.options.output.libraryTarget,
          peerDependencies
        ).apply(params.normalModuleFactory);
      });
    }
  }
}

function getPeerDependencies() {
  try {
    const { resolve } = require('path');
    const pkg = require(resolve(process.cwd(), 'package.json'));
    return Object.keys(pkg.peerDependencies);
  } catch(err) {
    return [];
  }
}

module.exports = PeerDepsExternalsPlugin;
