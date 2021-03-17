import React, { useState, useEffect, useRef } from 'react';
import { StatusBar, Alert, StyleSheet, Dimensions, View } from 'react-native';
import { StyleProvider, Button, Container } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Select,
  SelectItem,
  IndexPath,
  Card,
  Modal,
  Text as TxtKitten,
} from '@ui-kitten/components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Lottie from 'lottie-react-native';
import shark from '../../assets/shark.json';
import color from '../../styles/colors';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';

import api from '../../services/api';
import { Title, FormInput, SubmitButton, Form } from './styles';

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
    fontSize: wp('3%'),
    fontWeight: 'bold',
    color: color.g2,
    right: hp('2%'),
  },
  titlePORTRAIT: {
    right: hp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: wp('3%'),
    fontWeight: 'bold',
    color: color.g2,
  },
  subimitButtonPORTRAIT: {
    width: wp('50%'),
    height: hp('5%'),
    marginBottom: hp('45%'),
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
    width: wp('40%'),
    height: hp('7%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('2%'),
  },

  divFormLANDSCAPE: {
    alignItems: 'center',
    justifyContent: 'center',
    height: hp('32%'),
    flexDirection: 'row',
    paddingTop: hp('5%'),
    backgroundColor: color.g2,
  },

  divFormPORTRAIT: {
    height: hp('54%'),
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: hp('25%'),
    justifyContent: 'center',
    backgroundColor: color.g2,
  },

  divSubimitBottonPORTRAIT: {
    marginTop: hp('10%'),
    backgroundColor: color.g2,
    alignItems: 'center',
  },

  divSubimitBottonLANDSCAPE: {
    marginTop: hp('2%'),
    backgroundColor: color.g2,
    alignItems: 'center',
  },
});

// codigos

