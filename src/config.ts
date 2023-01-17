export const config = {
  API_PORT: 8080,
  PRODUCTION: false,
  database: {
    USERNAME: process.env.DB_USER || "root",
    PASSWORD: process.env.DB_PASSWORD || "password",
    DATABASE: process.env.DB_NAME || "db",
    PORT: 5432,
    HOST: process.env.NODE_ENV == "docker" ? "docker-app-db" : "localhost"
  },
  jwtSecret:  process.env.JWT_SECRET || "RUqz!Nwo4Q6t4&Im^2@54DZ@l6T",
  saltRounds: 10
}


