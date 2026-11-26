import { test, expect } from "bun:test";
import { getPageMetadata, pageMetadata } from "./siteMetadata.ts";

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

test("unknown pages do not claim a valid page's search identity", () => {
  expect(getPageMetadata("/does-not-exist").robots).toBe("noindex, follow");
  expect(getPageMetadata("/does-not-exist").canonical).toBeNull();
});