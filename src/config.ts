export const config = {
  API_PORT: 8080,
  PRODUCTION: false,
  database: {
    USERNAME: "docker_user",
    PASSWORD: "d3kTrklm54208",
    DATABASE: "docker",
    PORT: 5432,
    HOST: process.env.NODE_ENV == "docker" ? "docker-app-db" : "localhost"
  },
  jwtSecret: "RUqz!Nwo4Q6t4&Im^2@54DZ@l6T",
  saltRounds: 10
}


