const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
module.exports = withBundleAnalyzer({
  reactStictMode: true,  
  images: {
    domains: ['ik.imagekit.io'],
  },
});
