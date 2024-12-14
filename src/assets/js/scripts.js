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
  console.log("click checkbox");
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
    console.log(event.target);
    if (menuActive) {
      console.log("click outside");
      menuActive = false;
      updateMenuState();
    }
  }
});

function updateMenuState() {
  checkbox.checked = menuActive;
  console.log("menuActive:", menuActive);
  if (menuActive) {
    menu.classList.add("active");
  } else {
    menu.classList.remove("active");
  }
}
// END OF MENU BUTTON

// SHARE LINK
const navigatorVariable = window.navigator;

const shareHandler = async (e, comicId, comicDescription) => {
  console.log("shareHandler", comicId);
  e.preventDefault();
  try {
    await navigatorVariable.share({
      title: `Bright Red #${comicId}`,
      text: `${comicDescription}`,
      url: `https://www.willyandfroggy.com/BR/${comicId}`,
    });
  } catch (error) {
    console.error("Share failed:", error.message);
  }
};
// END OF SHARE LINK
