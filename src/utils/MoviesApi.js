export class MoviesApi {
  constructor(settings) {
    this._address = settings.baseUrl;
  }
  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }
  getUserInfo() {
    return fetch(`${this._address}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      return this._getResponseData(res);
    });
  }
}

const moviesApi = new MoviesApi({
  baseUrl: " https://api.nomoreparties.co/beatfilm-movies",
});

export { moviesApi };
