export default async function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets/");

  eleventyConfig.addCollection("comics", function (collection) {
    return collection.getAll();
  });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site",
    },
    templateFormats: ["njk"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
}
