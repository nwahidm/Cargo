let watch = false;
let instances = 1;
let exec_mode = "fork";

module.exports = {
  apps: [
    {
      name: "Testing",
      cwd: "/home/clouduser/backend/Testing",
      script: "npm start",
      exp_backoff_restart_delay: 100,
      instances,
      exec_mode,
      watch,
      max_memory_restart: "1G",
      autorestart: true,
      env: {
        NAMESPACE: "Testing",
        NODE_ENV: "development",
        PORT: 3000,
        SECRET: "SECRET",
        DB_CONNECTION: "postgres",
        DB_HOST: "202.157.188.102",
        DB_PORT: 5432,
        DB_NAME: "Testing",
        DB_USERNAME: "w1_user",
        DB_PASSWORD: "P@ssw0rd#123",
        NODE_TLS_REJECT_UNAUTHORIZED: "0",
      },
      env_production: {
        NAMESPACE: "Testing",
        NODE_ENV: "development",
        PORT: 3000,
        SECRET: "SECRET",
        DB_CONNECTION: "postgres",
        DB_HOST: "202.157.188.102",
        DB_PORT: 5432,
        DB_NAME: "Testing",
        DB_USERNAME: "w1_user",
        DB_PASSWORD: "P@ssw0rd#123",
        NODE_TLS_REJECT_UNAUTHORIZED: "0",
      },
    },
  ],
};
