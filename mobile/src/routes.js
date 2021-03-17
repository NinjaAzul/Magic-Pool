// eslint-disable-next-line no-unused-vars
import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import { createDrawerNavigator } from 'react-navigation-drawer';

import CustomDrawer from './components/CustomDrawer';

// import color from '~/styles/colors';

// Telas
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import CACP from './pages/CACP';
import Piscinas from './pages/Piscinas';
import Users from './pages/Users';
import UsersList from './pages/UsersList';
import PQA from './pages/PQA';
import PiscinasList from './pages/PiscinasList';
import Temperatura from './pages/Temperatura';
import RelatorioCACP from './pages/RelatorioCACP';
import RelatorioPQA from './pages/RelatorioPQA';
// import Details from './pages/Details';

// Drawer editor

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
        }),
        App: createDrawerNavigator(
          {
            Home,
            CACP,
            Piscinas,
            Users,
            PQA,
            UsersList,
            PiscinasList,
            Temperatura,
            RelatorioCACP,
            RelatorioPQA,
          },
          {
            contentComponent: CustomDrawer,
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Sign',
      }
    )
  );
