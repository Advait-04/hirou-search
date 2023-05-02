/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "instagram.fcok1-1.fna.fbcdn.net",
            "external-content.duckduckgo.com",
        ],
    },
};

module.exports = nextConfig;
