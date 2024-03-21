import { likeCardApi, removeLikeCardApi, config } from "./api";

export function createCard(
  dataCard,
  deleteCardPopup,
  openCard,
  handleLikeClick,
  handleSubmitConfirmPopup
) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = cardElement.querySelector(".card__title");
  const cardImg = cardElement.querySelector(".card__image");
  const likeButton = cardElement.querySelector(".card__like-button");
  const likeCounter = cardElement.querySelector(".card__like-counter");

  cardTitle.textContent = dataCard.name;
  cardImg.src = dataCard.link;
  cardImg.alt = `Фото: ${dataCard.name}`;

  if (dataCard.likes) {
    likeCounter.textContent = dataCard.likes.length;
  } else {
    likeCounter.textContent = 0;
  }

  if (dataCard.likes && Array.isArray(dataCard.likes)) {
    dataCard.likes.forEach((userLike) => {
      if (hasUserLike(userLike["_id"], dataCard.userId)) {
        makeLiked(likeButton);
      }
    });
  }

  // лайк карточки
  likeButton.addEventListener("click", () => {
    handleLikeClick(likeButton, dataCard["_id"], likeCounter);
  });

  // открытие карточки
  cardImg.addEventListener("click", () =>
    openCard(dataCard.link, dataCard.name)
  );

  // удаление карточки если она не моя
  const deleteButton = cardElement.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    handleSubmitConfirmPopup(deleteCardPopup, dataCard["_id"], cardElement);
  });

  if (dataCard.owner["_id"] !== dataCard.userId) {
    deleteButton.classList.add("card__delete-button_hidden");
  } else {
    deleteButton.classList.remove("card__delete-button_hidden");
  }

  return cardElement;
}

// удаление карточки
export function deleteCard(item) {
  item.remove();
}

// лайк карточки
function makeLiked(likeElement) {
  likeElement.classList.toggle("card__like-button_is-active");
}

function hasUserLike(id, userId) {
  return id === userId;
}

function sendLikeRequest(hasLike, config, cardId) {
  return hasLike
    ? removeLikeCardApi(config, cardId)
    : likeCardApi(config, cardId);
}

function updateLikeAmount(likesCounter, likeAmount) {
  likesCounter.textContent = likeAmount;
}

export function handleLikeClick(likeElement, cardId, likesCounter) {
  const hasLike = likeElement.classList.contains("card__like-button_is-active");
  sendLikeRequest(hasLike, config, cardId)
    .then((cardData) => {
      const likeAmount = cardData.likes.length;
      updateLikeAmount(likesCounter, likeAmount);
      makeLiked(likeElement);
    })
    .catch((err) => {
      console.log(err);
    });
}
