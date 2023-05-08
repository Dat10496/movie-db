import { createContext, useReducer, useEffect } from "react";

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  password: null,
  favoriteMovie: [],
};

const INITIALIZE = "INITIALIZE";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGOUT = "LOGOUT";
const ADD_FAV_SUCCESS = "ADD_FAV_SUCCESS";
const REMOVE_FAV_SUCCESS = "REMOVE_FAV_SUCCESS";

const reducer = (state, action) => {
  switch (action.type) {
    case INITIALIZE:
      const { isAuthenticated, user, password, favoriteMovie } = action.payload;
      return {
        ...state,
        isAuthenticated,
        isInitialized: true,
        user,
        password,
        favoriteMovie,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        password: action.payload.password,
        favoriteMovie: action.payload.favoriteMovie,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        password: null,
        favoriteMovie: [],
      };

    case ADD_FAV_SUCCESS: {
      return {
        ...state,
        favoriteMovie: action.payload,
      };
    }

    case REMOVE_FAV_SUCCESS: {
      return {
        ...state,
        favoriteMovie: action.payload,
      };
    }
    default:
      return state;
  }
};

const AuthContext = createContext({ ...initialState });

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const username = window.localStorage.getItem("username");
        const password = window.localStorage.getItem("password");
        const favMovie = JSON.parse(localStorage.getItem("favMovie"));

        if (username && password) {
          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: true,
              user: { username },
              password: { password },
              favoriteMovie: favMovie,
            },
          });
        } else {
          dispatch({
            type: INITIALIZE,
            payload: {
              isAuthenticated: false,
              user: null,
              password: null,
              favoriteMovie: [],
            },
          });
        }
      } catch (err) {
        console.error(err);
        dispatch({
          type: INITIALIZE,
          payload: {
            isAuthenticated: false,
            user: null,
            password: null,
            favoriteMovie: [],
          },
        });
      }
    };
    initialize();
  }, []);

  const login = async (username, password, callback) => {
    window.localStorage.setItem("username", username);
    window.localStorage.setItem("password", password);
    window.localStorage.setItem("favMovie", JSON.stringify([]));
    dispatch({
      type: LOGIN_SUCCESS,
      payload: {
        user: { username },
        password: { password },
        favoriteMovie: [],
      },
    });

    callback();
  };

  const logout = async (callback) => {
    window.localStorage.removeItem("username");
    window.localStorage.removeItem("password");
    window.localStorage.removeItem("favMovie");
    dispatch({ type: LOGOUT });
    callback();
  };

  const addFavMovie = (movieId) => {
    let storeFavMovie = JSON.parse(localStorage.getItem("favMovie"));

    storeFavMovie.unshift(`${movieId}`);
    window.localStorage.setItem("favMovie", JSON.stringify(storeFavMovie));
    dispatch({ type: ADD_FAV_SUCCESS, payload: storeFavMovie });
  };

  const removeFavMovie = (movieId) => {
    let storeFavMovie = JSON.parse(localStorage.getItem("favMovie"));

    for (let i = 0; i <= storeFavMovie.length; i++) {
      if (storeFavMovie[i] === `${movieId}`) {
        storeFavMovie.splice(i, 1);
      }
    }
    window.localStorage.setItem("favMovie", JSON.stringify(storeFavMovie));
    dispatch({ type: REMOVE_FAV_SUCCESS, payload: storeFavMovie });
  };

  const value = { ...state, login, logout, addFavMovie, removeFavMovie };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
