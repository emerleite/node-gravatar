import commonJs from 'rollup-plugin-commonjs';
import path from 'path';
import resolve from 'rollup-plugin-node-resolve';

/** @type import('rollup').RollupOptions */
const baseConfig = {
  input: 'src/gravatar.js',
  plugins: [
    resolve({ preferBuiltins: true }),
    commonJs()
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
    file: path.join(__dirname, 'lib/gravatar.js')
  }
}];

export default config;
