export const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Trainee API",
      description: "Trainee API Information",
      contact: {
        name: "Vishal Kumar",
        email: "vishal.kumar@successive.tech",
      },
    },
    host: "localhost:9000",
    basePath: "/api",
    securityDefinitions: {
      bearerAuth: {
        type: "apiKey",
        name: "Authorization",
        scheme: "bearer",
        in: "header",
      },
    },
  },
  apis: ["./src/controllers/trainee/routes.ts"],
};
