import { all, takeLatest, call, put } from 'redux-saga/effects';

import { Alert } from 'react-native';
import api from '../../../services/api';

import { signInSuccess, signFailure, signInRequest } from './actions';

export function* signIn({ payload }) {
  try {
    const { login, password } = payload;

    const response = yield call(api.post, '/sessions', {
      login,
      password,
    });

    const { token, user } = response.data;

    if (user.provider) {
      Alert.alert(
        'Autenticação falhou',
        'O usuário não pode ser um fornecedor'
      );
      return;
    }

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));

    // history.push('/dashboard');
  } catch (error) {
    Alert.alert('Autenticação falhou', error.response.data.error);
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  try {
    const { name, login, password } = payload;

    yield call(api.post, '/users', {
      name,
      login,
      password,
    });

    yield put(signInRequest(login, password));
    // history.push('/');
  } catch (error) {
    Alert.alert('Registro falhou', error.response.data.error);
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;
  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
