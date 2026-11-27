import { test, expect } from "bun:test";
import { readFileSync } from "node:fs";
import { getPageMetadata, pageMetadata, SITE_URL } from "./siteMetadata.ts";

test("all public pages use the user's permanent subdomain", () => {
  for (const path of Object.keys(pageMetadata)) {
    expect(getPageMetadata(path).canonical).toBe(`https://blueparadigm.dactacreative.com${path === "/" ? "/" : path}`);
  }
});

test("scenario pages retain distinct canonical addresses", () => {
  expect(getPageMetadata("/scenario-1/").canonical).toBe("https://blueparadigm.dactacreative.com/scenario-1");
  expect(getPageMetadata("/scenario-2").canonical).toBe("https://blueparadigm.dactacreative.com/scenario-2");
  expect(getPageMetadata("/scenario-3").canonical).toBe("https://blueparadigm.dactacreative.com/scenario-3");
});

test("public pages have distinct search titles and descriptions", () => {
  const pages = Object.values(pageMetadata);
  expect(new Set(pages.map((page) => page.title)).size).toBe(pages.length);
  expect(new Set(pages.map((page) => page.description)).size).toBe(pages.length);
});

test("the home page identifies Eunice Rigo and Pacific data visualisation", () => {
  expect(pageMetadata["/"].title).toContain("Eunice Rigo");
  expect(pageMetadata["/"].description).toContain("Pacific data visualisation");
});

test("the sitemap lists exactly the public pages in the metadata map", () => {
  const sitemap = readFileSync(new URL("../../public/sitemap.xml", import.meta.url), "utf8");
  const sitemapPaths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)]
    .map((match) => new URL(match[1]).pathname.replace(/\/+$/, "") || "/")
    .sort();
  const metadataPaths = Object.keys(pageMetadata).sort();
  expect(sitemapPaths).toEqual(metadataPaths);
  expect(sitemap).toContain(`<loc>${SITE_URL}/</loc>`);
});

test("unknown pages do not claim a valid page's search identity", () => {
  expect(getPageMetadata("/does-not-exist").robots).toBe("noindex, follow");
  expect(getPageMetadata("/does-not-exist").canonical).toBeNull();
});