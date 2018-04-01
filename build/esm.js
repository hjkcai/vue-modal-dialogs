import buble from 'rollup-plugin-buble'

export default {
  input: 'src/index.js',
  external: ['vue'],
  plugins: [buble({ objectAssign: 'Object.assign' })],
  output: {
    file: 'dist/vue-modal-dialogs.esm.js',
    format: 'es'
  }
}

