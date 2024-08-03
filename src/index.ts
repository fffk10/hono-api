import { Hono } from "hono";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});
app.get("/entry/:date/:id", (c) => {
  const id = c.req.param("id");
  return c.text(`Entry ${id}`);
});

export default app;
