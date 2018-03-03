import nodeResolve from 'rollup-plugin-node-resolve'
import babel from 'rollup-plugin-babel'
import replace from 'rollup-plugin-replace'
import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'

const env = process.env.NODE_ENV

const config = {
  input: 'src/index.js',
  external: ['react', 'vue', 'vuex'],
  output: {
    format: 'umd',
    name: 'ReactVuex',
    globals: {
      react: 'React',
      vue: 'vue',
      vuex: 'vuex'
    }
  },
  plugins: [
    nodeResolve(),
    babel({
      exclude: '**/node_modules/**',
      plugins: ['external-helpers']
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env)
    }),
    commonjs()
  ]
}

if (env === 'production') {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  )
}

export default config
