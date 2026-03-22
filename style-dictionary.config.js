export default {
  source: ['tokens/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'hub',
      buildPath: 'src/styles/',
      files: [{ destination: 'tokens.css', format: 'css/variables' }]
    },
    ts: {
      transformGroup: 'js',
      buildPath: 'src/styles/',
      files: [{ destination: 'tokens.ts', format: 'javascript/es6' }]
    }
  }
}
