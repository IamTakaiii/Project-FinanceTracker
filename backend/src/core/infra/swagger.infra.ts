import type { ElysiaSwaggerConfig } from "@elysiajs/swagger";

import { OpenAPI } from "../lib/auth";

export const swaggerConfig: ElysiaSwaggerConfig = {
  path: "/swagger",
  exclude: ["/swagger"],
  documentation: {
    info: {
      title: "Project API",
      description: "API documentation for Project",
      version: "1.0.0",
    },
    components: await OpenAPI.components,
    paths: await OpenAPI.getPaths(),
  },
};
