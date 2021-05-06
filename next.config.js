module.exports = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
        ]
      }
    ]
  },
  env: {
    cloud_name: "ddo9tyz6e",
    api_key: "569274784458179",
    api_secret: "oCiMpvBFI7vwss_neBTabU6PuaI",
    PORT:'https://experience-a4hbbfwgt-thilina4321.vercel.app'
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
  future: {
    webpack5: true,
  },

};
