module.exports = {
    apps: [
      {
        name: 'next-app',
        script: 'npm',
        args: 'start',
        env: {
          NODE_ENV: 'production',
        },
        exec_mode: 'fork',
        instances: 1,
        autorestart: true,
        watch: false,
        max_memory_restart: '3G',
        env_production: {
          NODE_ENV: 'production',
          PORT: 3000, 
        },
      },
    ],
  };