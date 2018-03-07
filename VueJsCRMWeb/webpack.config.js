const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CheckerPlugin = require('awesome-typescript-loader').CheckerPlugin;
const bundleOutputDir = './wwwroot/dist';
const bundleMainDir = './wwwroot/static';
const staticFiles = './ClientApp/static';
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
    const isDevBuild = !(env && env.prod);

    return [{
        stats: { modules: false },
        context: __dirname,
        resolve: {
            extensions: ['.js', '.ts', '.vue', '.json'],
            alias: {
                'vue$': 'vue/dist/vue',
                'components': path.resolve(__dirname, './ClientApp/components'),
                'views': path.resolve(__dirname, './ClientApp/views'),
                'utils': path.resolve(__dirname, './ClientApp/utils'),
                'api': path.resolve(__dirname, './ClientApp/store/api'),
                '@': path.resolve(__dirname, './ClientApp'),
                '../img': path.resolve(__dirname, './ClientApp/static/img')
            }
        },
        entry: { 'main': './ClientApp/main.ts' },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    include: /ClientApp/,
                    options: {
                      esModule: true,
                      loaders: {
                        // Since sass-loader (weirdly) has SCSS as its default parse mode, we map
                        // the "scss" and "sass" values for the lang attribute to the right configs here.
                        // other preprocessors should work out of the box, no loader config like this necessary.
                          'scss': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader'
                        ],
                          'sass': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader?indentedSyntax'
                        ]
                    }
                    // other vue-loader options go here
                    }
                  
                },
                { test: /\.vue\.html$/, include: /ClientApp/, loader: 'vue-loader', options: { loaders: { js: 'awesome-typescript-loader?silent=true' } } },
                {
                    test: /\.ts(x?)$/,
                    loader: 'ts-loader',
                    exclude: /node_moduels/,
                   // include: [resolve('src')],
                    options: {
                      appendTsSuffixTo: [/\.vue$/]
                    }
              
                },
                { test: /\.css$/, use: isDevBuild ? [ 'style-loader', 'css-loader' ] : ExtractTextPlugin.extract({ use: 'css-loader' }) },
                { test: /\.(png|ttf|woff2?|eot|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' },
                {
                    test: /\.scss$/,
                    use: [
                        'vue-style-loader',
                        'css-loader',
                        'sass-loader'
                    ],
                },
                {
                    test: /\.sass$/,
                    use: [
                        'css-loader',
                        'sass-loader?indentedSyntax'
                    ],
                }
            ]
        },
        output: {
            path: path.join(__dirname, bundleOutputDir),
            filename: '[name].js',
            publicPath: 'dist/'
        },
        plugins: [
            new CheckerPlugin(),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(isDevBuild ? 'development' : 'production')
                }
            }),
            new webpack.DllReferencePlugin({
                context: __dirname,
                manifest: require('./wwwroot/dist/vendor-manifest.json')
            }),
            new CopyWebpackPlugin([
                {
                    from: path.join(__dirname, staticFiles),
                    to: path.join(__dirname, bundleMainDir)
                }
            ])
        ].concat(isDevBuild ? [
            // Plugins that apply in development builds only
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(bundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            })
        ] : [
            // Plugins that apply in production builds only
            new webpack.optimize.UglifyJsPlugin(),
            new ExtractTextPlugin('site.css')
        ])
    }];
};
