import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";
import { customLogger } from "./config/custom-logger";

const app = new Hono();

// logger
app.use(logger(customLogger));

// static file serving
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

// routes
app.get("/", (c) => {
  return c.text("Hello Hono!");
});
app.get("/entry/:id", (c) => {
  const id = c.req.param("id");
  customLogger("custom logger", `Entry ${id}`);
  return c.text(`Entry ${id}`);
});

app.get("/check/error", (c) => {
  throw new Error("request error route");
});

// custom
app.notFound((c) => {
  return c.text("404 Not Found");
});

app.onError((err, c) => {
  console.error(`${err}`);
  return c.text("Custom Error Message", 500);
});

export default {
  port: 3333,
  fetch: app.fetch,
};
