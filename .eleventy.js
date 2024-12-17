import Image from "@11ty/eleventy-img";

async function imageShortcode(src, alt, sizes) {
  let metadata = await Image(src, {
    widths: [300, 600],
    formats: ["webp", "jpeg"],
    outputDir: "./_site/assets/img/comic",
    urlPath: "/assets/img/comic/",
    filenameFormat: function (hash, src, width, format) {
      const baseSrc = src.split("/").pop().split(".")[0];
      console.log(baseSrc);
      return `${baseSrc}-${width}px-${hash}.${format}`;
    },
  });

  let imageAttributes = {
    alt,
    sizes,
    loading: "lazy",
    decoding: "async",
  };

  return Image.generateHTML(metadata, imageAttributes);
}

export default async function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets/css/");
  eleventyConfig.addPassthroughCopy("src/assets/js/");
  eleventyConfig.addPassthroughCopy({
    "src/assets/img/other/": "assets/img/",
  });
  eleventyConfig.addPassthroughCopy({
    "src/assets/img/comic/output/": "assets/img/comic/",
  });

  eleventyConfig.addNunjucksAsyncShortcode("image", imageShortcode);

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
