/** @type {import('@11ty/eleventy').UserConfig} */
module.exports = function (eleventyConfig) {
  eleventyConfig.addGlobalData("layout", "layout.njk");
  return {
    dir: {
      input: "content",
      includes: "_includes",
      output: "_site",
    },
  };
};
