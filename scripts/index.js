// @todo: Темплейт карточки
   const cardTemplate = document.getElementById('card-template').content.querySelector('.card');
// @todo: DOM узлы
    const cardList = document.querySelector('.places__list');
// @todo: Функция создания карточки
    function createCard (dataCard, delCard) {
        const card = cardTemplate.cloneNode(true);
        const title = card.querySelector('.card__title');
        const image= card.querySelector('.card__image');
        const deleteButton = card.querySelector('.card__delete-button');

        title.textContent = dataCard.name;
        image.setAttribute('src', dataCard.link);
        
        deleteButton.addEventListener('click', function () {
            deleteCard(card);
        });

        return card;
    }
// @todo: Функция удаления карточки
    function deleteCard (card) {
        card.remove();
    }
// @todo: Вывести карточки на страницу
    initialCards.forEach(function(card) {
        cardList.append(createCard(card, deleteCard))
    })