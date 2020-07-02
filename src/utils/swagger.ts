export const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.1",
    info: {
      version: "1.0.0",
      title: "Trainee API",
      description: "Trainee API Information",
      contact: {
        name: "Vishal Kumar",
        email: "vishal.kumar@successive.tech",
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  servers: [{ url: "http://localhost:9000/api", description: "Local server" }],
  apis: ["./src/controllers/trainee/routes.ts"],
};
