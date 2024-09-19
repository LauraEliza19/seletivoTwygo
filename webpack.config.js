module.exports = {
    module: {
      rules: [
        {
          test: /\.m?js/,
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.js$/,
          exclude: /@chakra-ui/,
          use: ['source-map-loader'],
          enforce: 'pre',
        },
      ],
    },
  };
  