// application reducers
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistReducer, persistStore } from 'redux-persist';
import { appReducer, projectsReducer } from '../reducers';
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const rootReducer = combineReducers({
  app: appReducer,
  projects: projectsReducer,
});

// middle wares
const middlewares = [thunkMiddleware];
const middleWareConfig = applyMiddleware(...middlewares);

// persist config for save state in mobile storage
const persistConfig = {
  key: 'root',
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(middleWareConfig),
);

export const persistor = persistStore(store);

export type ApplicationState = ReturnType<typeof persistedReducer>;
