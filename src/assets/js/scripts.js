// SCROLL TO TOP
var prevScrollpos = window.scrollY;

function handleNavbarVisibility() {
  if (window.innerWidth > 920) {
    document.getElementById("header").style.top = "0";
  }
}

window.onscroll = function () {
  if (window.innerWidth <= 920) {
    var currentScrollPos = window.scrollY;
    if (prevScrollpos > currentScrollPos || currentScrollPos <= 0) {
      document.getElementById("header").style.top = "0";
    } else {
      document.getElementById("header").style.top = "-70px";
    }
    prevScrollpos = currentScrollPos;
  }
};

window.onresize = handleNavbarVisibility;
// END OF SCROLL TO TOP

// MENU BUTTON
let menuActive = false;
const header = document.getElementById("header");
const checkbox = document.querySelector(".menu-button");
const checkboxLabel = document.querySelector(".sidebarIconToggle");
const menu = document.querySelector(".menu");
const links = menu.querySelectorAll("a");

checkbox.addEventListener("change", () => {
  menuActive = !menuActive;
  updateMenuState();
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    menuActive = false;
    updateMenuState();
  });
});

document.addEventListener("click", (event) => {
  if (
    !menu.contains(event.target) &&
    !checkbox.contains(event.target) &&
    !checkboxLabel.contains(event.target) &&
    !header.contains(event.target)
  ) {
    if (menuActive) {
      menuActive = false;
      updateMenuState();
    }
  }
});

function updateMenuState() {
  checkbox.checked = menuActive;
  if (menuActive) {
    menu.classList.add("active");
  } else {
    menu.classList.remove("active");
  }
}
// END OF MENU BUTTON

// SHARE LINK
const navigatorVariable = window.navigator;

const shareHandler = async (
  e,
  comicId,
  comicTitle,
  comicDescription,
  comicUrl
) => {
  e.preventDefault();
  if (comicUrl && comicUrl.slice(-1) !== "/") {
    comicUrl = comicUrl + "/";
  }
  try {
    console.log("comicUrl", comicUrl);
    await navigatorVariable.share({
      title: `${comicTitle} #${comicId}`,
      text: `${comicDescription}`,
      url: `${comicUrl}${comicId}`,
    });
  } catch (error) {
    console.error("Share failed:", error.message);
  }
};
// END OF SHARE LINK

// ZOOM
document.addEventListener("DOMContentLoaded", function () {
  const comicImageContainer = document.querySelector(
    ".comic-viewer-image-container"
  );
  const comicImage = comicImageContainer.querySelector(
    ".comic-viewer-image-container img"
  );
  console.log(comicImageContainer);
  console.log(comicImage);
  let isZoomed = false;

  if (comicImageContainer) {
    comicImageContainer.addEventListener("click", function (event) {
      isZoomed = !isZoomed;
      if (isZoomed) {
        comicImageContainer.classList.add("zoom-on");
        updateTransformOrigin(event);
      } else {
        comicImageContainer.classList.remove("zoom-on");
      }
    });

    comicImageContainer.addEventListener("mousemove", function (event) {
      if (isZoomed) {
        updateTransformOrigin(event);
      }
    });

    function sigmoid(x) {
      return 1 / (1 + Math.exp(-x));
    }

    function updateTransformOrigin(event) {
      const rect = comicImageContainer.getBoundingClientRect();
      const cursorX = (event.clientX - rect.left) / rect.width;
      const cursorY = (event.clientY - rect.top) / rect.height;

      // Apply sigmoid transformation
      const transformedX = sigmoid((cursorX - 0.5) * 20) * 100;
      const transformedY = sigmoid((cursorY - 0.5) * 20) * 100;

      comicImage.style.transformOrigin = `${transformedX}% ${transformedY}%`;
      console.log("cursorY", cursorY);
      console.log("transformedY", transformedY);
    }
  }
});
// END OF ZOOM
