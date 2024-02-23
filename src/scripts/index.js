import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCard } from "./card.js";
import { openPopup, closePopup } from "./modal.js";

const popup = document.querySelector(".popup");
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

const closeBtnNewCard = newCardPopup.querySelector(".popup__close");
const closeBtnProfile = profilePopup.querySelector(".popup__close");
const closeBtnImage = imgPopup.querySelector(".popup__close");

const formProfile = document.forms["edit-profile"];
const profileNameInput = formProfile.elements.name;
const profileDescriptionInput = formProfile.elements.description;

const formCard = document.forms["new-place"];
const cardNameInput = formCard.elements["place-name"];
const cardLinkInput = formCard.elements.link;

// кнопки закрытия

closeBtnProfile.addEventListener("click", () => closePopup(profilePopup));
closeBtnNewCard.addEventListener("click", () => closePopup(newCardPopup));
closeBtnImage.addEventListener("click", () => closePopup(imgPopup));

// функции открытия и заполнения полей

profileEditBtn.addEventListener("click", () => {
  setFields();
  openPopup(popup);
});

profileAddBtn.addEventListener("click", () => {
  openPopup(newCardPopup);
  addEventListener("submit", function (event) {
    event.preventDefault();
  });
});

function setFields() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
};

function handleFormSubmit(evt) {
  evt.preventDefault();

  const name = profileNameInput.value;
  const description = profileDescriptionInput.value;

  profileName.textContent = name;
  profileDescription.textContent = description;

  closePopup(popup);
};

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const obj = {};
  obj.name = cardNameInput.value;
  obj.link = cardLinkInput.value;

  const card = createCard(obj, deleteCard, openCard);
  cardContainer.prepend(card);

  closePopup(newCardPopup);
};

function openCard(link, text) {
  popupImage.src = link;
  popupImage.alt = text;
  popupCaption.textContent = text;

  openPopup(imgPopup);
};

formProfile.addEventListener("submit", handleFormSubmit);
formCard.addEventListener("submit", handleNewCardFormSubmit);

// анимация плавности
const popups = document.querySelectorAll(".popup");
popups.forEach(function (item) {
  item.classList.add("popup_is-animated");
});

// вывод карточек
initialCards.forEach(function (item) {
  const card = createCard(item, deleteCard);
  cardContainer.append(card);
});
