/* eslint-disable @typescript-eslint/no-var-requires */
import { defineConfig } from "cypress";
// Populate process.env with values from .env file
import "dotenv/config";

export default defineConfig({
  env: {
    auth0_username: process.env.AUTH0_USERNAME,
    auth0_password: process.env.AUTH0_PASSWORD,
    auth0_domain: process.env.AUTH0_DOMAIN,
    auth0_client_id: process.env.AUTH0_CLIENTID,
    auth0_client_secret: process.env.AUTH0_CLIENT_SECRET,
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
