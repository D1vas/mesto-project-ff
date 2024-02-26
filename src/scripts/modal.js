export function openPopup(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeWithEsc);
}

export function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeWithEsc);
}

// закрытие по нажатию на Esc

function closeWithEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}

// закрытие по нажатию на оверлей

export function setCloseModalOnOverlayListeners(popup) {
  popup.addEventListener("click", closeWithOverlay);
}

function closeWithOverlay(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}
