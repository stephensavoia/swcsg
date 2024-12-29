import responsiveImage from "./responsiveImage.js";
import { html } from "common-tags";

export default async function comicViewer({
  id,
  description,
  imageUrl,
  prevId,
  prevImageUrl,
  nextId,
  nextImageUrl,
  latestId,
  comicTitle,
  comicUrl,
  tipJarUrl,
}) {
  let navLinks;
  if (prevId && nextId) {
    navLinks = html` <div class="comic-viewer-nav-links">
      <div class="comic-viewer-left-links">
        <a class="comic-viewer-first-button" href="/c/001">&lt;&lt; First</a
        ><a class="comic-viewer-prev-button" href="/c/${prevId}"
          >&lt; Previous</a
        >
      </div>
      <div class="comic-viewer-right-links">
        <a class="comic-viewer-next-button" href="/c/${nextId}">Next &gt;</a
        ><a class="comic-viewer-latest-button" href="/c/${latestId}"
          >Latest &gt;&gt;</a
        >
      </div>
    </div>`;
  } else if (prevId) {
    navLinks = html` <div class="comic-viewer-nav-links">
      <div class="comic-viewer-left-links">
        <a href="/c/001">&lt;&lt; First</a
        ><a class="comic-viewer-prev-button" href="/c/${prevId}"
          >&lt; Previous</a
        >
      </div>
      <div class="comic-viewer-right-links">
        <span class="comic-viewer-hidden-link">Next &gt;</span
        ><span class="comic-viewer-hidden-link">Latest &gt;&gt;</span>
      </div>
    </div>`;
  } else {
    // nextId only
    navLinks = html` <div class="comic-viewer-nav-links">
      <div class="comic-viewer-left-links">
        <span class="comic-viewer-hidden-link">&lt;&lt; First</span
        ><span class="comic-viewer-hidden-link">&lt; Previous</span>
      </div>
      <div class="comic-viewer-right-links">
        <a class="comic-viewer-next-button" href="/c/${nextId}">Next &gt;</a
        ><a href="/c/${latestId}">Latest &gt;&gt;</a>
      </div>
    </div>`;
  }

  let preloadingPrevComic;
  if (prevImageUrl) {
    preloadingPrevComic = await responsiveImage(
      prevImageUrl,
      "preloading previous comic",
      "(min-width: 749px) 840px, 100vw"
    );
  } else {
    preloadingPrevComic = "";
  }

  let preloadingNextComic;
  if (nextImageUrl) {
    preloadingNextComic = await responsiveImage(
      nextImageUrl,
      "preloading next comic",
      "(min-width: 749px) 840px, 100vw"
    );
  } else {
    preloadingNextComic = "";
  }

  let currentComic = await responsiveImage(
    imageUrl,
    description,
    "(min-width: 749px) 840px, 100vw"
  );

  return html`
    <main>
      <div class="comic-viewer-container">
        <div class="comic-viewer-image-container">${currentComic}</div>
        ${navLinks}
        <div class="comic-viewer-ad-buttons">
          <a
            id="comic-viewer-tip-jar"
            href="${tipJarUrl}"
            class="comic-viewer-tip-jar"
            ><span>Tip Jar</span>
            <svg
              stroke-width="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              /></svg></a
          ><a
            id="comic-viewer-share-link"
            href="#"
            onclick="shareHandler(event, '${id}', '${comicTitle}', '${description.replace(
              /'/g,
              "\\'"
            )}', '${comicUrl}');"
            class="comic-viewer-share-link"
            ><span>Share</span
            ><svg
              stroke-width="1.75"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 22C19.6569 22 21 20.6569 21 19C21 17.3431 19.6569 16 18 16C16.3431 16 15 17.3431 15 19C15 20.6569 16.3431 22 18 22Z"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M18 8C19.6569 8 21 6.65685 21 5C21 3.34315 19.6569 2 18 2C16.3431 2 15 3.34315 15 5C15 6.65685 16.3431 8 18 8Z"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M6 15C7.65685 15 9 13.6569 9 12C9 10.3431 7.65685 9 6 9C4.34315 9 3 10.3431 3 12C3 13.6569 4.34315 15 6 15Z"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
              <path
                d="M15.5 6.5L8.5 10.5"
                stroke="currentColor"
                stroke-width="1.5"
              ></path>
              <path
                d="M8.5 13.5L15.5 17.5"
                stroke="currentColor"
                stroke-width="1.5"
              ></path>
            </svg>
          </a>
        </div>

        <div class="comic-viewer-description">
          <h2>${comicTitle} #${id}</h2>
          <p>${description}</p>
        </div>
        <div
          class="preloadingComics"
          style="visibility: hidden; position: absolute; top: 0"
        >
          ${preloadingPrevComic} ${preloadingNextComic}
        </div>
      </div>
    </main>
  `;
}
