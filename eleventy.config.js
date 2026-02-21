/** @type {import('@11ty/eleventy').UserConfig} */
module.exports = function (eleventyConfig) {
  eleventyConfig.addGlobalData("layout", "layout.njk");

  const siteOrigin = process.env.URL || "https://digriz.netlify.app";
  const siteHost = new URL(siteOrigin).hostname;

  eleventyConfig.addTransform("outgoing-links", (content, outputPath) => {
    if (!outputPath || !outputPath.endsWith(".html")) return content;
    return content.replace(
      /<a href="(https?:\/\/)([^"]+)"/gi,
      (match, scheme, rest) => {
        try {
          const url = new URL(scheme + rest);
          if (url.hostname === siteHost) return match;
          const path =
            url.hostname + (url.pathname || "/") + (url.search || "") + (url.hash || "");
          return `<a href="/out/${path}"`;
        } catch {
          return match;
        }
      }
    );
  });

  // Section pages: all content pages except index and drafts (.di.md)
  eleventyConfig.addCollection("sectionPages", function (collectionApi) {
    return collectionApi.getFilteredByGlob("content/**/*.md").filter((p) => {
      if (p.inputPath && p.inputPath.includes(".di.md")) return false;
      const u = p.url || "";
      if (u === "/" || u === "/index/") return false;
      return true;
    });
  });

  eleventyConfig.addPassthroughCopy("robots.txt");
  eleventyConfig.addPassthroughCopy("_redirects");

  return {
    dir: {
      input: "content",
      includes: "_includes",
      output: "_site",
    },
  };
};
