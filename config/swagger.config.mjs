const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Backend API for SOLID-RMS(Restaurant Management System)",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3500/",
        description: "Development server", // Optional description
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter JWT token",
        },
        CsrfAuth: {
          type: "apiKey",
          in: "header",
          name: "X-CSRF-TOKEN",
          description: "CSRF token for preventing Cross-Site Request Forgery",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
        CsrfAuth: [],
      },
    ],
  },
  apis: ["./route/*.mjs"], // Path to your API routes
};

export default swaggerOptions;
