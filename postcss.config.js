module.exports = ({
  file,
  options,
  env
}) => ({
  plugins: [
    require('postcss-cssnext')({ warnForDuplicates: false }),
    require('cssnano')(),
    require('tailwindcss')('./tailwind.js')
  ]
})