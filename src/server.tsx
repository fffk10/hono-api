import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { logger } from "hono/logger";
import { renderToString } from "react-dom/server";
import { customLogger } from "./config/custom-logger";
import { dummyData } from "./config/dummy";
import { getCookie } from "hono/cookie";
import {
  ColorModeScript,
  ThemeSchemeScript,
  defaultConfig,
} from "@yamada-ui/react";

type Env = {
  Bindings: {
    MY_VAR: string;
  };
};

const app = new Hono<Env>();

// ============ setup ============ //
app.use(logger(customLogger));
// ============ setup ============ //

// ============ static file ============ //
app.use("/static/*", serveStatic({ root: "./" }));
app.use("/favicon.ico", serveStatic({ path: "./favicon.ico" }));
app.get(
  "/static/*",
  serveStatic({
    onNotFound: (path, c) => {
      console.log(`${path} is not found, you access ${c.req.path}`);
    },
  })
);
// ============ static file ============ //

// ============ api ============ //
const getWarranties = app.get("/api/warranties", (c) => {
  return c.json(dummyData);
});
app.get("/api/clock", (c) => {
  return c.json({
    var: c.env.MY_VAR, // Cloudflare Bindings
    time: new Date().toLocaleTimeString(),
  });
});
export type GetWarrantiesType = typeof getWarranties;
// ============ api ============ //

// ============ front ============ //
app.get("*", (c) => {
  const colorMode: any = getCookie(c, "ui-color-mode");
  const themeScheme = getCookie(c, "ui-theme-scheme");

  return c.html(
    renderToString(
      <html>
        <head>
          <meta charSet="utf-8" />
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <link
            rel="stylesheet"
            href="https://cdn.simplecss.org/simple.min.css"
          />
          {import.meta.env.PROD ? (
            <script type="module" src="/static/client.js"></script>
          ) : (
            <script type="module" src="/src/app/client.tsx"></script>
          )}
        </head>
        <body>
          <ColorModeScript
            type="cookie"
            nonce="testing"
            initialColorMode={colorMode ?? defaultConfig.initialColorMode}
          />
          <ThemeSchemeScript
            type="cookie"
            nonce="testing"
            initialThemeScheme={themeScheme ?? defaultConfig.initialThemeScheme}
          />
          <div id="root"></div>
        </body>
      </html>
    )
  );
});
// ============ front ============ //

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
