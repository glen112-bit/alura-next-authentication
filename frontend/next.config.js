/**
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  /* config options here */
    httpAgentOptions: {
    keepAlive: false,
  
  modern: true,
  experimental: {
        esmExternals: "loose",
    },
  },
}
 
module.exports =  nextConfig
