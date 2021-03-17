import React, { useState, useEffect } from 'react';
import { Alert, StyleSheet, Dimensions, View } from 'react-native';
import { StyleProvider, Button, Container } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Lottie from 'lottie-react-native';
import shark from '../../assets/shark.json';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';
import { FormInput, SubmitButton, Title, Form } from './styles';
import api from '../../services/api';
import color from '../../styles/colors';

// CSS

const styles = StyleSheet.create({
  Icon: {
    fontSize: wp('8%'),
    color: color.g2,
    alignItems: 'center',
  },
  headerLANDSCAPE: {
    marginBottom: 2,
    height: hp('7%'),
    backgroundColor: color.g1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
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
  titleLANDSCAPE: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: color.g2,
    right: hp('3%'),
  },
  titlePORTRAIT: {
    right: hp('4%'),
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: wp('4%'),
    fontWeight: 'bold',
    color: color.g2,
  },
  subimitButtonPORTRAIT: {
    width: wp('50%'),
    height: hp('4%'),
    marginBottom: hp('25%'),
  },

  subimitButtonLANDSCAPE: {
    width: wp('50%'),
    height: hp('4%'),
    marginBottom: hp('15%'),
  },
  formInput: {
    width: wp('50%'),
    height: hp('6%'),
  },
});

// Codigos
export default function Piscinas({ ...props }) {
  const [piscina, setPiscina] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit() {
    const itens = { piscina };
    setLoading(true);
    setPiscina('');

    if (piscina !== '') {
      await api.post('piscinas', itens);
      Alert.alert('Aviso', 'O formulario foi cadastrado com sucesso!');
    } else {
      Alert.alert('Erro no cadastro', 'Preencha todos os campos!');
    }
    setLoading(false);
  }
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
  const telaW8porcent = (dimensionW * 8) / 100;
  const telaW70porcent = (dimensionW * 70) / 100;
  //------------------------------------------------------------------------------

  return (
    <StyleProvider style={getTheme(material)}>
      {loading ? (
        <Container style={{ flex: 1 }}>
          <Lottie source={shark} autoPlay loop />
        </Container>
      ) : (
        <Container style={{ flex: 1 }}>
          <View
            // eslint-disable-next-line no-sparse-arrays
            style={[
              orientation === 'PORTRAIT'
                ? styles.headerPORTRAIT
                : styles.headerLANDSCAPE,
              ,
              { width: dimensionW },
            ]}
          >
            <View
              style={{
                marginLeft: wp('2%'),
                alignContent: 'center',
                alignItems: 'center',
                backgroundColor: color.g1,
                width: telaW8porcent,
              }}
            >
              <Button transparent>
                <Icon
                  name="menu"
                  onPress={() =>
                    props.navigation.dispatch(DrawerActions.openDrawer())
                  }
                  style={styles.Icon}
                />
              </Button>
            </View>

            <View
              style={{
                backgroundColor: color.g1,
                flex: 2,
                alignItems: 'center',
              }}
            >
              <Title
                style={[
                  orientation === 'PORTRAIT'
                    ? styles.titlePORTRAIT
                    : styles.titleLANDSCAPE,
                ]}
              >
                {' '}
                Cadastro de Piscinas
              </Title>
            </View>
          </View>

          <Form
            style={{
              paddingTop: hp('20%'),
              height: dimensionH,
              flex: 1,
              backgroundColor: color.g2,
              alignContent: 'center',
              justifyContent: 'center',
            }}
          >
            <FormInput
              style={styles.formInput}
              autoCorrect={false}
              autoCapitalize="none"
              value={piscina}
              onChangeText={setPiscina}
              onSubmitEditing={submit}
              returnKeyType="next"
              placeholder="Nova Piscina"
            />

            <SubmitButton
              style={
                orientation === 'PORTRAIT'
                  ? styles.subimitButtonPORTRAIT
                  : styles.subimitButtonLANDSCAPE
              }
              loading={loading}
              onPress={submit}
            >
              Cadastrar
            </SubmitButton>
          </Form>
        </Container>
      )}
    </StyleProvider>
  );
}
