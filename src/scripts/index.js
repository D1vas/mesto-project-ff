import "../pages/index.css";
// import { initialCards } from "./cards.js";
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
const imgPopup = document.querySelector(".popup_type_image");
const popupImage = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const profilePopup = document.querySelector(".popup_type_edit");

const profileEditBtn = document.querySelector(".profile__edit-button");
const profileAddBtn = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileImage = document.querySelector(".profile__image");

const newCardPopup = document.querySelector(".popup_type_new-card");
const formElementCardPopup = newCardPopup.querySelector(".popup__form");
const newCardName = formElementCardPopup.querySelector(
  ".popup__input_type_card-name"
);
const newCardLink = formElementCardPopup.querySelector(
  ".popup__input_type_url"
);
const cardContainer = document.querySelector(".places__list");

const closeBtns = document.querySelectorAll(".popup__close");
const saveButton = document.querySelector(".popup__button");
const deleteCardPopup = document.querySelector(".popup_type_delete-card");

const formProfile = document.forms["edit-profile"];
const profileNameInput = formProfile.elements.name;
const profileDescriptionInput = formProfile.elements.description;

const formDeleteCard = document.forms["delete-card"];
const formCard = document.forms["new-place"];
const cardNameInput = formCard.elements["place-name"];
const cardLinkInput = formCard.elements.link;

const formElementEditPopup = profilePopup.querySelector(".popup__form");
const nameInput = formElementEditPopup.querySelector(".popup__input_type_name");
const descriptionInput = formElementEditPopup.querySelector(
  ".popup__input_type_description"
);

let userId;

function initProfileFormValues() {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  setProfileInfoApi(nameInput.value, descriptionInput.value)
    .then((res) => {
      profileName.textContent = res.name;
      profileDescription.textContent = res.about;
      closePopup(profilePopup);
    })
    .catch((err) => console.log(`Не удалось изменить профиль. ${err}`))
    .finally(() => {
      saveButton.textContent = "Сохранить";
    });

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

  cardCreateApi(newCardName.value, newCardLink.value)
    .then((res) => {
      res.userId = userId;
      const card = createCard(res, deleteCard, openCard, handleLikeClick, handleOpenDeletePopup);
      cardContainer.prepend(card);
      closePopup(newCardPopup);
    })
    .catch((err) => console.log(`Не удалось добавить карточку. ${err}`))
    .finally(() => {
      saveButton.textContent = "Сохранить";
    });

  formCard.reset();
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

let currentCardId;
let currentCardElement;

function handleOpenDeletePopup(deleteCardPopup, cardId, cardElement) {
  currentCardId = cardId;
  currentCardElement = cardElement;
  openPopup(deleteCardPopup);
}

function changeBtnText(evt) {
  evt.target.querySelector(".button").innerText = "Сохранение...";
}

formDeleteCard.addEventListener("submit", (evt) =>
  deleteCardHandler(evt, currentCardId, currentCardElement)
);

function defaultBtnText(evt, text) {
  evt.target.querySelector('.button').innerText = text;
}

function deleteCardHandler(evt, currentCardId, currentCardElement) {
  changeBtnText(evt);
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

// берём данные профиля и карточки и добавляем на страницу

Promise.all([getProfileInfoApi(), getCardListApi()])
  .then((results) => {
    const userData = results[0];
    const cardsData = results[1];

    profileImage.style.backgroundImage = `url('${userData.avatar}')`;
    profileName.textContent = userData.name;
    profileDescription.textContent = userData.about;
    userId = userData["_id"];

    // Проверяем, существуют ли данные о карточках
    if (cardsData && Array.isArray(cardsData)) {
      cardsData.forEach((cardData) => {
        const card = createCard(
          cardData,
          deleteCard,
          openCard,
          handleLikeClick,
          userId
        );
        // Присоединяем кнопку удаления только к карточкам пользователя
        if (cardData.owner._id === userId) {
          const deleteButton = card.querySelector(".card__delete-button");
          deleteButton.addEventListener("click", () => {
            handleOpenDeletePopup(deleteCardPopup, cardData._id, card);
          });
        }
        cardContainer.append(card);
      });
    } else {
      console.log('Данные о карточках не были получены или пусты.');
    }
  })
  .catch((err) => {
    console.log('Произошла ошибка при загрузке данных о карточках:', err);
  });


// функция открытия карточки
function openCard(link, text) {
  popupImage.src = link;
  popupImage.alt = text;
  popupCaption.textContent = text;

  openPopup(imgPopup);
}

// вывод карточек
// initialCards.forEach(function (item) {
//   const card = createCard(item, deleteCard, openCard, handleLikeClick);
//   cardContainer.append(card);
// });

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
