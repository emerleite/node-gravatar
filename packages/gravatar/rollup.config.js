import { builtinModules } from 'module';
import { dependencies } from './package.json';
import babel from 'rollup-plugin-babel';
import commonJs from 'rollup-plugin-commonjs';
import path from 'path';
import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

/** @type import('rollup').RollupOptions */
const baseConfig = {
  input: 'src/gravatar.ts',
  external: builtinModules.concat(Object.keys(dependencies)),
  plugins: [
    resolve({ preferBuiltins: true }),
    commonJs(),
    typescript({
      tsconfigOverride: {
        compilerOptions: {
          module: 'esnext',
          target: 'esnext'
        }
      }
    }),
    babel()
  ]
};

/** @type Array<import('rollup').RollupOptions> */
const config = [{
  ...baseConfig,
  output: {
    format: 'esm',
    file: path.join(__dirname, 'lib/gravatar.esm.js')
  }
}, {
  ...baseConfig,
  output: {
    format: 'cjs',
    file: path.join(__dirname, 'lib/gravatar.js'),
    exports: 'named'
  }
}];

export default config;
