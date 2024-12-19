import Image from "@11ty/eleventy-img";

export default async function responsiveImage(src, alt, sizes) {
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
