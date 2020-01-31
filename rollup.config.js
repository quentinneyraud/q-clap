import { terser } from 'rollup-plugin-terser'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import rimraf from 'rimraf'
import path from 'path'

rimraf.sync(path.resolve(__dirname, 'umd'))

export default [
  // normal
  {
    input: 'src/index.js',
    plugins: [
      resolve(),
      commonjs()
    ],
    output: [{
      file: 'umd/q-clap.js',
      format: 'umd',
      name: 'q-clap'
    }]
  },
  // minified
  {
    input: 'src/index.js',
    plugins: [
      terser(),
      resolve(),
      commonjs()
    ],
    output: [{
      file: 'umd/q-clap.min.js',
      format: 'umd',
      name: 'q-clap'
    }]
  },
  // polyfilled
  {
    input: 'src/index.js',
    plugins: [
      resolve(),
      commonjs(),
      babel()
    ],
    output: [{
      file: 'umd/q-clap.polyfill.js',
      format: 'umd',
      name: 'q-clap'
    }]
  },
  // polyfilled and minified
  {
    input: 'src/index.js',
    plugins: [
      terser(),
      resolve(),
      commonjs(),
      babel()
    ],
    output: [{
      file: 'umd/q-clap.polyfill.min.js',
      format: 'umd',
      name: 'q-clap'
    }]
  }
]
