import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import 'react-native-gesture-handler';
// import { NavigationNativeContainer } from 'react-navigation';

import color from './styles/colors';

import './config/ReactotronConfig';

import { store, persistor } from './store';
import App from './App';

export default function Index() {
  return (
    <Provider store={store}>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <PersistGate persistor={persistor}>
          <StatusBar barStyle="light-content" backgroundColor={color.g1} />
          <App />
        </PersistGate>
      </ApplicationProvider>
    </Provider>
  );
}
