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
4. Add your comic page descriptions
   - Go to folder: _swcsg-main/src/\_data_ and delete the file _comics.json_
     - **SKIP THIS STEP IF YOU ARE UPDATING YOUR SITE, RATHER THAN BUILDING IT FOR THE FIRST TIME OR YOU WILL LOSE YOUR EXISTING COMIC PAGE DESCRIPTIONS**
   - In a command line terminal (e.g. PowerShell on Windows), from folder _swcsg-main_, run the command `npm run populate:comics`
   - Go back to folder: _swcsg-main/src/\_data_ and open the newly created version of _comics.json_
   - Fill out _comics.json_ with your comic page descriptions and then save the file
     - "id" - you don't need to touch this
     - "description" - a brief summary of what happens on your comics page (this helps with SEO)
     - For more information on how to write JSON, see [W3Schools](https://www.w3schools.com/js/js_json_intro.asp)
5. Add your comic info
   - Go to folder: _swcsg-main/src/\_data_ and open the file _comic.json_
   - Fill out _comic.json_ with your comic's information and then save the file
     - "title" - the title of your comic
     - "author" - your name
     - "url" - the location where your website will be hosted
     - "tipJarUrl" - a link to some kind of tip jar (e.g. PayPayl, Venmo, etc.)
     - "createdYear" - the year your comic was created
     - "logo" - the file name (including extension) of your banner logo
     - "socialMediaLogo" - the file name (including extension) of your social media logo
     - "description" - a description of your comic
     - "footerLinks" - links that will appear in your website's footer
     - "paginationDirection" - use "default" to start with your latest comic and "reverse" to start with your first comic
     - For more information on how to write JSON, see [W3Schools](https://www.w3schools.com/js/js_json_intro.asp)
6. Add styles
   - Go to folder: _swcsg-main/src/assets/css_ and open the file _styles.css_
   - Change the colors associated with each variable in `:root`, as desired
7. Build your website
   - In a command line terminal (e.g. PowerShell on Windows), from folder _swcsg-main_, run the command `npm run build`

## 3. Host your website

### You will need:

- The static website you just created

### Follow these steps:

1. Share your website with the world by deploying it to a host, such as:
   - [Cloudflare Pages](https://pages.cloudflare.com/)
   - [GitHub Pages](https://pages.github.com/)
