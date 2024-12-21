import responsiveImage from "./responsiveImage.js";
import { html } from "common-tags";

export default function comicViewer({
  id,
  description,
  imageUrl,
  variantUrl,
  prevId,
  prevImageUrl,
  nextId,
  nextImageUrl,
  latestId,
}) {
  //   let navLinks;
  //   if (prevId && nextId) {
  //     navLinks = html` <div class="comic-viewer-nav-links">
  //       <div class="comic-viewer-left-links">
  //         <a href="/BR/001">&lt;&lt; First</a
  //         ><a class="comic-viewer-prev-button" href="/BR/${prevId}"
  //           >&lt; Previous</a
  //         >
  //       </div>
  //       <div class="comic-viewer-right-links">
  //         <a class="comic-viewer-next-button" href="/BR/${nextId}">Next &gt;</a
  //         ><a href="/BR/${latestId}">Latest &gt;&gt;</a>
  //       </div>
  //     </div>`;
  //   } else if (prevId) {
  //     navLinks = html` <div class="comic-viewer-nav-links">
  //       <div class="comic-viewer-left-links">
  //         <a href="/BR/001">&lt;&lt; First</a
  //         ><a class="comic-viewer-prev-button" href="/BR/${prevId}"
  //           >&lt; Previous</a
  //         >
  //       </div>
  //       <div class="comic-viewer-right-links">
  //         <span class="comic-viewer-hidden-link">Next &gt;</span
  //         ><span class="comic-viewer-hidden-link">Latest &gt;&gt;</span>
  //       </div>
  //     </div>`;
  //   } else {
  //     // nextId only
  //     navLinks = html` <div class="comic-viewer-nav-links">
  //       <div class="comic-viewer-left-links">
  //         <span class="comic-viewer-hidden-link">&lt;&lt; First</span
  //         ><span class="comic-viewer-hidden-link">&lt; Previous</span>
  //       </div>
  //       <div class="comic-viewer-right-links">
  //         <a class="comic-viewer-next-button" href="/BR/${nextId}">Next &gt;</a
  //         ><a href="/BR/${latestId}">Latest &gt;&gt;</a>
  //       </div>
  //     </div>`;
  //   }

  //   let preloadingPrevComic;
  //   if (prevImageUrl) {
  //     preloadingPrevComic = html`
  //       <img
  //         alt="preloading prev comic"
  //         loading="eager"
  //         decoding="async"
  //         sizes="(min-width: 880px) 880px, 100vw"
  //         style="
  //           object-fit: cover;
  //           max-width: 880px;
  //           max-height: 880px;
  //           aspect-ratio: 1;
  //           width: 100%;
  //         "
  //         srcset="
  //           ${prevImageUrl}&amp;width=640&amp;height=640    640w,
  //           ${prevImageUrl}&amp;width=750&amp;height=750    750w,
  //           ${prevImageUrl}&amp;width=828&amp;height=828    828w,
  //           ${prevImageUrl}&amp;width=880&amp;height=880    880w,
  //           ${prevImageUrl}&amp;width=960&amp;height=960    960w,
  //           ${prevImageUrl}&amp;width=1080&amp;height=1080 1080w,
  //           ${prevImageUrl}&amp;width=1280&amp;height=1280 1280w,
  //           ${prevImageUrl}&amp;width=1668&amp;height=1668 1668w,
  //           ${prevImageUrl}&amp;width=1760&amp;height=1760 1760w
  //         "
  //         src="${prevImageUrl}&amp;width=880&amp;height=880"
  //       />
  //     `;
  //   } else {
  //     preloadingPrevComic = "";
  //   }

  //   let preloadingNextComic;
  //   if (nextImageUrl) {
  //     preloadingNextComic = html`
  //       <img
  //         alt="preloading next comic"
  //         loading="lazy"
  //         decoding="async"
  //         sizes="(min-width: 880px) 880px, 100vw"
  //         style="
  //           object-fit: cover;
  //           max-width: 880px;
  //           max-height: 880px;
  //           aspect-ratio: 1;
  //           width: 100%;
  //         "
  //         srcset="
  //           ${nextImageUrl}&amp;width=640&amp;height=640    640w,
  //           ${nextImageUrl}&amp;width=750&amp;height=750    750w,
  //           ${nextImageUrl}&amp;width=828&amp;height=828    828w,
  //           ${nextImageUrl}&amp;width=880&amp;height=880    880w,
  //           ${nextImageUrl}&amp;width=960&amp;height=960    960w,
  //           ${nextImageUrl}&amp;width=1080&amp;height=1080 1080w,
  //           ${nextImageUrl}&amp;width=1280&amp;height=1280 1280w,
  //           ${nextImageUrl}&amp;width=1668&amp;height=1668 1668w,
  //           ${nextImageUrl}&amp;width=1760&amp;height=1760 1760w
  //         "
  //         src="${nextImageUrl}&amp;width=880&amp;height=880"
  //       />
  //     `;
  //   } else {
  //     preloadingNextComic = "";
  //   }

  //  return html`
  //    <main>
  //       <div class="comic-viewer-container">
  //         <div class="comic-container">
  //           <img
  //             id="comic-viewer-comic"
  //             alt="${description}"
  //             loading="lazy"
  //             decoding="async"
  //             sizes="(min-width: 880px) 880px, 100vw"
  //             style="
  //           object-fit: cover;
  //           max-width: 880px;
  //           max-height: 880px;
  //           aspect-ratio: 1;
  //           width: 100%;
  //         "
  //             srcset="
  //               ${imageUrl}&amp;width=640&amp;height=640    640w,
  //               ${imageUrl}&amp;width=750&amp;height=750    750w,
  //               ${imageUrl}&amp;width=828&amp;height=828    828w,
  //               ${imageUrl}&amp;width=880&amp;height=880    880w,
  //               ${imageUrl}&amp;width=960&amp;height=960    960w,
  //               ${imageUrl}&amp;width=1080&amp;height=1080 1080w,
  //               ${imageUrl}&amp;width=1280&amp;height=1280 1280w,
  //               ${imageUrl}&amp;width=1668&amp;height=1668 1668w,
  //               ${imageUrl}&amp;width=1760&amp;height=1760 1760w
  //             "
  //             src="${imageUrl}&amp;width=880&amp;height=880"
  //           />
  //         </div>
  //         ${navLinks}
  //         <div class="comic-viewer-ad-buttons">
  //           <a href="${variantUrl}" class="comic-viewer-ad-button">Buy Print</a
  //           ><a
  //             href="https://shop.willyandfroggy.com/products/tip-jar"
  //             class="comic-viewer-ad-button"
  //             >Tip Jar</a
  //           >
  //         </div>
  //         <a
  //           id="comic-viewer-share-link"
  //           href="#"
  //           onclick="shareHandler(event, '${id}', '${description.replace(
  //             /'/g,
  //             "\\'"
  //           )}');"
  //           class="comic-viewer-share-link"
  //           ><span>Share Link</span
  //           ><svg
  //             stroke-width="1.5"
  //             viewBox="0 0 24 24"
  //             fill="none"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <path
  //               d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z"
  //               stroke="currentColor"
  //               stroke-linecap="round"
  //               stroke-linejoin="round"
  //             ></path>
  //             <path
  //               d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z"
  //               stroke="currentColor"
  //               stroke-linecap="round"
  //               stroke-linejoin="round"
  //             ></path>
  //             <path
  //               d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z"
  //               stroke="currentColor"
  //               stroke-linecap="round"
  //               stroke-linejoin="round"
  //             ></path>
  //             <path
  //               d="M15.5 6.5L8.5 10.5"
  //               stroke="currentColor"
  //               stroke-width="1.5"
  //             ></path>
  //             <path
  //               d="M8.5 13.5L15.5 17.5"
  //               stroke="currentColor"
  //               stroke-width="1.5"
  //             ></path>
  //           </svg>
  //         </a>
  //         <div class="comic-viewer-description">
  //           <h2>Bright Red #${id}</h2>
  //           <p>${description}</p>
  //         </div>
  //         <div
  //           class="preloadingComics"
  //           style="visibility: hidden; position: absolute; top: 0"
  //         >
  //           ${preloadingPrevComic} ${preloadingNextComic}
  //         </div>
  //       </div>
  //     </main>
  //   `;
  return html`<div>
    id: ${id}
    <br />
    description: ${description}
    <br />
    imageUrl: ${imageUrl}
    <br />
    variantUrl: ${variantUrl}
    <br />
    prevId: ${prevId}
    <br />
    prevImageUrl: ${prevImageUrl}
    <br />
    nextId: ${nextId}
    <br />
    nextImageUrl: ${nextImageUrl}
    <br />
    latestId: ${latestId}
  </div> `;
}
