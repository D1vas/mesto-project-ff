(()=>{"use strict";function e(e,t,n,r){var o=document.querySelector("#card-template").content.querySelector(".card").cloneNode(!0),c=o.querySelector(".card__title"),i=o.querySelector(".card__image"),u=o.querySelector(".card__delete-button"),a=o.querySelector(".card__like-button");return c.textContent=e.name,i.src=e.link,i.alt="Фото: ".concat(e.name),i.addEventListener("click",(function(){return n(e.link,e.name)})),a.addEventListener("click",(function(){return r(a)})),u.addEventListener("click",(function(){return t(o)})),o}function t(e){e.remove()}function n(e){e.classList.toggle("card__like-button_is-active")}var r=function(e,t,n){e.disabled=!0,e.classList.add(n,t)},o=function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""};function c(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):r(t,n.inactiveButtonClass)}var i=function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),c=e.querySelector(t.submitButtonSelector);n.forEach((function(n){n.value="",o(e,n,t.inactiveButtonClass)})),r(c,t.inactiveButtonClass)};function u(e){e.classList.add("popup_is-opened"),document.addEventListener("keydown",s)}function a(e){e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",s)}function s(e){"Escape"===e.key&&a(document.querySelector(".popup_is-opened"))}function l(e){e.target.classList.contains("popup")&&a(e.target)}var p=document.querySelectorAll(".popup"),d=document.querySelector(".popup_type_image"),m=document.querySelector(".popup__image"),v=document.querySelector(".popup__caption"),f=document.querySelector(".popup_type_edit"),_=document.querySelector(".profile__edit-button"),y=document.querySelector(".profile__add-button"),S=document.querySelector(".profile__title"),k=document.querySelector(".profile__description"),q=document.querySelector(".popup_type_new-card"),E=document.querySelector(".places__list"),L=document.querySelectorAll(".popup__close"),C=document.forms["edit-profile"],b=C.elements.name,h=C.elements.description,g=document.forms["new-place"],x=g.elements["place-name"],B=g.elements.link,A=f.querySelector(".popup__form"),j=A.querySelector(".popup__input_type_name"),w=A.querySelector(".popup__input_type_description"),D=q.querySelector(".popup__form"),M={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function V(e,t){m.src=e,m.alt=t,v.textContent=t,u(d)}!function(e){document.querySelectorAll(e.formSelector).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);c(n,r,t),n.forEach((function(i){i.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?o(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.textContent=n,o.classList.add(r.errorClass)}(e,t,t.validationMessage,n)}(e,i,t),c(n,r,t)}))}))}(t,e)}))}(M),_.addEventListener("click",(function(){i(A,M),u(f),j.value=S.textContent,w.value=k.textContent})),y.addEventListener("click",(function(){i(D,M),u(q)})),[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].forEach((function(r){var o=e(r,t,V,n);E.append(o)})),_.addEventListener("click",(function(){b.value=S.textContent,h.value=k.textContent,u(f)})),y.addEventListener("click",(function(){u(q)})),L.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){a(t)}))})),p.forEach((function(e){return function(e){e.addEventListener("click",l)}(e)})),C.addEventListener("submit",(function(e){e.preventDefault();var t=b.value,n=h.value;S.textContent=t,k.textContent=n,a(f)})),g.addEventListener("submit",(function(r){r.preventDefault();var o={};o.name=x.value,o.link=B.value;var c=e(o,t,V,n);E.prepend(c),a(q),g.reset()}))})();