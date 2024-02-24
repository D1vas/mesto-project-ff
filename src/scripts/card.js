import { openCard } from "./index";
export function createCard(dataCard, deleteCard) {
  // const popupImage = document.querySelector(".popup__image");
  // const popupCaption = document.querySelector(".popup__caption");
  // const imgPopup = document.querySelector(".popup_type_image");

  const cardTemplate = document.querySelector('#card-template').content;
  const card = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = card.querySelector(".card__title");
  const cardImg = card.querySelector(".card__image");
  const deleteButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector('.card__like-button');


  cardImg.src = card.link;
  cardImg.alt = card.name;
  cardTitle.textContent = card.name;

  // открытие карточки
  cardImg.addEventListener("click", () => openCard(cardImg.src, cardTitle.textContent));
 
  // лайк карточки
likeButton.addEventListener('click', () => handleLikeClick(likeButton));

 

  cardTitle.textContent = dataCard.name;
  cardImg.src = dataCard.link;
  cardImg.alt = `Фото: ${dataCard.name}`;

  deleteButton.addEventListener("click", function () {
    deleteCard(card);
  });

  return card;
};

  // удаление карточки
export function deleteCard(card) {
  card.remove();
};

  //лайк карточки
function handleLikeClick(likeElement) {
  likeElement.classList.toggle('card__like-button_is-active');
}

