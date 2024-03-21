import "../pages/index.css";
import { createCard, deleteCard, handleLikeClick } from "./card.js";
import { enableValidation, clearValidation } from "./validation.js";
import {
  openPopup,
  closePopup,
  setCloseModalOnOverlayListeners,
} from "./modal.js";
import {
  getProfileInfoApi,
  setProfileInfoApi,
  getCardListApi,
  cardCreateApi,
  deleteCardApi,
  setProfileAvatar,
} from "./api.js";

const popups = document.querySelectorAll(".popup");
const popupImage = document.querySelector(".popup__image");
const imgPopup = document.querySelector(".popup_type_image");
const popupCaption = document.querySelector(".popup__caption");
const profilePopup = document.querySelector(".popup_type_edit");
const avatarPopup = document.querySelector(".popup_type_avatar");
const newCardPopup = document.querySelector(".popup_type_new-card");

const profileName = document.querySelector(".profile__title");
const profileImage = document.querySelector(".profile__image");
const profileAddBtn = document.querySelector(".profile__add-button");
const profileEditBtn = document.querySelector(".profile__edit-button");
const profileDescription = document.querySelector(".profile__description");

const formElementCardPopup = newCardPopup.querySelector(".popup__form");
const newCardName = formElementCardPopup.querySelector(
  ".popup__input_type_card-name"
);
const newCardLink = formElementCardPopup.querySelector(
  ".popup__input_type_url"
);

const closeBtns = document.querySelectorAll(".popup__close");
const cardContainer = document.querySelector(".places__list");
const deleteCardPopup = document.querySelector(".popup_type_delete-card");

const formCard = document.forms["new-place"];
const formAvatar = document.forms["edit-avatar"];
const formProfile = document.forms["edit-profile"];
const formDeleteCard = document.forms["delete-card"];
const cardNameInput = formCard.elements["place-name"];

const cardLinkInput = formCard.elements.link;
const avatarLinkInput = formAvatar.elements.link;

const profileNameInput = formProfile.elements.name;
const profileDescriptionInput = formProfile.elements.description;

const formElementEditPopup = profilePopup.querySelector(".popup__form");
const nameInput = formElementEditPopup.querySelector(".popup__input_type_name");
const descriptionInput = formElementEditPopup.querySelector(
  ".popup__input_type_description"
);

let userId;

// изменение имени профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  savingButton(evt);

  const name = profileNameInput.value;
  const description = profileDescriptionInput.value;

  setProfileInfoApi(nameInput.value, descriptionInput.value)
    .then(() => {
      profileName.textContent = name;
      profileDescription.textContent = description;
      closePopup(profilePopup);
    })
    .catch((err) => console.log(`Не удалось изменить профиль. ${err}`))
    .finally(() => {
      setTimeout(() => defaultBtnText(evt, "Сохранить"), 600, evt);
    });
}

// изменение аватара профиля
function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  savingButton(evt);

  const url = avatarLinkInput.value;
  setProfileAvatar(url)
    .then((res) => {
      profileImage.style.backgroundImage = `url('${res.avatar}')`;
      closePopup(avatarPopup);
    })
    .finally(() => {
      setTimeout(() => defaultBtnText(evt, "Сохранить"), 600, evt);
    })
    .catch((err) => {
      console.log(err);
    });
  formAvatar.reset();
}

// добавление карточки
function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  savingButton(evt);

  const cardData = {};
  cardData.name = cardNameInput.value;
  cardData.link = cardLinkInput.value;

  cardCreateApi(newCardName.value, newCardLink.value)
    .then((res) => {
      res.userId = userId;
      const card = createCard(
        res,
        deleteCardPopup,
        openCard,
        handleLikeClick,
        handleSubmitConfirmPopup
      );
      cardContainer.prepend(card);
      closePopup(newCardPopup);
    })
    .catch((err) => console.log(`Не удалось добавить карточку. ${err}`))
    .finally(() => {
      setTimeout(() => defaultBtnText(evt, "Сохранить"), 600, evt);
    });
}

// удаление карточки
function deleteCardHandler(evt, currentCardId, currentCardElement) {
  savingButton(evt);
  deleteCardApi(currentCardId)
    .then(() => {
      deleteCard(currentCardElement);
      closePopup(deleteCardPopup);
    })
    .finally(() => {
      setTimeout(() => defaultBtnText(evt, "Да"), 600, evt);
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleSubmitConfirmPopup(deleteCardPopup, cardId, cardElement) {
  currentCardId = cardId;
  currentCardElement = cardElement;
  openPopup(deleteCardPopup);
}

// валидация форм
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);

let currentCardId;
let currentCardElement;

// кнопка сохранение...
function defaultBtnText(evt, text) {
  evt.target.querySelector(".button").innerText = text;
}

function savingButton(evt) {
  evt.target.querySelector(".button").innerText = "Сохранение...";
}

// добавление данных профиля и карточки на страницу
Promise.all([getProfileInfoApi(), getCardListApi()])
  .then((results) => {
    const userData = results[0];
    const cardsData = results[1];

    profileImage.style.backgroundImage = `url('${userData.avatar}')`;
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    userId = userData["_id"];

    if (cardsData && Array.isArray(cardsData)) {
      cardsData.forEach((cardData) => {
        cardData.userId = userId;
        const card = createCard(
          cardData,
          deleteCardPopup,
          openCard,
          handleLikeClick,
          handleSubmitConfirmPopup
        );
        cardContainer.append(card);
      });
    } else {
      console.log("Данные о карточках не были получены или пусты.");
    }
  })
  .catch((err) => {
    console.log("Произошла ошибка при загрузке данных о карточках:", err);
  });

// функция открытия карточки
function openCard(link, text) {
  popupImage.src = link;
  popupImage.alt = text;
  popupCaption.textContent = text;

  openPopup(imgPopup);
}

// функции открытия и заполнения полей

profileEditBtn.addEventListener("click", () => {
  clearValidation(formElementEditPopup, validationConfig);
  openPopup(profilePopup);
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
});

profileAddBtn.addEventListener("click", () => {
  clearValidation(formElementCardPopup, validationConfig);
  openPopup(newCardPopup);
});

profileImage.addEventListener("click", () => {
  clearValidation(formElementCardPopup, validationConfig);
  openPopup(avatarPopup);
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
formAvatar.addEventListener("submit", handleAvatarFormSubmit);
formDeleteCard.addEventListener("submit", (evt) =>
  deleteCardHandler(evt, currentCardId, currentCardElement)
);
