/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        PUSHER_APP_ID: "1581427",
        PUSHER_APP_KEY: "61bef8916b91f4cb5473",
        PUSHER_APP_SECRET: "a8c2461af8abebb9af87",
        PUSHER_APP_CLUSTER: "ap2"
    }
}

module.exports = nextConfig
