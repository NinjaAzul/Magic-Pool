import React, { useEffect, useState, useRef } from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Lottie from 'lottie-react-native';
import { Button, StyleProvider, Content, Container } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DrawerActions } from 'react-navigation-drawer';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import {
  Button as BtnKitten,
  Card,
  Modal,
  Text as TxtKitten,
  Toggle,
  IndexPath,
  Spinner,
} from '@ui-kitten/components';
import { TextInputMask } from 'react-native-masked-text';
import shark from '../../assets/shark.json';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';
import color from '../../styles/colors';
import api from '../../services/api';
import { Constainer, Title, FormInput, SubmitButton, Form } from './styles';
// CSS

const styles = StyleSheet.create({
  Icon: {
    fontSize: wp('8%'),
    color: color.g2,
    alignItems: 'center',
  },
  headerLANDSCAPE: {
    height: hp('7%'),
    backgroundColor: color.g1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  headerPORTRAIT: {
    height: hp('7%'),
    backgroundColor: color.g1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },

  headerSpaceLANDSCAPE: {
    height: hp('5%'),
    backgroundColor: color.g1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  headerSpacePORTRAIT: {
    height: hp('5%'),
    backgroundColor: color.g1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  headerSearchLANDSCAPE: {
    marginBottom: 10,
    height: hp('20%'),
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

  headerSearchPORTRAIT: {
    marginBottom: 10,
    height: hp('20%'),
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

  titleLANDSCAPE: {
    marginTop: hp('1%'),
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: color.g2,
    right: hp('3%'),
  },
  titlePORTRAIT: {
    marginTop: hp('1%'),
    right: hp('4%'),
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: wp('5%'),
    fontWeight: 'bold',
    color: color.g2,
  },
  IconTable: {
    color: color.g1,
    left: hp('1%'),
    fontSize: wp('5.5%'),
  },

  TxtSearch: {
    marginLeft: wp('7%'),
    width: wp('70%'),
    height: hp('6%'),
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: color.g2,
    alignItems: 'center',
    flexDirection: 'row',
    color: color.g2,
  },

  IconSearch: {
    fontSize: wp('8%'),
    color: color.g2,
    alignItems: 'center',
  },

  FormModalPORTRAIT: {
    paddingTop: hp('20%'),
    width: wp('70%'),
    height: hp('80%'),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  FormModalLANDSCAPE: {
    paddingTop: hp('10%'),
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },

  ModalPORTRAIT: {
    height: hp('90%'),
    width: wp('90%'),
    borderRadius: 5,
  },

  ModalLANDSCAPE: {
    height: hp('52%'),
    width: wp('140%'),
    borderRadius: 5,
  },

  subimitButtonPORTRAIT: {
    marginLeft: wp('10%'),
    width: wp('50%'),
    height: hp('5%'),
    marginBottom: hp('20%'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  subimitButtonLANDSCAPE: {
    width: wp('50%'),
    marginLeft: wp('4%'),
    height: hp('5%'),
    marginBottom: hp('20%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  formInputLANDSCAPE: {
    marginLeft: wp('4%'),
    marginBottom: hp('10%'),
    width: wp('50%'),
    height: hp('6%'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  formInputPORTRAIT: {
    marginLeft: wp('10%'),
    marginBottom: hp('20%'),
    width: wp('50%'),
    height: hp('6%'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  TituloModalPORTRAIT: {
    marginLeft: wp('8%'),
    color: color.g1,
    fontWeight: 'bold',
  },

  TituloModalLANDSCAPE: {
    marginLeft: wp('10%'),
    color: color.g1,
    fontWeight: 'bold',
  },

  togglePORTRAIT: {
    color: color.g1,
  },

  toggleLANDSCAPE: {
    color: color.g1,
  },

  Content: {
    right: 7,
    bottom: 4,
    width: 427,
    backgroundColor: color.g2,
    borderRadius: 20,
  },

  Botton: {
    left: 20,
    bottom: 45,
  },
  Botton1: {
    right: 295,
  },
  Botton2: {
    left: 40,
    width: 20,
    height: 20,
  },
  Body: {
    flex: 1,
    margin: 2,
  },
  Header: {
    height: 150,
  },

  Form2: {
    marginHorizontal: 10,
    left: 150,
    bottom: 400,
    marginLeft: 20,
  },
  Picker: {
    left: 170,
    width: 150,
    bottom: 279,
    color: color.g1,
    marginBottom: 10,
  },

  Cell: {
    margin: 30,
    height: hp('2%'),
  },

  HeaderTable: {
    margin: 10,
  },

  container: { flex: 1, marginTop: 2, backgroundColor: color.g2 },
  head: {
    height: 50,
    backgroundColor: 'rgba(27,149,224,1)',
  },

  text2: {
    margin: 6,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text: {
    margin: 6,
    fontSize: hp('2.1%'),
    color: '#424242',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  row: {
    margin: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(27,149,224,0.3)',
  },

  dataWrapper: {
    marginTop: -1,
  },

  BtnAtualizar: {
    top: 250,
    right: 140,
    left: 20,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },

  TextInputMask: {
    left: 0,
    bottom: 10,
    width: 150,
    height: 100,
    borderRadius: 5,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

// codigos
function PiscinasList({ ...props }) {
  // RESPONSIVO
  const [dimensionW, setDimensionW] = useState(0);
  const [dimensionH, setDimensionH] = useState(0);
  const [orientation, setOrientation] = useState('PORTRAIT');
  const [loading, setLoading] = useState(false);

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
  const [piscinas, setPiscinas] = useState([]);
  const [piscina, setPiscina] = useState('');

  const [piscinaId, setPiscinaId] = useState(false);

  const [users, setUsers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [buscaPiscina, setBuscaPiscina] = useState('');
  const [checked, setChecked] = useState(null);
  const [index, setIndex] = useState(new IndexPath(0));

  // Update

  // Lista todas as piscinas no inicio da criação da tela

  async function carregarPiscinas() {
    setPiscinas([]);
    const items = {
      // status_id: [2, 1],
      tipo_item_id: 2,
    };
    const response = await api.get('piscinas', { params: items });

    const piscinasBanco = response.data;

    piscinasBanco.map(piscinas => {
      const ObjPiscinas = {
        id: piscinas.id,
        nome: piscinas.piscina,
        status_id: piscinas.status_id,
      };

      setPiscinas(states => [...states, ObjPiscinas]);
    });
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    if (props.isFocused) {
      carregarPiscinas();
    }
  }, [props.isFocused]);

  // Função que atualiza um dado da piscina
  async function submitAtualizaPiscinas() {
    const itens = { id: piscinaId, piscina };
    setLoading(true);
    setPiscina('');

    if (itens !== '') {
      const response = await api.put('piscinas', itens);
      if (response.data.error) {
        Alert.alert('Error', response.data.error);
      } else {
        Alert.alert('Sucesso', response.data.msg);
      }
    } else {
      Alert.alert('Erro no cadastro', 'Preencha todos os campos!');
    }
    setLoading(false);
  }
  // Edita a tabela que é renderizada
  const Collun20porcent = (dimensionW * 20) / 100;
  const Collun60porcent = (dimensionW * 60) / 100;

  const tableHead = ['Id', 'Nome', 'Edit'];
  const tamanho = [Collun20porcent, Collun60porcent, Collun20porcent];
  // função que retorna uma unica piscina pesquisada
  async function Buscar() {
    setPiscinas([]);
    setLoading(true);

    const piscina = buscaPiscina;
    const items = {
      tipo_item_id: 1,
      piscina,
    };
    const response = await api.get('piscinas', { params: items });

    const piscinasBanco = response.data;
    // console.log(piscinasBanco);
    if (piscinasBanco.length > 0) {
      piscinasBanco.map(piscinas => {
        const ObjPiscinas = {
          id: piscinas.id,
          nome: piscinas.piscina,
          status_id: piscinas.status_id,
        };

        setPiscinas(states => [...states, ObjPiscinas]);
      });
    } else {
      Alert.alert('Error', 'Verifique se o nome da piscina está correto!');
    }
    setLoading(false);
  }

  async function ModalUpdate(index) {
    setPiscinaId(piscinas[index].id);
    setPiscina(piscinas[index].nome);
    setVisible(true);
    setChecked(piscinas[index].status_id === 1);
  }
  // Elemento Edit que aparece em todas tuplas da tabela
  function element(data, index) {
    return (
      <TouchableOpacity onPress={() => ModalUpdate(index)}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon
            name="create"
            style={[
              styles.IconTable,
              index % 2 && {
                color: 'rgba(27,149,224,0.3)',
                fontSize: wp('5.5%'),
                left: wp('1%'),
              },
            ]}
          />
        </View>
      </TouchableOpacity>
    );
  }
  // deixa a tabela com 2 cores
  const tableData = [];
  for (let i = 0; i < 30; i += 1) {
    const rowData = [];
    for (let j = 0; j < 9; j += 1) {
      rowData.push(`${i}${j}`);
    }
    tableData.push(rowData);
  }
  // BUTTON
  const onCheckedChange = async isChecked => {
    setChecked(isChecked);

    const index = piscinas.findIndex(piscina => piscinaId === piscina.id);

    if (!isChecked) {
      const response = await api.delete('piscinas', { params: { piscinaId } });
      piscinas[index].status_id = 2;
      Alert.alert('Sucesso', response.data.mss);
    }

    if (isChecked) {
      const response = await api.delete('piscinas', { params: { piscinaId } });
      users[index].status_id = 1;
      Alert.alert('Sucesso', response.data.mss);
    }
  };

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

            <StatusBar barStyle="light-content" backgroundColor={color.g1} />
            <View
              style={{
                backgroundColor: color.g1,
                alignItems: 'center',
                flex: 2,
                justifyContent: 'center',
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
                PISCINAS{' '}
              </Title>
            </View>
          </View>
          <View
            // eslint-disable-next-line no-sparse-arrays
            style={[
              orientation === 'PORTRAIT'
                ? styles.headerSpacePORTRAIT
                : styles.headerSpaceLANDSCAPE,
              ,
              { width: dimensionW },
            ]}
          />
          <View
            style={{
              flexDirection: 'row',
              width: dimensionW,
              backgroundColor: color.g1,
              height: hp('8%'),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FormInput
              icon="search"
              style={styles.TxtSearch}
              autoCorrect={false}
              autoCapitalize="none"
              value={buscaPiscina}
              onChangeText={setBuscaPiscina}
              onSubmitEditing={Buscar}
              returnKeyType="next"
              placeholder="Buscar"
            />

            <Button
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: hp('4%'),
                marginLeft: wp('2%'),
              }}
              transparent
            >
              {loading ? (
                <Spinner status="basic" />
              ) : (
                <Icon
                  name="search"
                  onPress={Buscar}
                  style={styles.IconSearch}
                />
              )}
            </Button>
          </View>
          <Content>
            <View style={styles.container}>
              <ScrollView horizontal>
                <View>
                  <Table
                    borderStyle={{ borderWidth: 1, borderColor: '#E0FFFF' }}
                  >
                    <Row
                      widthArr={tamanho}
                      data={tableHead}
                      style={styles.head}
                      textStyle={styles.text2}
                    />
                  </Table>
                  <ScrollView style={styles.dataWrapper}>
                    <Table
                      borderStyle={{ borderWidth: 1, borderColor: '#E0FFFF' }}
                    >
                      {piscinas.map((rowData, index) => (
                        <TableWrapper
                          key={rowData.id}
                          style={[
                            styles.row,
                            index % 2 && { backgroundColor: '#F4F4F4' },
                          ]}
                        >
                          <Cell
                            data={rowData.id}
                            textStyle={styles.text}
                            width={Collun20porcent}
                          />

                          <Cell
                            data={rowData.nome}
                            textStyle={styles.text}
                            width={Collun60porcent}
                          />

                          <Cell
                            data={element(rowData, index)}
                            textStyle={styles.text}
                            width={Collun20porcent}
                          />
                        </TableWrapper>
                      ))}
                    </Table>
                  </ScrollView>
                </View>
              </ScrollView>
            </View>
          </Content>
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
                  style={{ color: color.g1, fontSize: wp('8%') }}
                />
              </Button>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <TxtKitten />
                <TxtKitten
                  style={
                    orientation === 'PORTRAIT'
                      ? styles.TituloModalPORTRAIT
                      : styles.TituloModalLANDSCAPE
                  }
                  category="h1"
                >
                  Piscina
                </TxtKitten>
                <Toggle
                  style={
                    orientation === 'PORTRAIT'
                      ? styles.togglePORTRAIT
                      : styles.toggleLANDSCAPE
                  }
                  checked={checked}
                  status="info"
                  onChange={onCheckedChange}
                  borderColor={color.g1}
                />
              </View>

              <Form
                style={
                  orientation === 'PORTRAIT'
                    ? styles.FormModalPORTRAIT
                    : styles.FormModalLANDSCAPE
                }
              >
                <FormInput
                  style={
                    orientation === 'PORTRAIT'
                      ? styles.formInputPORTRAIT
                      : styles.formInputLANDSCAPE
                  }
                  onChangeText={setPiscina}
                  value={piscina}
                  placeholder="Piscina"
                />

                <SubmitButton
                  loading={loading}
                  onPress={submitAtualizaPiscinas}
                  style={
                    orientation === 'PORTRAIT'
                      ? styles.subimitButtonPORTRAIT
                      : styles.subimitButtonLANDSCAPE
                  }
                >
                  Atualizar
                </SubmitButton>
              </Form>
            </Card>
          </Modal>
        </Container>
      )}
    </StyleProvider>
  );
}

export default withNavigationFocus(PiscinasList);
