'use strict';

const ExternalModuleFactoryPlugin = require('webpack/lib/ExternalModuleFactoryPlugin');

class PeerDepsExternalsPlugin {
  apply(compiler) {
    const peerDependencies = getPeerDependencies();

    compiler.hooks.compile.tap('compile', params => {
      new ExternalModuleFactoryPlugin(
        compiler.options.output.libraryTarget,
        peerDependencies
      ).apply(params.normalModuleFactory);
    });
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
