module.exports = {
  type: "postgres",
  host: process.env.DATABASE_HOST,
  port: 5432,
  username: "postgres",
  password: "root",
  database: "desafio",
  synchronize: true,
  logging: false,
  entities: ["dist/models/**/*.js"],
};
