import React, { useState, useEffect, useRef } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  Dimensions,
  KeyboardType,
} from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import { TextInputMask } from 'react-native-masked-text';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DrawerActions } from 'react-navigation-drawer';
import { Button, StyleProvider, Container } from 'native-base';
import { Select, SelectItem, IndexPath } from '@ui-kitten/components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Lottie from 'lottie-react-native';
import shark from '../../assets/shark.json';
import getTheme from '../../../native-base-theme/components';
import material from '../../../native-base-theme/variables/material';
import color from '../../styles/colors';
import api from '../../services/api';
import { Title, FormInput, SubmitButton, Form } from './styles';

// CSS

const styles = StyleSheet.create({
  Icon: {
    fontSize: wp('7%'),
    color: color.g2,
    alignItems: 'center',
  },
  headerLANDSCAPE: {
    marginBottom: 2,
    height: hp('10%'),
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
    right: hp('4%'),
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
  TextInputMask: {
    borderRadius: 5,
    backgroundColor: color.g2,
    borderBottomColor: color.g1,
    borderRightColor: color.g2,
    borderLeftColor: color.g2,
    borderTopColor: color.g2,
    width: wp('40%'),
    height: hp('7%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('2%'),
    flexDirection: 'row',
    borderWidth: 2,
    color: color.g1,
    paddingHorizontal: 30,
  },
});

// codigos
function Users({ ...props }) {
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

  const [index, setIndex] = useState(new IndexPath(0));
  const [perfis, setPerfis] = useState([{ id: 0, nomePerfil: 'Perfil' }]);

  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const cpfRef = useRef();
  const emailRef = useRef();
  const loginRef = useRef();
  const passwordRef = useRef();

  // antes da tela

  async function carregarPerfis() {
    const response = await api.get('perfis');

    const perfisBanco = response.data;

    perfisBanco.map(perfil => {
      const ObjPerfis = {
        id: perfil.id,
        nomePerfil: perfil.perfil,
      };

      setPerfis(state => [...state, ObjPerfis]);

      // console.log(ObjPerfis);
    });
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    if (props.isFocused) {
      carregarPerfis();
    }
  }, [props.isFocused]);

  async function submitCadastroUsers() {
    const Perfil = perfis.find(
      perfil => perfil.nomePerfil === perfis[index.row].nomePerfil
    );

    const IDPerfil = Perfil.id;

    const itens = {
      nome,
      cpf,
      email,
      login,
      password,
      perfis_id: IDPerfil,
    };
    setLoading(true);
    setNome('');
    setCpf('');
    setEmail('');
    setLogin('');
    setPassword('');

    if (index > 0 && itens !== '') {
      const response = await api.post('users', itens);

      if (response.data.error) {
        Alert.alert('Error', response.data.error);
      } else {
        Alert.alert('Aviso', 'O usuário foi cadastrado com sucesso');
      }
    } else {
      Alert.alert('Erro no cadastro', 'Preencha todos os campos!');
    }
    setLoading(false);
  }

  return (
    <StyleProvider style={getTheme(material)}>
      {loading ? (
        <Container style={{ flex: 1 }}>
          <Lottie source={shark} autoPlay loop />
        </Container>
      ) : (
        <Container style={{ flex: 1 }}>
          <View // eslint-disable-next-line no-sparse-arrays
            style={[
              orientation === 'PORTRAIT'
                ? styles.headerPORTRAIT
                : styles.headerLANDSCAPE,
              ,
              { width: dimensionW },
            ]}
          >
            <Button
              style={{
                marginLeft: wp('3%'),
                alignItems: 'flex-end',
                justifyContent: 'flex-end',
              }}
              transparent
            >
              <Icon
                name="menu"
                onPress={() =>
                  props.navigation.dispatch(DrawerActions.openDrawer())
                }
                style={styles.Icon}
              />
            </Button>

            <View
              style={{
                backgroundColor: color.g1,
                flex: 2,
                alignItems: 'center',
                marginTop: 20,
                marginLeft: 20,
              }}
            >
              <Title
                style={[
                  orientation === 'PORTRAIT'
                    ? styles.titlePORTRAIT
                    : styles.titleLANDSCAPE,
                ]}
              >
                CADASTRO DE USUÁRIOS
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
                style={styles.formInput}
                autoCorrect={false}
                autoCapitalize="none"
                value={nome}
                onChangeText={setNome}
                onSubmitEditing={() => cpfRef.current.focus()}
                returnKeyType="next"
                placeholder="Nome"
              />

              <TextInputMask
                style={styles.TextInputMask}
                autoCorrect={false}
                autoCapitalize="none"
                type="cpf"
                value={cpf}
                onChangeText={setCpf}
                onSubmitEditing={() => emailRef.current.focus()}
                ref={cpfRef}
                returnKeyType="next"
                placeholder="CPF"
                placeholderTextColor={color.g1}
              />

              <FormInput
                style={styles.formInput}
                autoCorrect={false}
                autoCapitalize="none"
                ref={emailRef}
                value={email}
                onChangeText={setEmail}
                onSubmitEditing={() => loginRef.current.focus()}
                returnKeyType="next"
                placeholder="E-mail"
              />
            </Form>

            <Form
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
                value={perfis[index.row].nomePerfil}
              >
                {perfis.map(Perfil => (
                  <SelectItem key={Perfil.id} title={Perfil.nomePerfil} />
                ))}
              </Select>
              <FormInput
                style={styles.formInput}
                autoCorrect={false}
                autoCapitalize="none"
                ref={loginRef}
                value={login}
                onChangeText={setLogin}
                onSubmitEditing={() => passwordRef.current.focus()}
                returnKeyType="next"
                placeholder="Login"
              />
              <FormInput
                style={styles.formInput}
                autoCorrect={false}
                autoCapitalize="none"
                ref={passwordRef}
                value={password}
                secureTextEntry
                onChangeText={setPassword}
                onSubmitEditing={submitCadastroUsers}
                returnKeyType="send"
                placeholder="Senha"
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
              loading={loading}
              onPress={submitCadastroUsers}
              style={
                orientation === 'PORTRAIT'
                  ? styles.subimitButtonPORTRAIT
                  : styles.subimitButtonLANDSCAPE
              }
            >
              Cadastrar
            </SubmitButton>
          </View>
        </Container>
      )}
    </StyleProvider>
  );
}

export default withNavigationFocus(Users);
