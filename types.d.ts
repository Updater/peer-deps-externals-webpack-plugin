import { Compiler } from "webpack";

declare class PeerDepsExternalsWebpackPlugin {
  apply(compiler: Compiler): void;
}

export = PeerDepsExternalsWebpackPlugin;
