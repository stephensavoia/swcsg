import responsiveImage from "./src/_includes/components/responsiveImage.js";
import comicViewer from "./src/_includes/components/comicViewer.js";

export default async function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets/css/");
  eleventyConfig.addPassthroughCopy("src/assets/js/");
  eleventyConfig.addPassthroughCopy({
    "src/assets/img/other/": "assets/img/",
  });

  eleventyConfig.addNunjucksAsyncShortcode("image", responsiveImage);
  eleventyConfig.addNunjucksShortcode("comicViewer", comicViewer);
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addWatchTarget("src/");
  eleventyConfig.addWatchTarget("src/assets/css/");
  eleventyConfig.addWatchTarget("src/assets/js/");

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
