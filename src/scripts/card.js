import { openPopup } from "./modal.js";
export function createCard(dataCard, deleteCard, handleLikeClick, openCard) {
  const popupImage = document.querySelector(".popup__image");
  const popupCaption = document.querySelector(".popup__caption");
  const imgPopup = document.querySelector(".popup_type_image");

  const card = cardTemplate.cloneNode(true);
  const cardTitle = card.querySelector(".card__title");
  const cardImg = card.querySelector(".card__image");
  const deleteButton = card.querySelector(".card__delete-button");

  function openCard(link, text) {
    popupImage.src = link;
    popupImage.alt = text;
    popupCaption.textContent = text;

    openPopup(imgPopup);
  }

  cardImg.src = card.link;
  cardImg.alt = card.name;
  cardTitle.textContent = card.name;

  // открытие карточки
  cardImg.addEventListener("click", () =>
    openCard(cardImg.src, cardTitle.textContent)
  );

  //лайк карточки
  card
    .querySelector(".card__like-button")
    .addEventListener("click", handleLikeClick);
  function handleLikeClick(evt) {
    evt.target
      .closest(".card__like-button")
      .classList.toggle("card__like-button_is-active");
  }

  cardTitle.textContent = dataCard.name;
  cardImg.setAttribute("src", dataCard.link);
  cardImg.setAttribute("alt", `Фото: ${dataCard.name}`);

  deleteButton.addEventListener("click", function () {
    deleteCard(card);
  });

  return card;
};

// удаление карточки
export function deleteCard(card) {
  card.remove();
};

// темплейт карточки
const cardTemplate = document
  .getElementById("card-template")
  .content.querySelector(".card");
