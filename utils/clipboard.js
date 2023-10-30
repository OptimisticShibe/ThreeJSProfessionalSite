window.onload = function () {
  return document.querySelectorAll(".clipboard").forEach((elem) => {
    const copyText = elem.getAttribute("copy-content");
    elem.addEventListener("click", () => {
      navigator.clipboard.writeText(copyText).then(() => {
        // Tooltip stuff
        elem.classList.add("tooltip");
        setTimeout(() => elem.classList.remove("tooltip"), 4000);
      });
    });
  });
};
