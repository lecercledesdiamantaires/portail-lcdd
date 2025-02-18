module.exports = {
  apps: [
    {
      name: 'nuxt-app',  // Nom de ton application frontend
      script: 'npm',
      args: 'run start', 
      env: {
        NODE_ENV: 'development',
        API_URL: 'http://localhost:4000',  // URL du backend en développement
      },
      env_production: {
        NODE_ENV: 'production',
        API_URL: 'https://partenaire.lecercledesdiamantaires.com',  // URL du backend en production
      },
    },
  ],
};
