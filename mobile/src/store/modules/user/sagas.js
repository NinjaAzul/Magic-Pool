import { takeLatest, call, put, all } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '../../../services/api';

import { updateProfileSuccess } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, login, ...rest } = payload.data;

    const profile = {
      name,
      login,
      ...(rest.oldPassword ? rest : {}),
    };
    // chama a api
    const response = yield call(api.put, 'users', profile);

    Alert.alert('Update success', 'Profile updated successfully');

    yield put(updateProfileSuccess(response.data));
  } catch (error) {
    Alert.alert('Update failure', error.response.data.error);
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
