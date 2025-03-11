/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  webpack(config: {
      module: {
        rules: {
          test: RegExp; use: (string | {
            loader: string; // Parse the CSS file
            options: { modules: { localIdentName: string; }; };
          })[];
        }[];
      };
    }) {
    // Custom CSS modules configuration
    config.module.rules.push({
      test: /\.module\.css$/,
      use: [
        'style-loader', // Inject styles into the DOM
        {
          loader: 'css-loader', // Parse the CSS file
          options: {
            modules: {
              localIdentName: '[local]__[hash:base64:5]', // Define local class name format
            },
          },
        },
      ],
    });

    // Return the modified config
    return config;
  },
  images: {
    // Allow images from 'plus.unsplash.com' domain
    domains: ['plus.unsplash.com'],
  },
};

module.exports = withBundleAnalyzer(nextConfig); 