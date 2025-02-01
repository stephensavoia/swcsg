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

// ZOOM AND SWIPE TO NEXT/PREVIOUS COMIC
document.addEventListener("DOMContentLoaded", function () {
  const comicImageContainer = document.querySelector(
    ".comic-viewer-image-container"
  );
  const comicImage = comicImageContainer.querySelector(
    ".comic-viewer-image-container img"
  );

  // Zoom
  let isZoomed = false;
  let touchEvent = false;
  let lastTap = 0;
  let lastTapWasDouble = true;
  let tapTimeout;

  if (comicImageContainer) {
    // Zoom desktop
    comicImageContainer.addEventListener("click", function (event) {
      if (touchEvent) {
        touchEvent = false;
        return;
      }
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
    // End of zoom desktop

    // Zoom mobile
    comicImageContainer.addEventListener("touchstart", function (event) {
      touchEvent = true;
      lastTapWasDouble = !lastTapWasDouble;
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTap;
      clearTimeout(tapTimeout);
      if (tapLength < 500 && tapLength > 0 && lastTapWasDouble) {
        isZoomed = !isZoomed;
        if (isZoomed) {
          comicImageContainer.classList.add("zoom-on");
          updateTransformOrigin(event.touches[0]);
        } else {
          comicImageContainer.classList.remove("zoom-on");
        }
      }
      lastTap = currentTime;
      tapTimeout = setTimeout(() => {
        lastTapWasDouble = true;
      }, 500);
    });
    comicImageContainer.addEventListener("touchmove", function (event) {
      if (isZoomed) {
        event.preventDefault();
        updateTransformOrigin(event.touches[0]);
      }
    });
    // End of zoom mobile

    function sigmoid(x) {
      return 1 / (1 + Math.exp(-x));
    }

    function updateTransformOrigin(event) {
      const rect = comicImageContainer.getBoundingClientRect();
      const cursorX = (event.clientX - rect.left) / rect.width;
      const cursorY = (event.clientY - rect.top) / rect.height;

      const transformedX = sigmoid((cursorX - 0.5) * 20) * 100;
      const transformedY = sigmoid((cursorY - 0.5) * 20) * 100;

      comicImage.style.transformOrigin = `${transformedX}% ${transformedY}%`;
    }
  }
  // End of zoom

  // Swipe to next/previous comic
  let startX;
  let startY;
  let distX;
  let distY;
  let threshold = 100; // required min distance traveled to be considered swipe
  let allowedTime = 300; // maximum time allowed to travel that distance
  let elapsedTime;
  let startTime;

  comicImageContainer.addEventListener(
    "touchstart",
    function (e) {
      if (!comicImageContainer.classList.contains("zoom-on")) {
        let touchObj = e.changedTouches[0];
        startX = touchObj.pageX;
        startY = touchObj.pageY;
        startTime = new Date().getTime();
        // e.preventDefault();
      }
    },
    true
  );

  comicImageContainer.addEventListener(
    "touchend",
    function (e) {
      if (!comicImageContainer.classList.contains("zoom-on")) {
        let touchObj = e.changedTouches[0];
        distX = touchObj.pageX - startX;
        distY = touchObj.pageY - startY;
        elapsedTime = new Date().getTime() - startTime;
        if (elapsedTime <= allowedTime) {
          if (Math.abs(distX) >= threshold && Math.abs(distY) <= 100) {
            if (distX > 0) {
              document.querySelector(".comic-viewer-prev-button")?.click(); // right swipe
            } else {
              document.querySelector(".comic-viewer-next-button")?.click(); // left swipe
            }
          }
        }
        //        e.preventDefault();
      }
    },
    true
  );
  // End of swipe to next/previous comic
});
// END OF ZOOM AND SWIPE TO NEXT/PREVIOUS COMIC
