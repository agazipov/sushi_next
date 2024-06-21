/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'fish-rice-bucket.s3.cloud.ru',
            port: '',
            pathname: '/**',
          },
        ]
    }
};

export default nextConfig;
