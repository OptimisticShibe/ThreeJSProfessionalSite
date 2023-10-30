window.onload = () => {
  return document.querySelectorAll(".accordionBtn").forEach((elem) => {
    elem.addEventListener("click", (e) => {
      const activePanel = e.target.closest(".accordionPanel");
      if (!activePanel) return;
      toggleAccordion(activePanel);
    });
  });
};

// const accordion = document.querySelector(".accordionBtn");

function toggleAccordion(panelToActivate) {
  const activeButton = panelToActivate.querySelector("button");
  const activePanel = panelToActivate.querySelector(".accordionContent");
  const activePanelIsOpened = activeButton.getAttribute("aria-expanded");

  if (activePanelIsOpened === "true") {
    panelToActivate.querySelector("button").setAttribute("aria-expanded", false);

    panelToActivate.querySelector(".accordionContent").setAttribute("aria-hidden", true);
  } else {
    panelToActivate.querySelector("button").setAttribute("aria-expanded", true);

    panelToActivate.querySelector(".accordionContent").setAttribute("aria-hidden", false);
  }
}
