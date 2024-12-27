const path = require('path');
const glob = require('glob');
var nodeExternals = require('webpack-node-externals');

const config = {
    mode: "development",
    entry: glob.sync('./src/index.ts'),
    output: {
        path: path.resolve(__dirname, 'build'),
    },
    resolve: {
      // Add '.ts' and '.tsx' as a resolvable extension.
      extensions: ['.ts', '.js', '.json'],
    },
    module: {
        rules: [
        // All files with a '.ts' or '.tsx'
        // extension will be handled by 'ts-loader'
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
        }
      ]
    },
    // optimization: {
    //   nodeEnv: false
    // },
    target: 'node',
    externals: [nodeExternals()],
    node: {
        __dirname: false
    }
}

module.exports = (env, argv) => {
    if (env === 'production') {
      config.mode = env;
    }

    return config;
  };