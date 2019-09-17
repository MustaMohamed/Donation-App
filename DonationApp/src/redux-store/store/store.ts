// application reducers
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import { appReducer } from '../reducers';

const rootReducer = combineReducers({
  app: appReducer,
});

// middle wares
const middlewares = [thunkMiddleware];
const middleWareConfig = applyMiddleware(...middlewares);

// persist config for save state in mobile storage
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(middleWareConfig),
);

export const persistor = persistStore(store);

export type ApplicationState = ReturnType<typeof persistedReducer>;
