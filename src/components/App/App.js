import "./App.css";
import { Routes, useLocation } from "react-router-dom";
import { Route } from "react-router-dom";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import { useCallback, useEffect, useState, useContext } from "react";
import ProtectedRoute from "./ProtectedRoute";
import { apiAuth } from "../../utils/Api.auth";
import { moviesApi } from "../../utils/MoviesApi";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useWindowSize } from "../../hooks/UseLayout";

import InfoToolTip from "../InfoToolTip/InfoToolTip";
function App(props) {
  const navigate = useNavigate();
  const size = useWindowSize();
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [userData, setUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [shortMovie, setShortMovie] = useState(false);
  const [successReg, setSuccessReg] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [initialMovies, setInitialMovies] = useState([]);
  const [searchFinished, setSearchFinished] = useState(false);
  const [notFound, setNotFound] = useState("");
  const [savedMovies, setSavedMovies] = useState([]);
  const sizeNew = size < 928 ? 5 : 12;
  const [amount, setAmount] = useState(sizeNew);
  const [stopMore, setStopMore] = useState(false);
  const location = useLocation();
  function handleAmount() {
    const count = Math.round(initialMovies.length / amount);
    if (initialMovies.length > amount) {
      const sizeNew = size < 928 ? 2 : 3;
      setAmount(amount + sizeNew);
    } else {
      setAmount(amount);
    }
    if (initialMovies.length <= amount) {
      setStopMore(true);
    }
  }
  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      // навешиваем только при открытии
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (location.pathname === "/movies") {
      localStorage.isShortFilm === "true"
        ? setShortMovie(true)
        : setShortMovie(false);
      if (localStorage.movies) {
        setInitialMovies(JSON.parse(localStorage.movies));
      }
    }
  }, [location.pathname]);

  function closeAllPopups() {
    setIsOpen(false);
  }
  function handleLogin() {
    setLoggedIn(true);
  }

  function signOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("movies");
    localStorage.removeItem("savedMovies");
    localStorage.clear();
    setLoggedIn(false);
    setSearchFinished(false);
    setCurrentUser({});
    setSavedMovies([]);
    navigate("/signin");
  }
  useEffect(() => {
    const jwt = localStorage.getItem("token");

    if (jwt) {
      apiAuth
        .checkToken(jwt)
        .then((res) => {
          setCurrentUser(res);
          setLoggedIn(true);
          navigate("/movies");
        })
        .catch((err) => console.log(err));
    }
  }, []);

  function handleUpdateAutharization(data) {
    setIsLoading(true);
    apiAuth
      .authorize(data.email, data.password)
      .then((res) => {
        localStorage.setItem("token", res.token);
        localStorage.setItem("email", res.email);
        const jwt = localStorage.getItem("token");

        if (jwt) {
          apiAuth
            .checkToken(jwt)
            .then((res) => {
              setCurrentUser(res);
              setLoggedIn(true);
              navigate("/movies");
            })
            .catch((err) => console.log(err));
        }
        setUserData({ password: res.password, email: res.email });
        handleLogin();
        navigate("/movies");
      })
      .catch((err) => setMessage(err))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateRegistration(data) {
    setIsLoading(true);
    apiAuth
      .register(data.name, data.email, data.password)
      .then((res) => {
        setIsOpen(true);
        setSuccessReg(true);
        localStorage.setItem("regName", res.name);
        localStorage.setItem("regEmail", res.email);
        navigate("/signin");
      })
      .catch((err) => {
        setMessage(err);
        setSuccessReg(false);
      })
      .finally(() => setIsLoading(false));
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    const jwt = localStorage.getItem("token");
    apiAuth
      .editProfile(jwt, data.name, data.email)
      .then((res) => {
        setCurrentUser({
          name: data.name,
          email: data.email,
        });
      })
      .catch((err) => setMessage(err))
      .finally((res) => {
        setIsLoading(false);
      });
  }

  const filterInfoByName = (data, value) => {
    if (!value) return [];

    return data.filter((movie) =>
      movie.nameRU.toLowerCase().includes(value.toLowerCase())
    );
  };

  const filterInfoByDuration = (data) => {
    return data.filter((movie) => movie.duration < 40);
  };

  function searchMovie(value) {
    setIsLoading(true);
    setSearchFinished(true);
    setInitialMovies([]);
    setAmount(sizeNew);
    setStopMore(false);
    moviesApi
      .getUserInfo()
      .then((res) => {
        localStorage.setItem("movies", JSON.stringify(res));
        const movies = JSON.parse(localStorage.getItem("movies"));
        movies.forEach((item) => {
          item.isLiked = false;
        });
        const filteredMovies = filterInfoByName(movies, value);

        if (shortMovie) {
          const shortMovies = filterInfoByDuration(filteredMovies);
          setSearchFinished(true);

          localStorage.setItem("shortMovie", true);
          localStorage.setItem("movies", JSON.stringify(shortMovies));
          setInitialMovies(shortMovies);
        } else {
          setSearchFinished(true);
          if (savedMovies.length > 0) {
            savedMovies.forEach((item) => {
              filteredMovies.forEach((movie) => {
                if (item.movieId === movie.id) movie.isLiked = true;
              });
            });
          }
          setShortMovie(false);
          setInitialMovies(filteredMovies);
          localStorage.setItem("movies", JSON.stringify(filteredMovies));
          localStorage.setItem("searchRequest", value);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function handleShortMovieCheckbox() {
    const movies = JSON.parse(localStorage.getItem("movies"));
    const filteredMovies = filterInfoByDuration(movies);
    localStorage.setItem("movies", JSON.stringify(filteredMovies));
    setInitialMovies(filteredMovies);
    if (!shortMovie) {
      setShortMovie(true);
    } else {
      setShortMovie(false);
    }
  }

  function deleteMovie(data) {
    apiAuth
      .deleteLike(data.id, localStorage.token)
      .then((data) => {
        const updatedMovies = savedMovies.filter(
          (item) => item.movieId !== data.movieId
        );

        setSavedMovies(updatedMovies);
        initialMovies.forEach((movie) => {
          if (movie.id === data.movieId) {
            movie.isLiked = false;
          }
        });
        setInitialMovies([...initialMovies]);
        localStorage.setItem("movies", JSON.stringify(initialMovies));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleMovieLikeToggle(data) {
    const movies = JSON.parse(localStorage.getItem("movies"));
    if (!data.isLiked) {
      apiAuth
        .addLike(data, localStorage.token)
        .then((data) => {
          movies.forEach((item) => {
            if (data.movieId === item.id) {
              item.isLiked = true;
              data.isLiked = true;
            }
          });
          localStorage.setItem("movies", JSON.stringify(movies));

          setInitialMovies([...movies]);

          setSavedMovies([...savedMovies, data]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const selectedMovie = savedMovies.find(
        (item) => data.movieId === item.movieId
      );

      apiAuth
        .deleteLike(selectedMovie._id, localStorage.token)
        .then((data) => {
          const updatedMovies = savedMovies.filter(
            (item) => item.movieId !== data.movieId
          );

          setSavedMovies(updatedMovies);
          movies.forEach((movie) => {
            if (movie.id === data.movieId) {
              movie.isLiked = false;
            }
          });
          setInitialMovies([...movies]);
          localStorage.setItem("movies", JSON.stringify(movies));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        <div className="app__container">
          <Routes>
            <Route exact path="/" element={<Main loggedIn={loggedIn} />} />
            <Route
              path="/signin"
              element={
                <Login
                  handleLogin={handleLogin}
                  handleUpdateAutharization={handleUpdateAutharization}
                  message={message}
                  isLoading={isLoading}
                />
              }
            />
            <Route
              path="/signup"
              element={
                <Register
                  handleUpdateRegistration={handleUpdateRegistration}
                  message={message}
                  isLoading={isLoading}
                />
              }
            />
            <Route
              path="/movies"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Movies
                    initialMovies={initialMovies}
                    searchMovie={searchMovie}
                    searchFinished={searchFinished}
                    shortMovie={shortMovie}
                    savedMovies={savedMovies}
                    handleShortMovieCheckbox={handleShortMovieCheckbox}
                    notFound={notFound}
                    handleMovieLikeToggle={handleMovieLikeToggle}
                    handleAmount={handleAmount}
                    amount={amount}
                    stopMore={stopMore}
                    isLoading={isLoading}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <SavedMovies
                    initialMovies={initialMovies}
                    searchMovie={searchMovie}
                    searchFinished={searchFinished}
                    shortMovie={shortMovie}
                    savedMovies={savedMovies}
                    handleShortMovieCheckbox={handleShortMovieCheckbox}
                    notFound={notFound}
                    handleMovieLikeToggle={handleMovieLikeToggle}
                    deleteMovie={deleteMovie}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute loggedIn={loggedIn}>
                  <Profile
                    signOut={signOut}
                    currentUser={currentUser}
                    handleUpdateUser={handleUpdateUser}
                    isLoading={isLoading}
                    message={message}
                  />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <InfoToolTip
            successReg={successReg}
            isOpen={isOpen}
            onClose={closeAllPopups}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
