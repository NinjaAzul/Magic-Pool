import React, { useState, useEffect, useRef } from 'react';
import { StatusBar, Alert, StyleSheet, Dimensions, View } from 'react-native';
import { StyleProvider, Button, Container } from 'native-base';
import { DrawerActions } from 'react-navigation-drawer';
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

import { withNavigationFocus } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Lottie from 'lottie-react-native';
import color from '../../styles/colors';
import shark from '../../assets/shark.json';
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
    right: hp('3%'),
  },
  titlePORTRAIT: {
    right: hp('4%'),
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
  formPicker: {
    width: wp('40%'),
    height: hp('9%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// codigos

function PQA({ ...props }) {
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
  //---------------------------------------------------------------------------

  const [index, setIndex] = useState(new IndexPath(0));
  const [selected, setSelected] = useState(0);
  const [piscinas, setPiscinas] = useState([
    { id: 0, nomePiscina: 'Piscinas' },
  ]);

  const [visible, setVisible] = useState(false);
  const [agua, setAgua] = useState('');
  const [borda, setBorda] = useState('');
  const [odor, setOdor] = useState('');
  const [residuos, setResiduos] = useState('');
  const [nivel, setNivel] = useState('');
  const [loading, setLoading] = useState(false);

  const bordaRef = useRef();
  const odorRef = useRef();
  const residuosRef = useRef();
  const nivelRef = useRef();
  // antes da tela

  async function carregarPiscinas() {
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

  useEffect(() => {
    setLoading(true);
    if (props.isFocused) {
      carregarPiscinas();
    }
  }, [props.isFocused]);

  async function submit() {
    const itens = {
      piscina_id: piscinas[index.row].id,
      agua,
      borda,
      odor,
      residuos,
      nivel,
      tipo_item_id: 2,
    };

    // console.log(itens);
    setLoading(true);
    if (
      piscinas[index.row].id > 0 &&
      agua !== '' &&
      borda !== '' &&
      odor !== '' &&
      residuos !== '' &&
      nivel !== ''
    ) {
      const response = await api.post('formularios', itens);
      if (response.data.error) {
        // setVisible(true);
        Alert.alert('Atenção', response.data.error);
      } else {
        Alert.alert('Aviso', 'O formulario foi cadastrado com Sucesso');
        setAgua('');
        setOdor('');
        setBorda('');
        setResiduos('');
        setNivel('');
        setSelected([{ id: 0, nomePiscina: 'Selecione uma piscina' }]);
      }
    } else {
      Alert.alert('Erro no cadastro', 'Preencha todos os campos!');
    }
    setLoading(false);
  }

  /* render function, etc */

  return (
    <StyleProvider style={getTheme(material)}>
      {loading ? (
        <Container style={{ flex: 1 }}>
          <Lottie source={shark} autoPlay loop />
        </Container>
      ) : (
        <Container style={{ flex: 1 }}>
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
              <Button style={{}} transparent>
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
                CHECKLIST
              </Title>
              <Title
                style={[
                  orientation === 'PORTRAIT'
                    ? styles.titlePORTRAIT
                    : styles.titleLANDSCAPE,
                ]}
              >
                PQA
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
              <FormInput
                required
                keyboardType="numeric"
                style={styles.formInput}
                autoCorrect={false}
                autoCapitalize="none"
                value={agua}
                onChangeText={setAgua}
                returnKeyType="next"
                onSubmitEditing={() => bordaRef.current.focus()}
                placeholder="Agua"
              />

              <FormInput
                keyboardType="numeric"
                style={styles.formInput}
                autoCorrect={false}
                autoCapitalize="none"
                ref={bordaRef}
                value={borda}
                onChangeText={setBorda}
                returnKeyType="next"
                onSubmitEditing={() => residuosRef.current.focus()}
                placeholder="Borda"
              />
              <FormInput
                keyboardType="numeric"
                style={styles.formInput}
                autoCorrect={false}
                autoCapitalize="none"
                ref={odorRef}
                value={odor}
                onChangeText={setOdor}
                returnKeyType="next"
                onSubmitEditing={() => nivelRef.current.focus()}
                placeholder="Odor"
              />
            </Form>
            <Form
              keyboardType="numeric"
              style={{
                margin: 10,
                padding: 0,
                width: wp('40%'),
                backgroundColor: color.g2,
              }}
            >
              <Select
                style={styles.formPicker}
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
                ref={residuosRef}
                value={residuos}
                onChangeText={setResiduos}
                returnKeyType="next"
                onSubmitEditing={() => odorRef.current.focus()}
                placeholder="Resíduos"
              />

              <FormInput
                keyboardType="numeric"
                style={styles.formInput}
                autoCorrect={false}
                autoCapitalize="none"
                ref={nivelRef}
                value={nivel}
                onChangeText={setNivel}
                returnKeyType="send"
                onSubmitEditing={submit}
                placeholder="Nível"
              />
            </Form>
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
                    CACP
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

export default withNavigationFocus(PQA);
