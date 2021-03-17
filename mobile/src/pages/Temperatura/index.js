import React, { useState, useRef, useEffect } from 'react';
import { Alert, StyleSheet, Dimensions, View } from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { Content, StyleProvider, Button, Container } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
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
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: color.g2,
    right: hp('3%'),
  },
  titlePORTRAIT: {
    right: hp('4%'),
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: color.g2,
  },
  subimitButtonPORTRAIT: {
    width: wp('50%'),
    height: hp('5%'),
    marginBottom: hp('25%'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  subimitButtonLANDSCAPE: {
    width: wp('50%'),
    height: hp('5%'),
    marginBottom: hp('15%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  formInput: {
    width: wp('50%'),
    height: hp('6%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// Codigos
function Piscinas(props, isFocused) {
  const [temperaturaRio, setTemperaturaRio] = useState('');
  const [temperaturaAmbiente, setTemperaturaAmbiente] = useState('');
  const [loading, setLoading] = useState(false);
  const temperaturalRioRef = useRef();

  async function carregarValAtual() {
    const response = await api.get('valpadrao');

    const ValpBanco = response.data;
    // console.log(ValpBanco);
  }

  useEffect(() => {
    if (isFocused) {
      carregarValAtual();
    }
  }, [isFocused]);

  async function Submit() {
    const itens = {
      id: 1,
      valPadraoTempA: temperaturaAmbiente,
      valPadraoTempM: temperaturaRio,
    };

    setLoading(true);
    setTemperaturaRio('');
    setTemperaturaAmbiente('');

    if (temperaturaAmbiente !== '' && temperaturaRio !== '') {
      await api.put('valpadrao', itens);
      Alert.alert('Aviso', 'A temperatura foi cadastrada com sucesso!!');
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
            style={{ backgroundColor: color.g1, flex: 2, alignItems: 'center' }}
          >
            <Title
              style={[
                orientation === 'PORTRAIT'
                  ? styles.titlePORTRAIT
                  : styles.titleLANDSCAPE,
              ]}
            >
              Temperatura °C{' '}
            </Title>
          </View>
        </View>
        <Content>
          <Form
            style={{
              height: dimensionH,
              flex: 1,
              backgroundColor: color.g2,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FormInput
              keyboardType="numeric"
              style={styles.formInput}
              autoCorrect={false}
              autoCapitalize="none"
              value={temperaturaAmbiente}
              onChangeText={setTemperaturaAmbiente}
              onSubmitEditing={() => temperaturalRioRef.current.focus()}
              returnKeyType="next"
              placeholder="Rio °C"
            />
            <FormInput
              keyboardType="numeric"
              style={styles.formInput}
              autoCorrect={false}
              autoCapitalize="none"
              ref={temperaturalRioRef}
              value={temperaturaRio}
              onChangeText={setTemperaturaRio}
              onSubmitEditing={Submit}
              returnKeyType="send"
              placeholder="Ambiente °C"
            />
            <SubmitButton
              style={
                orientation === 'PORTRAIT'
                  ? styles.subimitButtonPORTRAIT
                  : styles.subimitButtonLANDSCAPE
              }
              loading={loading}
              onPress={Submit}
            >
              Atualizar
            </SubmitButton>
          </Form>
        </Content>
      </Container>
    </StyleProvider>
  );
}

export default withNavigationFocus(Piscinas);
