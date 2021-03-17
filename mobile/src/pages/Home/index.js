import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StatusBar, Image, StyleSheet, View, Dimensions } from 'react-native';
import {
  Header,
  Body,
  Button,
  StyleProvider,
  Left,
  Container,
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Lottie from 'lottie-react-native';
import { DrawerActions } from 'react-navigation-drawer';
import { useSharedValue } from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import shark from '../../assets/shark.json';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';
import color from '../../styles/colors';
import Background from '../../components/Background';
import api from '../../services/api';
import { Title, Title2 } from './styles';
import logo from '../../assets/BemVindo.png';
// codigos

// CSS

const styles = StyleSheet.create({
  Icon: {
    fontSize: wp('8%'),
    color: color.g2,
  },

  headerLANDSCAPE: {
    marginBottom: 2,
    height: hp('7%'),
    backgroundColor: color.g1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderColor: '#ddd',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
    borderStyle: 'solid',
    borderRadius: 2,
  },
  headerPORTRAIT: {
    marginBottom: 10,
    height: hp('7%'),
    backgroundColor: color.g1,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderColor: '#ddd',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 3,
    borderStyle: 'solid',
    borderRadius: 2,
  },
  logoLANDSCAPE: {
    marginBottom: 20,
    width: wp('70%'),
    height: hp('40%'),
  },
  logoPORTRAIT: {
    marginTop: 20,
    marginBottom: 20,
    width: wp('70%'),
    height: hp('60%'),
  },
});

export default function Home({ ...props }) {
  const nome = useSelector(state => state.user.profile.nome);

  // RESPONSIVO
  const [dimensionW, setDimensionW] = useState(0);
  const [dimensionH, setDimensionH] = useState(0);
  const [orientation, setOrientation] = useState('PORTRAIT');

  useEffect(() => {
    Dimensions.addEventListener('change', ({ window: { width, height } }) => {
      if (width < height) {
        setOrientation('PORTRAIT');
        const { width, height } = Dimensions.get('window');
        setDimensionW(width);
        setDimensionH(height);
      } else {
        setOrientation('LANDSCAPE');
        const { width, height } = Dimensions.get('window');
        setDimensionW(width);
        setDimensionH(height);
      }
      // console.log(orientation);
    });
  }, [orientation]);

  useEffect(() => {
    const { width, height } = Dimensions.get('window');
    if (width < height) {
      setOrientation('PORTRAIT');
      const { width, height } = Dimensions.get('window');
      setDimensionW(width);
      setDimensionH(height);
    } else {
      setOrientation('LANDSCAPE');
      const { width, height } = Dimensions.get('window');
      setDimensionW(width);
      setDimensionH(height);
    }
    // console.log(orientation);
  }, []);

  //------------------------------------------------------------------------------

  return (
    <StyleProvider style={getTheme(material)}>
      <Container>
        <StatusBar barStyle="light-content" backgroundColor={color.g1} />
        <View
          style={[
            orientation === 'PORTRAIT'
              ? styles.headerPORTRAIT
              : styles.headerLANDSCAPE,

            { width: dimensionW },
          ]}
        >
          <Left>
            <Button style={{ marginLeft: 10 }} transparent>
              <Icon
                name="menu"
                onPress={() =>
                  props.navigation.dispatch(DrawerActions.openDrawer())
                }
                style={styles.Icon}
              />
            </Button>
          </Left>
        </View>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Lottie source={shark} autoPlay loop />
          <Image
            style={[
              orientation === 'PORTRAIT'
                ? styles.logoPORTRAIT
                : styles.logoLANDSCAPE,
            ]}
            source={logo}
          />
          <Title style={{ fontSize: hp('4%') }}> Bem vindo, {nome} </Title>
        </View>
      </Container>
    </StyleProvider>
  );
}
