export default document.querySelectorAll(".smoothScroll").forEach((elem) => {
  const scrollId = elem.getAttribute("scroll-id");
  elem.addEventListener("click", () => {
    document.getElementById(scrollId).scrollIntoView();
  });
});
