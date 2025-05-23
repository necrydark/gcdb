/** @type {import('next').NextConfig} */
const nextConfig = {
    compress: true,
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
            },
            {
                protocol: "https",
                hostname: "pbs.twimg.com",
                port: ""
            },
            {
                protocol: "https",
            hostname: "3duibobjm6.ufs.sh",
                
                port: ""
            }


        ]
    }
};

export default nextConfig;
