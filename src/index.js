'use strict';

const ExternalModuleFactoryPlugin = require('webpack/lib/ExternalModuleFactoryPlugin');

class PeerDepsExternalsPlugin {
  apply(compiler) {
    const peerDependencies = getPeerDependencies();

    // webpack 4+
    if (compiler.hooks) {
      compiler.hooks.compile.tap('compile', params => {
        new ExternalModuleFactoryPlugin(
          compiler.options.output.libraryTarget,
          peerDependencies
        ).apply(params.normalModuleFactory);
      });
    // webpack < 4, remove this in next major version
    } else {
      compiler.plugin('compile', params => {
        params.normalModuleFactory.apply(
          new ExternalModuleFactoryPlugin(
            compiler.options.output.libraryTarget,
            peerDependencies
          )
        );
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
