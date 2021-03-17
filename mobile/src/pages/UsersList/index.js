import React, { useEffect, useState, useRef } from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  FlatList,
  AppRegistry,
  Dimensions,
} from 'react-native';
import {
  Header,
  Body,
  Button,
  StyleProvider,
  Content,
  Container,
} from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DrawerActions } from 'react-navigation-drawer';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import {
  Button as BtnKitten,
  Card,
  Modal,
  Input,
  Text as TxtKitten,
  Toggle,
  useTheme,
  Select,
  SelectItem,
  IndexPath,
  Spinner,
} from '@ui-kitten/components';
import { withNavigationFocus } from 'react-navigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Lottie from 'lottie-react-native';
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
    left: hp('2%'),
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
    width: wp('30%'),
    height: hp('5%'),
    marginTop: hp('10%'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  subimitButtonLANDSCAPE: {
    width: wp('30%'),
    right: hp('32%'),
    height: hp('5%'),
    marginTop: hp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  formInputLANDSCAPE: {
    marginLeft: wp('2%'),
    marginBottom: hp('2%'),
    width: wp('30%'),
    height: hp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  formInputPORTRAIT: {
    marginLeft: wp('2%'),
    marginBottom: hp('2%'),
    width: wp('30%'),
    height: hp('5%'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  TituloModalPORTRAIT: {
    left: wp('30%'),
    color: color.g1,
    fontWeight: 'bold',
  },

  TituloModalLANDSCAPE: {
    marginLeft: wp('10%'),
    color: color.g2,
    fontWeight: 'bold',
  },

  Content: {
    right: 7,
    bottom: 4,
    width: 427,
    backgroundColor: color.g2,
    borderRadius: 20,
  },
  Cell: {
    margin: 20,
  },
  HeaderTable: {
    margin: 10,
  },
  container: { flex: 1, marginTop: 1, backgroundColor: '#fff' },
  head: {
    height: 40,
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
  BtnBuscar: {
    position: 'absolute',
    top: 98,
    left: 350,
  },

  TxtMask: {
    marginLeft: wp('7%'),
    width: wp('70%'),
    height: hp('6%'),
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: color.g2,
    alignItems: 'center',
    flexDirection: 'row',
    color: color.g1,
    paddingLeft: wp('5%'),
    borderColor: color.g2,
    fontSize: hp('2%'),
  },
  Form1: {
    right: 20,
    marginLeft: 30,
    bottom: 50,
  },

  BtnAtualizar: {
    top: 100,
    right: 140,
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
  TituloModal: {
    color: color.g1,
    textAlign: 'center',
    top: 20,
    right: 20,
  },
  Toggle: {
    right: 85,
    bottom: 55,
  },

  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },

  divRowFormPORTRAIT: {
    paddingTop: hp('5%'),
    backgroundColor: color.g2,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  divRowFormLANDSCAPE: {
    paddingTop: hp('1%'),
    backgroundColor: color.g2,
    alignItems: 'center',
    flexDirection: 'row',
  },
  divFormLANDSCAPE: {
    bottom: hp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    left: wp('45%'),
    backgroundColor: color.g2,
  },

  divFormPORTRAIT: {
    paddingTop: hp('8%'),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.g2,
  },
});

// codigos
function UsersList({ ...props }) {
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
  const telaW30porcent = (dimensionW * 30) / 100;
  const telaW10porcent = (dimensionW * 10) / 100;
  const telaW15porcent = (dimensionW * 15) / 100;
  const telaW20porcent = (dimensionW * 20) / 100;
  const telaW25porcent = (dimensionW * 25) / 100;
  const telaW35porcent = (dimensionW * 35) / 100;
  const telaW45porcent = (dimensionW * 45) / 100;
  const telaW40porcent = (dimensionW * 40) / 100;

  //-----------------------------------------------------------------------

  const [users, setUsers] = useState([]);
  const [visible, setVisible] = useState(false);
  const [buscaCpf, setBuscaCpf] = useState('');
  const [checked, setChecked] = useState(null);
  const [index, setIndex] = useState(new IndexPath(0));

  // Update

  const [perfis, setPerfis] = useState([{ id: 0, nomePerfil: 'Perfil' }]);

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');

  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');

  const [loading, setLoading] = useState(false);
  const [loadingShark, setLoadingShark] = useState(false);

  const [novaSenha, setNovaSenha] = useState('');
  const [novaSenha2, setNovaSenha2] = useState('');

  const [userId, setUserId] = useState(0);

  const cpfRef = useRef();
  const emailRef = useRef();
  const loginRef = useRef();
  const passwordRef = useRef();
  const novaSenhaRef = useRef();
  const novaSenha2Ref = useRef();

  async function carregarUsuarios() {
    setUsers([]);
    const response = await api.get('users');

    const usersBanco = response.data;
    // console.log(usersBanco);

    usersBanco.map(users => {
      const ObjUsers = {
        id: users.id,
        nome: users.nome,
        cpf: users.cpf,
        perfil: users.perfil.perfil,
        email: users.email,
        login: users.login,
        status_id: users.status_id,
      };

      setUsers(states => [...states, ObjUsers]);
    });
    setLoadingShark(false);
  }

  async function submitAtualizaUsers() {
    const Perfil = perfis.find(
      perfil => perfil.nomePerfil === perfis[index.row].nomePerfil
    );

    const IDPerfil = Perfil.id;

    const itens = {
      id: userId,
      email,
      password: novaSenha,
      comfirmPassword: novaSenha2,
      perfil_id: IDPerfil,
    };

    setLoading(true);

    if (IDPerfil > 0 && itens !== '') {
      const response = await api.put('users', itens);

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

  const tableHead = ['Nome', 'Perfil', 'CPF', 'Edit'];
  const tamanho = [telaW40porcent, telaW30porcent, telaW30porcent, 70];

  async function Buscar() {
    setUsers([]);
    setLoading(true);

    const cpf = buscaCpf;
    const response = await api.get('users', { params: { cpf } });

    const usersBanco = response.data;
    // console.log(usersBanco);
    usersBanco.map(user => {
      const ObjUsers = {
        id: user.id,
        idPerfil: user.perfis_id,
        nome: user.nome,
        cpf: user.cpf,
        perfil: user.perfil.perfil,
        status_id: user.status_id,
      };

      setUsers(states => [...states, ObjUsers]);
    });
    setLoading(false);
  }

  async function ModalUpdate(index) {
    const response = await api.get('perfis');
    // console.log(users[index]);
    const perfisBanco = response.data;

    perfisBanco.map(perfil => {
      const ObjPerfis = {
        id: perfil.id,
        nomePerfil: perfil.perfil,
      };

      setPerfis(state => [...state, ObjPerfis]);
      setUserId(users[index].id);
      setNome(users[index].nome);
      setCpf(users[index].cpf);
      setEmail(users[index].email);
      setLogin(users[index].login);
      setVisible(true);
      setChecked(users[index].status_id === 1);
      if (perfil.id === users[index].idPerfil) {
        setIndex(new IndexPath(users[index].idPerfil));
      }
      // console.log(perfil.id);
      // console.log(IndexPath(contar));
    });
  }

  function element(data, index) {
    return (
      <TouchableOpacity onPress={() => ModalUpdate(index)}>
        <View>
          <Icon
            name="create"
            style={[
              styles.IconTable,
              index % 2 && {
                color: 'rgba(27,149,224,0.3)',
                fontSize: wp('5.5%'),
                left: wp('3%'),
              },
            ]}
          />
        </View>
      </TouchableOpacity>
    );
  }

  const tableData = [];
  for (let i = 0; i < 30; i += 1) {
    const rowData = [];
    for (let j = 0; j < 9; j += 1) {
      rowData.push(`${i}${j}`);
    }
    tableData.push(rowData);
  }
  // Desativa um user
  const onCheckedChange = async isChecked => {
    setChecked(isChecked);

    const index = users.findIndex(usuario => userId === usuario.id);

    if (!isChecked) {
      const response = await api.delete('users', { params: { userId } });
      users[index].status_id = 2;
      Alert.alert('Sucesso', response.data.mss);
    }

    if (isChecked) {
      const response = await api.delete('users', { params: { userId } });
      users[index].status_id = 1;
      Alert.alert('Sucesso', response.data.mss);
    }
  };

  useEffect(() => {
    setLoadingShark(true);
    if (props.isFocused) {
      carregarUsuarios();
    }
  }, [props.isFocused]);

  // pagination

  return (
    <StyleProvider style={getTheme(material)}>
      {loadingShark ? (
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
                USÚARIOS
              </Title>
            </View>
          </View>

          <View
            // eslint-disable-next-line no-sparse-arrays
            style={[
              orientation === 'PORTRAIT'
                ? styles.headerSpacePORTRAIT
                : styles.headerSpaceLANDSCAPE,

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
            <TextInputMask
              style={styles.TxtMask}
              autoCorrect={false}
              autoCapitalize="none"
              type="cpf"
              value={buscaCpf}
              onChangeText={setBuscaCpf}
              returnKeyType="next"
              placeholder="Buscar CPF"
              placeholderTextColor={color.g1}
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
                      {users.map((rowData, index) => (
                        <TableWrapper
                          key={rowData.id}
                          style={[
                            styles.row,
                            index % 2 && { backgroundColor: '#F4F4F4' },
                          ]}
                        >
                          <Cell
                            data={rowData.nome}
                            textStyle={styles.text}
                            width={telaW40porcent}
                          />
                          <Cell
                            data={rowData.perfil}
                            textStyle={styles.text}
                            width={telaW30porcent}
                          />
                          <Cell
                            data={rowData.cpf}
                            textStyle={styles.text}
                            width={telaW30porcent}
                          />
                          <Cell
                            data={element(rowData, index)}
                            textStyle={styles.text}
                            width={70}
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
                  style={{ color: color.g1, fontSize: 35 }}
                />
              </Button>
              <TxtKitten
                style={
                  orientation === 'PORTRAIT'
                    ? styles.TituloModalPORTRAIT
                    : styles.TituloModalLANDSCAPE
                }
                category="h1"
              >
                usuário
              </TxtKitten>
              <View
                style={[
                  orientation === 'PORTRAIT'
                    ? styles.divFormPORTRAIT
                    : styles.divFormLANDSCAPE,
                ]}
              >
                <Form
                  style={{
                    padding: 0,
                    backgroundColor: color.g2,
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={[
                      orientation === 'PORTRAIT'
                        ? styles.divRowFormPORTRAIT
                        : styles.divRowFormLANDSCAPE,
                      { width: dimensionW },
                    ]}
                  >
                    <Select
                      style={
                        orientation === 'PORTRAIT'
                          ? styles.formInputPORTRAIT
                          : styles.formInputLANDSCAPE
                      }
                      selectedIndex={index}
                      onSelect={index => setIndex(index)}
                      value={perfis[index.row].nomePerfil}
                    >
                      {perfis.map(Perfil => (
                        <SelectItem key={Perfil.id} title={Perfil.nomePerfil} />
                      ))}
                    </Select>
                    <Toggle
                      style={
                        orientation === 'PORTRAIT'
                          ? styles.formInputPORTRAIT
                          : styles.formInputLANDSCAPE
                      }
                      checked={checked}
                      status="info"
                      onChange={onCheckedChange}
                      borderColor={color.g1}
                    />
                  </View>
                  <View
                    style={[
                      orientation === 'PORTRAIT'
                        ? styles.divRowFormPORTRAIT
                        : styles.divRowFormLANDSCAPE,
                      { width: dimensionW },
                    ]}
                  >
                    <Input
                      style={[
                        orientation === 'PORTRAIT'
                          ? styles.formInputPORTRAIT
                          : styles.formInputLANDSCAPE,
                      ]}
                      autoCorrect={false}
                      autoCapitalize="none"
                      value={nome}
                      disabled
                      onChangeText={setNome}
                      onSubmitEditing={() => cpfRef.current.focus()}
                      returnKeyType="next"
                      placeholder="Nome"
                    />

                    <FormInput
                      style={[
                        orientation === 'PORTRAIT'
                          ? styles.formInputPORTRAIT
                          : styles.formInputLANDSCAPE,
                      ]}
                      autoCorrect={false}
                      autoCapitalize="none"
                      ref={emailRef}
                      value={email}
                      onChangeText={setEmail}
                      onSubmitEditing={() => loginRef.current.focus()}
                      returnKeyType="next"
                      placeholder="E-mail"
                      placeholderTextColor={{ color: color.g1 }}
                    />
                  </View>

                  <View
                    style={[
                      orientation === 'PORTRAIT'
                        ? styles.divRowFormPORTRAIT
                        : styles.divRowFormLANDSCAPE,
                      { width: dimensionW },
                    ]}
                  >
                    <Input
                      // style={styles.TxtUpdate}
                      autoCorrect={false}
                      autoCapitalize="none"
                      ref={loginRef}
                      value={login}
                      disabled
                      style={[
                        orientation === 'PORTRAIT'
                          ? styles.formInputPORTRAIT
                          : styles.formInputLANDSCAPE,
                      ]}
                      onChangeText={setLogin}
                      onSubmitEditing={() => passwordRef.current.focus()}
                      returnKeyType="next"
                      placeholder="Login"
                    />
                    <Input
                      onChangeText={setCpf}
                      value={cpf}
                      style={[
                        orientation === 'PORTRAIT'
                          ? styles.formInputPORTRAIT
                          : styles.formInputLANDSCAPE,
                      ]}
                      disabled
                      placeholder="CPF"
                    />
                  </View>

                  <View
                    style={[
                      orientation === 'PORTRAIT'
                        ? styles.divRowFormPORTRAIT
                        : styles.divRowFormLANDSCAPE,
                      { width: dimensionW },
                    ]}
                  >
                    <FormInput
                      style={[
                        orientation === 'PORTRAIT'
                          ? styles.formInputPORTRAIT
                          : styles.formInputLANDSCAPE,
                      ]}
                      autoCorrect={false}
                      autoCapitalize="none"
                      ref={novaSenhaRef}
                      value={novaSenha}
                      secureTextEntry
                      onChangeText={setNovaSenha}
                      onSubmitEditing={() => novaSenha2Ref.current.focus()}
                      returnKeyType="next"
                      placeholder="Nova Senha"
                    />

                    <FormInput
                      style={[
                        orientation === 'PORTRAIT'
                          ? styles.formInputPORTRAIT
                          : styles.formInputLANDSCAPE,
                      ]}
                      autoCorrect={false}
                      autoCapitalize="none"
                      ref={novaSenha2Ref}
                      value={novaSenha2}
                      secureTextEntry
                      onChangeText={setNovaSenha2}
                      onSubmitEditing={submitAtualizaUsers}
                      returnKeyType="send"
                      placeholder="Confirme"
                      placeholderTextColor={color.g1}
                    />
                  </View>
                  <SubmitButton
                    loading={loading}
                    onPress={submitAtualizaUsers}
                    style={
                      orientation === 'PORTRAIT'
                        ? styles.subimitButtonPORTRAIT
                        : styles.subimitButtonLANDSCAPE
                    }
                  >
                    Atualizar
                  </SubmitButton>
                </Form>
              </View>
            </Card>
          </Modal>
        </Container>
      )}
    </StyleProvider>
  );
}

export default withNavigationFocus(UsersList);
