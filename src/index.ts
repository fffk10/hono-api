import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";
import { customLogger } from "./config/custom-logger";
import { dummyData } from "./config/dummy";

const app = new Hono();

// ============ setup ============ //
app.use(logger(customLogger));
// ============ setup ============ //

// ============ static file ============ //
app.use("/static/*", serveStatic({ root: "./" }));
app.use("/favicon.ico", serveStatic({ path: "./favicon.ico" }));
app.get("/", (c) => c.text("You can access: /static/hello.txt"));
app.get(
  "/static/*",
  serveStatic({
    onNotFound: (path, c) => {
      console.log(`${path} is not found, you access ${c.req.path}`);
    },
  })
);
// ============ static file ============ //

// ============ route ============ //
app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("warranties", (c) => {
  return c.json(dummyData);
});
// ============ custom ============ //

// ============ custom ============ //
app.notFound((c) => {
  return c.text("404 Not Found");
});
app.onError((err, c) => {
  console.error(`${err}`);
  return c.text("Custom Error Message", 500);
});
// ============ custom ============ //

export default {
  port: 3333,
  fetch: app.fetch,
};
