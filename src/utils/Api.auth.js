export class ApiAuth {
  constructor(settings) {
    this._address = settings.baseUrl;
  }
  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  register(name, email, password) {
    return fetch(`${this._address}/signup`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        password,
        email,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  // отправляем запрос на роут аутентификации
  authorize(email, password) {
    return fetch(`${this._address}/signin`, {
      method: "POST",
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password,
        email,
      }),
    })
      .then((res) => this._getResponseData(res))
      .then((data) => {
        // сохраняем токен
          localStorage.setItem("token", data.token);
          return {token: data.token,
        password: password,
    email:email};
      });
  }
  checkToken = async (token) => {
    const res = await fetch(`${this._address}/users/me`, {
        method: "GET",
        credentials: 'include',
        headers: {
            "Accept": 'application/json',
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        }
      });
      return this._getResponseData(res);
  }
  getUserInfo(token) {
    return fetch(`${this._address}/users/me `, {
      method: "GET",
      credentials: 'include',
      headers: {
        "Accept": 'application/json',
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    }
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
  getSavedMovies(token) {
    return fetch(`${this._address}/movies `, {
      method: "GET",
      credentials: 'include',
      headers: {
        "Accept": 'application/json',
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    }
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  editProfile(token, newName, newEmail) {
    return fetch(`${this._address}/users/me`, {
      method: "PATCH",
      credentials: 'include',
      headers: {
        "Accept": 'application/json',
      "Content-Type": "application/json",
      'Authorization': `Bearer ${token}`
    },
      body: JSON.stringify({
        name: newName,
        email: newEmail,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  addLike(data, token) {
    return fetch(`${this._address}/movies`, {
      method: "POST",
      credentials: 'include',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        country: data.country,
        director: data.director,
        duration: data.duration,
        year: data.year,
        description: data.description,
        image: data.image,
        trailerLink: data.trailerLink,
        thumbnail: data.thumbnail,
        nameRU: data.nameRU,
        nameEN: data.nameEN,
        movieId: data.movieId,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  deleteLike(id, token) {
    return fetch(`${this._address}/movies/${id}`, {
      method: "DELETE",
      credentials: 'include',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        movieId: id,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }


}

const apiAuth = new ApiAuth({
  baseUrl: "https://diplomagud.nomoredomains.rocks",
});

export { apiAuth };
