const hideScrollToTop = () => {
  const main = document.getElementById("main");
  const button = document.getElementById("topScrollWrapper");
  return main.scrollTop > 100 ? (button.style.visibility = "visible") : (button.style.visibility = "hidden");
};
export default document.getElementById("main").addEventListener("scroll", hideScrollToTop);
