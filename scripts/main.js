(function () {
  "use strict";

  window.addEventListener("load", () => {
    on_page_load();
  });

  /**
   * Function gets called when page is loaded.
   */
  function on_page_load() {
    // Initialize On-scroll Animations
    AOS.init({
      anchorPlacement: "top-left",
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
      disable: "mobile",
    });
  }

  /**
   * Navbar effects and scrolltop buttons upon scrolling
   */
  const navbar = document.getElementById("header-nav");
  var body = document.getElementsByTagName("body")[0];
  const scrollTop = document.getElementById("scrolltop");
  window.onscroll = () => {
    if (window.scrollY > 0) {
      navbar.classList.add("fixed-top", "shadow-sm");
      body.style.paddingTop = navbar.offsetHeight + "px";
      scrollTop.style.visibility = "visible";
      scrollTop.style.opacity = 1;
    } else {
      navbar.classList.remove("fixed-top", "shadow-sm");
      body.style.paddingTop = "0px";
      scrollTop.style.visibility = "hidden";
      scrollTop.style.opacity = 0;
    }
  };

  /**
   * Masonry Grid (only when imagesLoaded & Masonry are loaded, e.g. on index.html)
   */
  var elem = document.querySelector(".grid");
  if (
    elem &&
    typeof imagesLoaded !== "undefined" &&
    typeof Masonry !== "undefined"
  ) {
    imagesLoaded(elem, function () {
      new Masonry(elem, {
        itemSelector: ".grid-item",
        percentPosition: true,
        horizontalOrder: true,
      });
    });
  }

  /**
   * Big Picture Popup for images and videos
   */
  document.querySelectorAll("[data-bigpicture]").forEach(function (e) {
    e.addEventListener("click", function (t) {
      t.preventDefault();
      const data = JSON.parse(e.dataset.bigpicture);
      BigPicture({
        el: t.target,
        ...data,
      });
    });
  });

  /**
   * Big Picture Popup for Photo Gallery (only when BigPicture is loaded)
   */
  if (typeof BigPicture !== "undefined") {
    document
      .querySelectorAll(".bp-gallery figure.portfolio-item")
      .forEach(function (figure) {
        var img = figure.querySelector("img");
        if (!img) return;
        var fullSrc = img.dataset.bp || img.src;
        img.dataset.caption = "";
        figure.style.cursor = "pointer";
        figure.addEventListener("click", function (t) {
          t.preventDefault();
          BigPicture({ el: img, imgSrc: fullSrc, gallery: ".bp-gallery" });
        });
      });
  }
})();
