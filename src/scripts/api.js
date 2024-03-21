const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-8",
  headers: {
    authorization: "6017ffdb-621e-4e57-b0de-7d3de0044eb2",
    "Content-Type": "application/json",
  },
};

function getResponseData(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

function request(url, options) {
  return fetch(url, options).then(getResponseData);
}

function setProfileInfoApi(name, about) {
  return request(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  });
}

function getProfileInfoApi() {
  return request(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  });
}

function getCardListApi() {
  return request(`${config.baseUrl}/cards`, {
    headers: config.headers,
  });
}

function cardCreateApi(name, link) {
  return request(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  });
}

function deleteCardApi(cardId) {
  return request(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
}

function likeCardApi(config, cardId) {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  });
}

function removeLikeCardApi(config, cardId) {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  });
}

function setProfileAvatar(url) {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: url,
    }),
  });
}

export {
  getProfileInfoApi,
  setProfileInfoApi,
  getCardListApi,
  cardCreateApi,
  deleteCardApi,
  likeCardApi,
  setProfileAvatar,
  removeLikeCardApi,
  config,
};
