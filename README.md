# This README.md is not complete. Please ignore for now

# Static Webcomic Site Generator

Static Webcomic Site Generator (SWCSG) is a tool that allows cartoonists to quickly and easily create a website to share their work. It's built using 11ty.

## 1. Install SWCSG

### You will need:

- Node.js

### Follow these steps:

1. Install Node.js (and npm)
2. Download the SWCSG folder
   - Go to https://github.com/stephensavoia/swcsg
   - Click: _Code > Download ZIP_
3. Extract _swcsg-main_ to a folder on your computer
4. Install SWCSG
   - In a command line terminal (e.g. PowerShell on Windows), from folder _swcsg-main_, run the command `npm i`

## 2. Create your website

### You will need:

- A favicon
  - Format: ico
  - Dimensions: 48px X 48px
- A navbar logo
  - Format: png
  - Dimensions: 300px wide X 150px high
- A social media logo
  - Format: png
  - Dimensions: 1200px wide X 628px high
- Comic pages
  - Format: png
  - Dimensions: Up to 2520px wide

### Follow these steps:

1. Add your favicon
   - If you don't already have a favicon, you can create one using a generator such as https://realfavicongenerator.net/
   - Go to folder: _swcsg-main > src_
   - Delete the current _favicon.ico_ and replace it with your favicon
   - Make sure your favicon is titled "favicon.io"
2. Add your navbar and social media logos
   - Go to folder: _swcsg-main/src/assets/img/other_
   - Delete the current logo files and add your own
3. Add your comic pages
   - Go to folder: _swcsg-main/src/assets/img/comic_
   - Delete the current comic page files and add your own
   - Make sure your comic page files are titled in numerical order, with leading zeros where necessary
     - Example: 001.jpg, 002.jpg, 003.jpg...
4. Add your comic pages info
   - Go to folder: _swcsg-main/src/\_data_ and delete the file _comics.json_
   - In a command line terminal (e.g. PowerShell on Windows), from folder _swcsg-main_, run the command `npm run populate:comics`
   - Go back to folder: _swcsg-main/src/\_data_ and open the newly created version of _comics.json_
   - Fill out with your own information

## 3. Host your website

### You will need:

- The static website you just created

### Follow these steps:

1. Share your website with the world by deploying it to a host, such as:
   - [Cloudflare Pages](https://pages.cloudflare.com/)
   - [GitHub Pages](https://pages.github.com/)
