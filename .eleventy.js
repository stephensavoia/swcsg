import responsiveImage from "./src/_includes/components/responsiveImage.js";
import comicViewer from "./src/_includes/components/comicViewer.js";

export default async function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/favicon.ico");
  eleventyConfig.addPassthroughCopy("src/assets/css/");
  eleventyConfig.addPassthroughCopy("src/assets/js/");
  eleventyConfig.addPassthroughCopy({
    "src/assets/img/other/": "assets/img/",
  });
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  eleventyConfig.addNunjucksAsyncShortcode("image", responsiveImage);
  eleventyConfig.addNunjucksAsyncShortcode("comicViewer", comicViewer);
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);

  eleventyConfig.addCollection("comics", function (collection) {
    return collection.getAll();
  });

  eleventyConfig.addWatchTarget("src/assets/css/");
  eleventyConfig.addWatchTarget("src/assets/js/");

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