function CACP({ ...props }) {
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

  const [index, setIndex] = useState(new IndexPath(0));
  const [index2, setIndex2] = useState(new IndexPath(0));
  const [selected, setSelected] = useState(0);
  const [piscinas, setPiscinas] = useState([
    { id: 0, nomePiscina: 'Piscinas' },
  ]);
  const [txtTitle, setTxtTitle] = useState('');
  const [analiseSelected, setAnaliseSelected] = useState(0);
  const [analises, setAnalises] = useState([{ id: 0, nomeAnalise: 'Analise' }]);

  const [visible, setVisible] = useState(false);
  const [cloro, setCloro] = useState('');
  const [ph, setPh] = useState('');
  const [temperatura, setTemperatura] = useState('');
  const [hidrogeron, setHidrogeron] = useState('');
  const [qualidadeAgua, setQualidadeAgua] = useState('');
  const [loading, setLoading] = useState(false);
  const phRef = useRef();
  const temperaturalRef = useRef();
  const hidrogeronRef = useRef();
  const qualidadeAguaRef = useRef();

  // antes da tela

  async function carregarPiscinas() {
    setPiscinas([{ id: 0, nomePiscina: 'Piscinas' }]);
    const item = {
      tipo_item_id: 1,
    };
    const response = await api.get('piscinas', { params: item });

    const piscinasBanco = response.data;

    piscinasBanco.map(piscina => {
      const ObjPiscina = {
        id: piscina.id,
        nomePiscina: piscina.piscina,
      };

      setPiscinas(state => [...state, ObjPiscina]);

      // console.log(ObjPiscina);
    });
    setLoading(false);
  }

  async function carregarAnalises() {
    setAnalises([{ id: 0, nomeAnalise: 'Analise' }]);
    const response = await api.get('analises');

    const analisesBanco = response.data;

    analisesBanco.map(analise => {
      const ObjAnalise = {
        id: analise.id,
        nomeAnalise: analise.analise,
      };

      setAnalises(state => [...state, ObjAnalise]);
    });
  }

  async function submit() {
    setLoading(true);
    const itens = {
      piscina_id: piscinas[index.row].id,
      cloro,
      PH: ph,
      temperatura,
      hidrogeron,
      qualidade_agua: qualidadeAgua,
      analise_id: analises[index2.row].id,
      tipo_item_id: 1,
    };

    if (
      piscinas[index.row].id > 0 &&
      cloro !== '' &&
      ph !== '' &&
      temperatura !== '' &&
      hidrogeron !== '' &&
      qualidadeAgua !== '' &&
      analises[index2.row].id > 0
    ) {
      const response = await api.post('formularios', itens);
      if (response.data.error) {
        // setVisible(true);
        Alert.alert('Atenção', response.data.error);
      } else {
        Alert.alert('Aviso', 'O formulario foi cadastrado com Sucesso');
        setCloro('');
        setPh('');
        setTemperatura('');
        setHidrogeron('');
        setAnaliseSelected([{ id: 0, nomeAnalise: 'Analise' }]);
        setSelected([{ id: 0, nomePiscina: 'Selecione uma piscina' }]);
        setQualidadeAgua('');
      }
    } else {
      Alert.alert('Erro no cadastro', 'Preencha todos os campos!');
    }
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    if (props.isFocused) {
      carregarAnalises();
      carregarPiscinas();
    }
  }, [props.isFocused]);

  return (
    <StyleProvider style={getTheme(material)}>
      {loading ? (
        <Container style={{ flex: 1 }}>
          <Lottie source={shark} autoPlay loop />
        </Container>
      ) : (
        <Container>
          <StatusBar barStyle="light-content" backgroundColor={color.g1} />
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
                CONTROLE DE ANÁLISE E CORREÇÃO
              </Title>
              <Title
                style={[
                  orientation === 'PORTRAIT'
                    ? styles.titlePORTRAIT
                    : styles.titleLANDSCAPE,
                ]}
              >
                DE PISCINAS
              </Title>
            </View>
          </View>

          <View
            style={[
              orientation === 'PORTRAIT'
                ? styles.divFormPORTRAIT
                : styles.divFormLANDSCAPE,
              { width: dimensionW },
            ]}
          >
            <Form
              style={{
                margin: 10,
                padding: 0,
                width: wp('40%'),
                backgroundColor: color.g2,
              }}
            >
              <Select
                style={styles.formInput}
                selectedIndex={index}
                onSelect={index => setIndex(index)}
                value={piscinas[index.row].nomePiscina}
              >
                {piscinas.map(piscina => (
                  <SelectItem key={piscina.id} title={piscina.nomePiscina} />
                ))}
              </Select>

              <FormInput
                keyboardType="numeric"
                style={styles.formInput}
                autoCorrect={false}
                autoCapitalize="none"
                value={cloro}
                onChangeText={setCloro}
                returnKeyType="next"
                onSubmitEditing={() => qualidadeAguaRef.current.focus()}
                placeholder="Cloro"
              />

              <FormInput
                keyboardType="numeric"
                style={styles.formInput}
                autoCorrect={false}
                autoCapitalize="none"
                ref={phRef}
                value={ph}
                onChangeText={setPh}
                returnKeyType="next"
                onSubmitEditing={() => temperaturalRef.current.focus()}
                placeholder="PH"
              />
            </Form>
            <Form
              style={{
                padding: 0,
                width: wp('40%'),
                backgroundColor: color.g2,
                margin: 10,
              }}
            >
              <Select
                style={styles.formInput}
                selectedIndex={index2}
                onSelect={index => setIndex2(index)}
                value={analises[index2.row].nomeAnalise}
              >
                {analises.map(analise => (
                  <SelectItem
                    key={analise.id}
                    title={analise.nomeAnalise.toString()}
                  />
                ))}
              </Select>
              <FormInput
                keyboardType="numeric"
                style={styles.formInput}
                autoCorrect={false}
                autoCapitalize="none"
                ref={qualidadeAguaRef}
                value={qualidadeAgua}
                onChangeText={setQualidadeAgua}
                onSubmitEditing={() => phRef.current.focus()}
                returnKeyType="next"
                placeholder="Qualidade de água"
              />

              <FormInput
                keyboardType="numeric"
                style={styles.formInput}
                autoCorrect={false}
                autoCapitalize="none"
                ref={temperaturalRef}
                value={temperatura}
                onChangeText={setTemperatura}
                returnKeyType="next"
                onSubmitEditing={() => hidrogeronRef.current.focus()}
                placeholder="Temperatura"
              />
            </Form>
          </View>
          <View
            style={{
              width: dimensionW,
              backgroundColor: color.g2,
              alignItems: 'center',
            }}
          >
            <FormInput
              keyboardType="numeric"
              style={styles.formInput}
              autoCorrect={false}
              autoCapitalize="none"
              ref={hidrogeronRef}
              value={hidrogeron}
              onChangeText={setHidrogeron}
              returnKeyType="send"
              onSubmitEditing={submit}
              placeholder="Hidrogeron"
            />
          </View>
          <View
            style={[
              orientation === 'PORTRAIT'
                ? styles.divSubimitBottonPORTRAIT
                : styles.divSubimitBottonLANDSCAPE,
              { width: dimensionW },
            ]}
          >
            <SubmitButton
              style={
                orientation === 'PORTRAIT'
                  ? styles.subimitButtonPORTRAIT
                  : styles.subimitButtonLANDSCAPE
              }
              loading={loading}
              onPress={submit}
            >
              Enviar
            </SubmitButton>
            <Modal
              visible={visible}
              backdropStyle={styles.backdrop}
              onBackdropPress={() => setVisible(false)}
            >
              <Card
                disabled
                style={
                  orientation === 'PORTRAIT'
                    ? styles.ModalPORTRAIT
                    : styles.ModalLANDSCAPE
                }
              >
                <Button style={styles.BtnFechaModal} iconLeft transparent>
                  <Icon
                    name="arrow-back-ios"
                    onPress={() => setVisible(false)}
                    style={{ color: color.g1, fontSize: 35 }}
                  />
                </Button>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <TxtKitten
                    style={
                      orientation === 'PORTRAIT'
                        ? styles.TituloModalPORTRAIT
                        : styles.TituloModalLANDSCAPE
                    }
                    category="h1"
                  >
                    teste
                  </TxtKitten>
                </View>
              </Card>
            </Modal>
          </View>
        </Container>
      )}
    </StyleProvider>
  );
}

export default withNavigationFocus(CACP);
