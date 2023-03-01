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
  const [shortSavedMovie, setShortSavedMovie] = useState(false);
  const [successReg, setSuccessReg] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [initialMovies, setInitialMovies] = useState([]);
  const [searchFinished, setSearchFinished] = useState(false);
  const [savedSearchFinished, setSavedSearchFinished] = useState(false);
  const [notFound, setNotFound] = useState("");
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedMoviesSearchResult, setSavedMoviesSearchResult] = useState([]);
  const sizeNew = size < 928 ? 5 : 12;
  const [amount, setAmount] = useState(sizeNew);
  const [stopMore, setStopMore] = useState(false);
  const [searchValue,setSearchValue] = useState(""); 
  const [savedSearchValue,setSavedSearchValue] = useState(""); 
  const [successMessage, setSuccessMessage] = useState("");
  const [isSame, setIsSame] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();
  function handleAmount(size) {
    /*const count = Math.round(initialMovies.length / amount);*/
    console.log(size)
    const count = initialMovies.length + amount;
    if (initialMovies.length > amount) {
      const sizeNew = size < 928 ? 2 : 3;
      setAmount(amount + sizeNew);
    } else {
      setAmount(amount);
    }
    if (initialMovies.length <= amount) {
      setStopMore(true);
    }
    console.log(initialMovies.length, amount)
    if (initialMovies.length === amount) {
      setStopMore(false);
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

useEffect(()=>{
  setMessage('');
  setSuccessMessage('')
}, [location.path])

  function mountSearchResult(size) {
    if (location.pathname === "/movies") {
      setAmount(size<928?5:12);
      localStorage.shortMovie === "true"
        ? setShortMovie(true)
        : setShortMovie(false);
      if (localStorage.movies) {
        setIsVisible(true)
        const movies = JSON.parse(localStorage.movies);
        setInitialMovies(movies);
        console.log(movies, initialMovies)
      }
      console.log(location.pathname === "/movies", shortMovie, initialMovies);
      
    }
  }

  function mountSavedSearchResult() {
    if (location.pathname === "/saved-movies") {
      localStorage.shortSavedMovie === "true"
        ? setShortSavedMovie(true)
        : setShortSavedMovie(false);
      console.log(
        location.pathname === "/saved-movies",
        shortSavedMovie,
        savedMovies
      );
      console.log(location.key);
    }
  }

  useEffect(() => {
    console.log(size);
    console.log(amount);
    if (location.pathname === "/movies") {
      localStorage.shortMovie === "true"
        ? setShortMovie(true)
        : setShortMovie(false);
    loadSavedMovies();
    setSearchValue(localStorage.searchRequest);}
  }, [location.pathname]);

  function closeAllPopups() {
    setIsOpen(false);
  }
  function handleLogin() {
    setLoggedIn(true);
    localStorage.setItem("loggedIn",loggedIn);
    console.log(localStorage.loggedIn)
  }

  function signOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("movies");
    localStorage.removeItem("savedMovies");
    localStorage.removeItem("loggedIn");
    localStorage.clear();
    setLoggedIn(false);
    setSearchFinished(false);
    setSuccessMessage("");
    setMessage("");
    setCurrentUser({});
    setSavedMovies([]);
    setInitialMovies([]);
    setIsSame(false);
    setSearchValue("");
    setSavedSearchValue("");
    setShortMovie(false);
    setShortSavedMovie(false);
    setIsVisible(false);

  }

  function loadSavedMovies() {
    const token = localStorage.getItem("token");

    setShortSavedMovie(false);
    setSavedSearchFinished(false);

    if (token) {
      apiAuth
        .getSavedMovies(token)
        .then((data) => {
          console.log(data, "loadsaved");
          setSavedMovies(data);
          setSavedMoviesSearchResult(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    
    if (jwt) {
      apiAuth
        .checkToken(jwt)
        .then((res) => {
          setCurrentUser(res);
          setLoggedIn(true);
          localStorage.setItem('userName', res.name);
          localStorage.setItem('userEmail', res.email);
          setMessage('')
        })
        .catch((err) => console.log(err));
        
    }
  }, []);

  function handleUpdateAutharization(data) {
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
        loadSavedMovies();

        setUserData({ password: res.password, email: res.email });
        handleLogin();
        navigate("/movies");
      })
      .catch((err) => setMessage(err))
  }

  function handleUpdateRegistration(data) {
    setIsLoading(true);
    apiAuth
      .register(data.name, data.email, data.password)
      .then((res) => {
        setIsOpen(true);
        setSuccessReg(true);
        handleUpdateAutharization(data);
        localStorage.setItem("regName", res.name);
        localStorage.setItem("regEmail", res.email);
        setCurrentUser(data);
        navigate("/movies");
      })
      .catch((err) => {
        setMessage(err);
        setSuccessReg(false);
        navigate("/signup");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    const jwt = localStorage.getItem("token");
    if (data.name === currentUser.name && data.email === currentUser.email) {
      setIsSame("true");
    }
    apiAuth
      .editProfile(jwt, data.name, data.email)
      .then((res) => {
        setCurrentUser({
          name: data.name,
          email: data.email,
        });
        setSuccessMessage("данные успешно изменены");
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
    setIsVisible(true);
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
          localStorage.setItem("searchRequest", value);
          setSearchValue(localStorage.searchRequest)
          console.log(localStorage.searchRequest)
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
          localStorage.setItem("shortMovie", false);
          localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
          setSearchValue(localStorage.searchRequest)
          console.log(localStorage.searchRequest, searchValue)
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  function searchSavedMovie(value) {
    setIsLoading(true);
    setSearchFinished(true);
    setAmount(sizeNew);
    const token = localStorage.getItem("token");
    if (token) {
      apiAuth
        .getSavedMovies(token)
        .then((data) => {
          console.log(data, "loadsaved");
          setSavedMovies(data);
          setSavedMoviesSearchResult(data);
          const filteredMovies = filterInfoByName(savedMovies, value);

          if (shortSavedMovie) {
            const shortSavedMovies = filterInfoByDuration(filteredMovies);
            setSavedSearchFinished(true);
      
            localStorage.setItem("shortSavedMovie", true);
            localStorage.setItem("savedMovies", filteredMovies);
            setSavedMovies(shortSavedMovies);
            localStorage.setItem("searchSavedRequest", value);
            setSavedSearchValue(localStorage.searchSavedRequest);
          } else {
            setSavedSearchFinished(true);
            setSavedMovies(filteredMovies);
            setIsLoading(false);
            localStorage.setItem("savedMovies", filteredMovies);
            localStorage.setItem("searchSavedRequest", value);
            localStorage.setItem("shortSavedMovie", false);
            setSavedSearchValue(localStorage.searchSavedRequest);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    
  }

  function handleShortMovieCheckbox() {
    const movies = JSON.parse(localStorage.getItem("movies"));
    const filteredMovies = filterInfoByDuration(movies);
    localStorage.setItem("movies", JSON.stringify(filteredMovies));
    setInitialMovies(filteredMovies);
    if (!shortMovie) {
      setShortMovie(true);
      localStorage.setItem("shortMovie", true);
      console.log(localStorage);
    } else {
      setShortMovie(false);
      localStorage.setItem("shortMovie", false);
      console.log(localStorage);
    }
  }

  function handleShortSavedMovieCheckbox() {
    const filteredMovies = filterInfoByDuration(savedMovies);
    localStorage.setItem("savedMovies", filteredMovies);
    setSavedMovies(filteredMovies);
    setSavedMoviesSearchResult(filteredMovies)
    if (!shortSavedMovie) {
      setShortSavedMovie(true);
      localStorage.setItem("shortSavedMovie", true);
      console.log(shortSavedMovie);
    } else {
      setShortSavedMovie(false);
      localStorage.setItem("shortSavedMovie", false);
      console.log(shortSavedMovie);
    }
  }

  function deleteMovie(data) {
    apiAuth
      .deleteLike(data.id, localStorage.token)
      .then((data) => {
        const updatedMovies = savedMovies.filter(
          (item) => item.movieId !== data.movieId
        );


        localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
        setSavedMovies(updatedMovies);
        setSavedMoviesSearchResult(updatedMovies)
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
          console.log(data);
          localStorage.setItem("movies", JSON.stringify(movies));
          console.log(savedMovies);
          setInitialMovies([...movies]);
          setSavedMovies([...savedMovies, data]);
          console.log(savedMovies);
          localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
          console.log(localStorage.savedMovies);
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
          localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
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
                    setSearchFinished={setSearchFinished}
                    shortMovie={shortMovie}
                    savedMovies={savedMovies}
                    handleShortMovieCheckbox={handleShortMovieCheckbox}
                    notFound={notFound}
                    handleMovieLikeToggle={handleMovieLikeToggle}
                    handleAmount={handleAmount}
                    amount={amount}
                    stopMore={stopMore}
                    isLoading={isLoading}
                    searchValue={searchValue}
                    isVisible={isVisible}
                    mountSearchResult={mountSearchResult}
                    setAmount={props.setAmount}
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
                    searchValue={searchValue}
                    searchSavedMovie={searchSavedMovie}
                    loadSavedMovies={loadSavedMovies}
                    shortSavedMovie={shortSavedMovie}
                    savedMoviesSearchResult={savedMoviesSearchResult}
                    setSavedSearchFinished={setSavedSearchFinished}
                    savedSearchFinished={savedSearchFinished}
                    savedSearchValue={savedSearchValue}
                    handleShortSavedMovieCheckbox={handleShortSavedMovieCheckbox}
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
                    successMessage={successMessage}
                    isSame={isSame}
                    setMessage={setMessage}
                    setSuccessMessage={setSuccessMessage}
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
