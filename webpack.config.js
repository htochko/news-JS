import path from 'path';
import { fileURLToPath } from 'url';
import * as webpack from 'webpack';
import { merge } from 'webpack-merge';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import DotenvWebpackPlugin from 'dotenv-webpack';
import 'webpack-dev-server';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const devConfig: webpack.Configuration = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: path.resolve(__dirname, './dist'),
    }
};

const prodConfig: webpack.Configuration =  {
    mode: 'production',
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(import.meta.dirname, 'dist'),
        clean: true,
        publicPath: 'auto', // Ensures relative assets load properly on subpaths
    },
};

const baseConfig: webpack.Configuration = {
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
    },
    plugins: [
        new DotenvWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
    ],
};

interface EnvOptions {
    mode?: string;
    [key: string]: string;
}

export default (env: EnvOptions) => {
    const isProductionMode = env.mode === 'prod';
    
    // If your prod/dev configs are still JS, require works, 
    // but consider converting them to .ts as well for full type safety.
    const envConfig = isProductionMode 
        ? prodConfig
        : devConfig;

    return merge(baseConfig, envConfig);
};