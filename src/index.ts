import { Hono } from "hono";
import { serveStatic } from "hono/bun";

const app = new Hono();

// static file serving
app.use("/static/*", serveStatic({ root: "./" }));
app.use("/favicon.ico", serveStatic({ path: "./favicon.ico" }));
app.get("/", (c) => c.text("You can access: /static/hello.txt"));
app.get("*", serveStatic({ path: "./static/fallback.txt" }));

app.get(
  "/static/*",
  serveStatic({
    onNotFound: (path, c) => {
      console.log(`${path} is not found, you access ${c.req.path}`);
    },
  })
);
app.get("/", (c) => {
  return c.text("Hello Hono!");
});
app.get("/entry/:date/:id", (c) => {
  const id = c.req.param("id");
  return c.text(`Entry ${id}`);
});

export default {
  port: 3333,
  fetch: app.fetch,
};
