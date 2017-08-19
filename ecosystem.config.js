var user = encodeURIComponent(process.env.GITHUB_USER);
var password = encodeURIComponent(process.env.GITHUB_PASSWORD);
var keyPath = process.env.SSH_PRIVATE_KEY_PATH || "~/.ssh/id_rsa";

module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
  apps: [
    // First application
    {
      name: "hello-world",
      script: "npm",
      args: "start",
      env: {
        PORT: 3003
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
  deploy: {
    production: {
      key: keyPath,
      user: "eiurur",
      host: process.env.SSH_HOST,
      port: process.env.SSH_PORT,
      ref: "origin/master",
      repo: `https://${user}:${password}+@github.com/kaziba/express-wercker-pm2-deploy.git`,
      ssh_options: "StrictHostKeyChecking=no",
      path: "/home/eiurur/express-wercker-pm2-deploy",
      "post-setup": "npm install",
      "post-deploy": "pm2 startOrRestart ecosystem.config.js --env production"
    }
  }
};
