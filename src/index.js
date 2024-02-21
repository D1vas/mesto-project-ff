    import './pages/index.css'; 
    import { initialCards } from './cards';

    // const popup = document.querySelector('.popup');
    // const profileEditBtn = document.querySelector('.profile__edit-button')
    // const profileAddBtn = document.querySelector('.profile__add-button');
    // const newCardPopup = document.querySelector('.popup_type_new-card');

    // const closeBtnNewCard = newCardPopup .querySelector('.popup__close');
    // const closeBtnProfile = document.querySelector('.popup__close');

    // const formProfile = document.forms['edit-profile'];
    // const profileNameInput = formProfile.elements.name;

    // const profileDescriptionInput = formProfile.elements.description;

    // const profileName = document.querySelector('.profile__title');
    // const profileDescription = document.querySelector('.profile__description');
    

    // profileEditBtn.addEventListener('click', () => {
    //     setFields()
    //     openPopup(popup);
    //   });

    // profileAddBtn.addEventListener('click', () => {
    //     openPopup(newCardPopup);

    //     card.addEventListener('submit', function(event) {
    //         event.preventDefault(); 
    //     })


    //   });



    // closeBtnProfile.addEventListener('click', () => closePopup(formProfile));
    // closeBtnNewCard.addEventListener('click', () => closePopup(newCardPopup));


    // function setFields() {
    //     profileNameInput.value = profileName.textContent;
    //     profileDescriptionInput.value = profileDescription.textContent;
    //   }

     
    // function handleFormSubmit(evt) {
    //     evt.preventDefault(); 

    //     const name = profileNameInput.value;
    //     const description = profileDescriptionInput.value;

    //     profileName.textContent = name;
    //     profileDescription.textContent = description;

    //     closePopup(popup) 
    //   }

    // formProfile.addEventListener('submit', handleFormSubmit);






    

    // document.addEventListener('DOMContentLoaded', function() {
    //     card.addEventListener('submit', function(event) {
    //       event.preventDefault(); // Предотвращаем перезагрузку страницы
      
    //       const title = card.querySelector('.card__title').value;
    //       const image= card.querySelector('.card__image').value;
      
    //       // Создаем новую карточку
    //       const card = createCard(title, image);
    //       // Вставляем ее в начало контейнера с карточками
    //       cardList.prepend(card);
          
    //       // Очищаем форму
    //       cardForm.reset();
    //       // Закрываем диалоговое окно
    //       closePopup(card)
    //     });
      
    //     // function createCard(title, image) {
    //     //   const card = document.createElement('div');
    //     //   card.classList.add('card');
    //     //   card.innerHTML = `
    //     //     <h3>${title}</h3>
    //     //     <p>${image}</p>
    //     //   `;
    //     //   return card;
    //     // }
    //   });










    // @todo: Темплейт карточки
   const cardTemplate = document.getElementById('card-template').content.querySelector('.card');
   // @todo: DOM узлы
       const cardList = document.querySelector('.places__list');
   // @todo: Функция создания карточки
       function createCard (dataCard, deleteCard) {
           const card = cardTemplate.cloneNode(true);
           const title = card.querySelector('.card__title');
           const image= card.querySelector('.card__image');
           const deleteButton = card.querySelector('.card__delete-button');

           title.textContent = dataCard.name;
           image.setAttribute('src', dataCard.link);
           image.setAttribute('alt', `Фото: ${dataCard.name}`);
           
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
       });
   