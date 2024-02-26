export function createCard(dataCard, deleteCard, openCard, handleLikeClick) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardTitle = card.querySelector(".card__title");
  const cardImg = card.querySelector(".card__image");
  const deleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");

  cardTitle.textContent = dataCard.name;
  cardImg.src = dataCard.link;
  cardImg.alt = `Фото: ${dataCard.name}`;

  // открытие карточки
  cardImg.addEventListener("click", () =>
    openCard(dataCard.link, dataCard.name)
  );

  // лайк карточки
  likeButton.addEventListener("click", () => handleLikeClick(likeButton));

  // удаление карточки
  deleteButton.addEventListener("click", () => deleteCard(card));

  return card;
}

// удаление карточки
export function deleteCard(card) {
  card.remove();
}

// лайк карточки
export function handleLikeClick(likeElement) {
  likeElement.classList.toggle("card__like-button_is-active");
}
