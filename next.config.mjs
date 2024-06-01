/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: false,
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "lh3.googleusercontent.com",
                port: "",
            },
            {
                protocol: 'https',
                hostname: "gcdatabase.com",
                port: ""
            },
            {
                protocol: "https",
                hostname: "avatar.vercel.sh",
                port: ""
            },
            {
                protocol: "https",
                hostname: "utfs.io",
                port: ""
            }

        ]
    }
};

export default nextConfig;
