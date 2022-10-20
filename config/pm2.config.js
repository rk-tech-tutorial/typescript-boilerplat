module.exports = {
    apps: [
      {
        name: "boilerplate",
        script: "./build/index.js",
        exec_mode: "fork",
        watch: false,
        env: {
          NODE_ENV: "production",
          PORT: "8000"
        }
      }
    ]
  };
  