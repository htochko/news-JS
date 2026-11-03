import path from 'path';
import { fileURLToPath } from 'url';
import { merge } from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import 'webpack-dev-server';
import Dotenv from 'dotenv-webpack';
import webpack from 'webpack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const devConfig = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: path.resolve(__dirname, './dist'),
    }
};

const prodConfig =  {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(import.meta.dirname, 'dist'),
        clean: true,
        publicPath: 'auto', // Ensures relative assets load properly on subpaths
    },
};

const baseConfig = {
    entry: path.resolve(__dirname, './src/index.ts'),
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, './dist'),
        clean: true,
    },
    plugins: [
        new Dotenv({path: path.resolve(__dirname, '.env'), systemvars: true,}),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
    ],
};

export default (env) => {
    const isProductionMode = env.mode === 'prod';
    
    // If your prod/dev configs are still JS, require works, 
    // but consider converting them to .ts as well for full type safety.
    const envConfig = isProductionMode 
        ? prodConfig
        : devConfig;

    return merge(baseConfig, envConfig);
};