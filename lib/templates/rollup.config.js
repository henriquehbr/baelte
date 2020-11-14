import path from 'path'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import svelte from 'rollup-plugin-svelte'
import alias from '@rollup/plugin-alias'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import { terser } from 'rollup-plugin-terser'

const production = !process.env.ROLLUP_WATCH

export default {
  input: './src/index.js',
  output: {
    format: 'es',
    name: 'app',
    dir: './public/build'
  },
  plugins: [
    svelte({
      dev: !production,
      css: css => css.write('bundle.css', false)
    }),
    resolve({
      browser: true,
      dedupe: importee => importee === 'svelte' || importee.startsWith('svelte/'),
      customResolveOptions: {
        moduleDirectory: ['src', 'node_modules'],
        extensions: ['.svelte', '/index.svelte', '.mjs', '.js']
      }
    }),
    commonjs(),
    alias({
      entries: {
        components: path.resolve(__dirname, 'src', 'components'),
        styles: path.resolve(__dirname, 'src', 'styles')
      }
    }),
    serve({
      contentBase: 'public',
      port: 8080
    }),
    !production && livereload('public'),
    production && terser()
  ],
  onwarn: warning => {
    if (warning.code === 'THIS_IS_UNDEFINED') return
  }
}
