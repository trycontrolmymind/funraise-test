import { Configuration } from 'webpack';
import CopyPlugin from "copy-webpack-plugin";

const config: Configuration = {
  output: {
    filename: "index.js",
    clean: true,
  },
  mode: 'development',
  module: {
    rules: [
      {
        exclude: /(node_modules)/,
        loader: 'ts-loader',
        test: /\.[tj]sx?$/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        "src/html/"
      ],
    }),
  ],
}

export default config
