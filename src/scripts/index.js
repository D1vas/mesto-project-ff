import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCard, handleLikeClick } from "./card.js";
import {
  openPopup,
  closePopup,
  setCloseModalOnOverlayListeners,
} from "./modal.js";

const popups = document.querySelectorAll(".popup");
const imgPopup = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const profilePopup = document.querySelector(".popup_type_edit");

const profileEditBtn = document.querySelector(".profile__edit-button");
const profileAddBtn = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const newCardPopup = document.querySelector(".popup_type_new-card");
const cardContainer = document.querySelector(".places__list");

const closeBtns = document.querySelectorAll(".popup__close");

const formProfile = document.forms["edit-profile"];
const profileNameInput = formProfile.elements.name;
const profileDescriptionInput = formProfile.elements.description;

const formCard = document.forms["new-place"];
const cardNameInput = formCard.elements["place-name"];
const cardLinkInput = formCard.elements.link;

function initProfileFormValues() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  const name = profileNameInput.value;
  const description = profileDescriptionInput.value;

  profileName.textContent = name;
  profileDescription.textContent = description;

  closePopup(profilePopup);
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const cardData = {};
  cardData.name = cardNameInput.value;
  cardData.link = cardLinkInput.value;

  const card = createCard(cardData, deleteCard, openCard, handleLikeClick);
  cardContainer.prepend(card);

  closePopup(newCardPopup);
  formCard.reset();
}

// функция открытия карточки
function openCard(link, text) {
  popupImage.src = link;
  popupImage.alt = text;
  popupCaption.textContent = text;

  openPopup(imgPopup);
}

// вывод карточек
initialCards.forEach(function (item) {
  const card = createCard(item, deleteCard, openCard, handleLikeClick);
  cardContainer.append(card);
});

// функции открытия и заполнения полей

profileEditBtn.addEventListener("click", () => {
  initProfileFormValues();
  openPopup(profilePopup);
});

profileAddBtn.addEventListener("click", () => {
  openPopup(newCardPopup);
});

// кнопка закрытия

closeBtns.forEach(function (btn) {
  const popup = btn.closest(".popup");
  btn.addEventListener("click", function () {
    closePopup(popup);
  });
});

// закрытие по нажатаию на оверлей
popups.forEach((popup) => setCloseModalOnOverlayListeners(popup));

// обработчики

formProfile.addEventListener("submit", handleProfileFormSubmit);
formCard.addEventListener("submit", handleNewCardFormSubmit);
