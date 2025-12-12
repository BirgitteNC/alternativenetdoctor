module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'postgres');
  
  // Support for DATABASE_URL (used by Render, Railway, etc.)
  if (env('DATABASE_URL')) {
    try {
      const url = new URL(env('DATABASE_URL'));
      return {
        connection: {
          client,
          connection: {
            host: url.hostname,
            port: parseInt(url.port) || 5432,
            database: url.pathname.slice(1), // Remove leading /
            user: url.username,
            password: url.password,
            ssl: env.bool('DATABASE_SSL', true) && {
              rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
            },
          },
          debug: false,
        },
      };
    } catch (error) {
      console.error('Error parsing DATABASE_URL:', error);
    }
  }
  
  // Fallback to separate variables (for Railway, local dev, etc.)
  return {
    connection: {
      client,
      connection: {
        host: env('DATABASE_HOST', '127.0.0.1'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'alternativenetdoctor'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: env.bool('DATABASE_SSL', false) && {
          rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
        },
      },
      debug: false,
    },
  };
};
