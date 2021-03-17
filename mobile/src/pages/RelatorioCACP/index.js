import React, { useEffect, useState, useRef, useMemo } from 'react';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import {
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange,
} from 'react-native-responsive-screen';
import { withNavigationFocus } from 'react-navigation';
import { Button, StyleProvider, Container, Content } from 'native-base';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DrawerActions } from 'react-navigation-drawer';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import {
  Button as BtnKitten,
  Card,
  Modal,
  Text as TxtKitten,
  Select,
  SelectItem,
  IndexPath,
  Datepicker,
  Icon as IconKitten,
  Spinner,
} from '@ui-kitten/components';
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
    left: wp('3%'),
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

  divModalPORTRAIT: {
    alignItems: 'center',
  },

  divModalLANDSCAPE: {
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
    width: wp('50%'),
    height: hp('5%'),
    marginBottom: hp('20%'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  subimitButtonLANDSCAPE: {
    width: wp('50%'),
    height: hp('3%'),
    marginBottom: hp('15%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  formInputLANDSCAPE: {
    width: wp('35%'),
    height: hp('6%'),
    marginHorizontal: wp('2%'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  formInputPORTRAIT: {
    marginLeft: wp('3%'),
    width: wp('35%'),
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
    bottom: hp('5%'),
    marginLeft: wp('3%'),
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
  Cell: {
    margin: 30,
  },
  HeaderTable: {
    margin: 10,
  },
  container: {
    flex: 1,
    marginTop: 2,
    backgroundColor: '#fff',
  },

  head: {
    height: 40,
    backgroundColor: 'rgba(27,149,224,1)',
  },
  text2: {
    margin: 6,
    fontSize: hp('1.7%'),
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text: {
    margin: 7,
    fontSize: hp('1.7%'),
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
  dataWrapper2: {
    marginTop: -70,
  },
  BtnBuscar: {
    margin: 5,
    top: 50,
    right: 200,
  },

  TxtMask: {
    marginBottom: 10,
    marginLeft: 20,
    marginRight: 10,
    width: 380,
    height: 40,
    borderRadius: 5,
    backgroundColor: color.backgroundView,
    alignItems: 'center',
    flexDirection: 'row',
    color: color.g2,
    paddingHorizontal: 30,
    right: 30,
    top: 100,
  },
  Form1: {
    right: 20,
    marginLeft: 30,
    bottom: 50,
  },

  BtnAtualizar: {
    top: 250,
    right: 140,
    left: 20,
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
    alignSelf: 'center',
  },

  Toggle: {
    left: 110,
    top: 20,
  },

  Datepicker2: {
    marginBottom: 10,
    marginLeft: 5,
    marginRight: 5,
    height: hp('7%'),
    width: wp('35%'),
  },

  Datepicker: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    height: hp('7%'),
    width: wp('35%'),
  },

  selectAnalisePORTRAIT: {
    bottom: hp('5%'),
    marginLeft: wp('9%'),
    height: hp('5%'),
    width: wp('72%'),
  },

  selectAnaliseLANDSCAPE: {
    bottom: hp('5%'),
    marginLeft: wp('39%'),
    height: hp('5%'),
    width: wp('72%'),
  },

  btnMenuPortrat: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },

  btnMenuLandscape: {
    bottom: 50,
    left: 30,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  divFormLANDSCAPE: {
    bottom: hp('5%'),
    justifyContent: 'center',
    alignItems: 'center',
    left: wp('45%'),
    backgroundColor: color.g2,
  },

  divFormPORTRAIT: {
    alignItems: 'center',
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
    right: hp('28%'),
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

  divRowFormHidrogeronPORTRAIT: {
    paddingBottom: hp('5%'),
    backgroundColor: color.g2,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  divRowFormHidrogeronLANDSCAPE: {
    paddingTop: hp('1%'),
    backgroundColor: color.g2,
    alignItems: 'center',
    flexDirection: 'row',
    left: hp('13%'),
  },
});

// codigos
function RelatorioPQA({ ...props }) {
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

  //---------------------------------------------------------------------------

  // USADO NO CACP
  const [analises, setAnalises] = useState([]);
  const [relatorioCacp, setRelatorioCacp] = useState([]);
  const [index2, setIndex2] = useState([new IndexPath(0)]);
  const [relatorioCacpId, setRelatorioCacpId] = useState(0);
  const [index, setIndex] = useState(new IndexPath(0));
  const [index3, setIndex3] = useState(new IndexPath(0));

  const [selectPiscinas, setSelectPiscinas] = useState([
    { id: 0, nomePiscina: 'Piscinas' },
  ]);

  const [selectAnalises, setSelectAnalises] = useState([
    { id: 0, nomeAnalise: 'Analise' },
  ]);
  // modal
  const [cloro, setCloro] = useState('');
  const [ph, setPh] = useState('');
  const [temperatura, setTemperatura] = useState('');
  const [temperaturaAmbiente, setTemperaturaAmbiente] = useState('');
  const [temperaturaRio, setTemperaturaRio] = useState('');
  const [hidrogeron, setHidrogeron] = useState('');
  const [qualidadeAgua, setQualidadeAgua] = useState('');
  const [loading, setLoading] = useState(false);

  const phRef = useRef();
  const temperaturaRef = useRef();
  const temperaturaAmbRef = useRef();
  const temperaturaRioRef = useRef();
  const cloroRef = useRef();
  const hidrogeronRef = useRef();
  const qualidadeAguaRef = useRef();

  const [piscinaId, setPiscinaId] = useState(false);
  const [analiseId, setAnaliseId] = useState(false);
  // date PICKER

  const [date, setDate] = React.useState(null);
  const [date2, setDate2] = React.useState(null);

  // ATE AQUI
  const [users, setUsers] = useState([]);
  const [visible, setVisible] = useState(false);

  const [buscaPiscina, setBuscaPiscina] = useState('');
  const [checked, setChecked] = useState(null);
  // select mult
  const groupDisplayValues = index2.map(index => {
    const groupTitle = Object.keys(analises)[index.row];
    if (groupTitle) {
      // salva um estado de um array com useState!
      return analises[groupTitle].nomeAnalise;
    }

    return '';
  });

  // RCACP

  async function carregarAnalises() {
    setAnalises([]);

    const response = await api.get('analises');

    const analisesBanco = response.data;

    analisesBanco.map(analise => {
      const ObjAnalise = {
        id: analise.id,
        nomeAnalise: analise.analise,
      };

      setAnalises(state => [...state, ObjAnalise]);
    });
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    if (props.isFocused) {
      carregarAnalises();
    }
  }, [props.isFocused]);

  // Função que atualiza um dado do RelatórioCACP
  async function submitAtualizaCACP() {
    const formCACPID = relatorioCacp.find(cacp => cacp.id === relatorioCacpId);

    const idCacp = formCACPID.id;

    const Piscina = selectPiscinas.find(
      piscina => piscina.nomePiscina === selectPiscinas[index.row].nomePiscina
    );

    const idPiscina = Piscina.id;

    const Analise = selectAnalises.find(
      analise => analise.nomeAnalise === selectAnalises[index3.row].nomeAnalise
    );

    const idAnalise = Analise.id;

    const itens = {
      id: idCacp,
      piscina_id: idPiscina,
      cloro: parseFloat(cloro),
      PH: parseFloat(ph),
      temperatura: parseFloat(temperatura),
      hidrogeron: parseFloat(hidrogeron),
      qualidade_agua: parseFloat(qualidadeAgua),
      analise_id: idAnalise,
    };

    // console.log(itens);

    setLoading(true);
    if (itens !== '') {
      await api.put('formularios', itens);
      Alert.alert('Aviso', 'O formulario foi atualizado com sucesso');
    } else {
      Alert.alert('Erro no cadastro', 'Preencha todos os campos!');
    }
    setLoading(false);
  }
  //-------------------------------------------------------------------
  // Edita a tabela que é renderizada
  const tableHead = [
    'Piscinas',
    'Cloro',
    'PH',
    ' °C',
    'Água',
    'H%',
    'N°',
    'Ambiente°C',
    'Rio°C',
    'Data / Hora',
    'Analista Responsável',
    'Edit',
  ];
  const tamanho = [
    telaW25porcent,
    telaW15porcent,
    telaW15porcent,
    telaW15porcent,
    telaW15porcent,
    telaW15porcent,
    telaW15porcent,
    telaW15porcent,
    telaW15porcent,
    telaW25porcent,
    telaW30porcent,
    70,
  ];
  // função que retorna uma unica piscina pesquisada
  async function Buscar() {
    setRelatorioCacp([]);
    setLoading(true);

    const analisesSelecionadas = groupDisplayValues;

    if (date === null || date2 === null) {
      Alert.alert('Error', 'A data não pode estar vazia!');
      setLoading(false);
      return null;
    }

    const dataInicial = format(new Date(date), 'dd/MM/yyyy  HH:mm:ss');

    const dataFinal = format(new Date(date2), 'dd/MM/yyyy  HH:mm:ss');

    const itens = {
      createdAt: dataInicial,
      filtroData: dataFinal,
      listaAnalises: analisesSelecionadas,
      tipo_item_id: 1,
    };

    // console.log(itens);

    if (itens !== '') {
      const response = await api.get('formularios', { params: itens });

      const cacpBanco = response.data;
      // console.log(cacpBanco);

      cacpBanco.map(cacp => {
        const ObjCacp = {
          id: cacp.id,
          cloro: cacp.cloro.toString().replace('.', ','),
          qualidade_agua: cacp.qualidade_agua,
          temperatura: cacp.temperatura.toString().replace('.', ','),
          hidrogeron: cacp.hidrogeron.toString().replace('.', ','),
          temperatura_ambiente: cacp.temperatura_ambiente
            .toString()
            .replace('.', ','),
          temperatura_rio: cacp.temperatura_rio.toString().replace('.', ','),
          creatd_at: format(new Date(cacp.created_at), 'dd/MM/yyyy  HH:mm'),
          user_id: cacp.users.nome,
          piscina_id: cacp.piscinas.piscina,
          status_id: cacp.status_id,
          ph: cacp.ph.toString().replace('.', ','),
          analise_id: cacp.analises.analise,
          analiseId: cacp.analise_id,
          piscinaId: cacp.piscina_id,
        };

        // console.log(ObjCacp);
        setRelatorioCacp(states => [...states, ObjCacp]);
      });
    } else {
      Alert.alert('Error', 'Escolha um filtro correto!');
    }
    setLoading(false);
    // console.log(usersBanco);
  }
  // Modal que abre para atualizar um dado
  async function ModalUpdate(index) {
    const response = await api.get('analises');
    let contar = 0;
    const analisesBanco = response.data;

    analisesBanco.map(async analise => {
      const ObjAnalise = {
        id: analise.id,
        nomeAnalise: analise.analise,
      };
      contar += 1;
      setSelectAnalises(state => [...state, ObjAnalise]);
      if (analise.id === relatorioCacp[index].analiseId) {
        setIndex3(new IndexPath(contar));
      }
      // console.log(index3);
    });
    const item = {
      tipo_item_id: 1,
    };
    const response2 = await api.get('piscinas', { params: item });
    let contar1 = 0;
    const piscinasBanco = response2.data;

    piscinasBanco.map(async piscina => {
      const ObjPiscina = {
        id: piscina.id,
        nomePiscina: piscina.piscina,
      };
      contar1 += 1;
      setSelectPiscinas(state => [...state, ObjPiscina]);
      if (piscina.id === relatorioCacp[index].piscinaId) {
        setIndex(new IndexPath(contar1));
      }
    });

    setVisible(true);
    setRelatorioCacpId(relatorioCacp[index].id);
    setCloro(relatorioCacp[index].cloro.toString());
    setQualidadeAgua(relatorioCacp[index].qualidade_agua.toString());
    setTemperatura(relatorioCacp[index].temperatura.toString());
    setHidrogeron(relatorioCacp[index].hidrogeron.toString());
    setTemperaturaAmbiente(
      relatorioCacp[index].temperatura_ambiente.toString()
    );

    setTemperaturaRio(relatorioCacp[index].temperatura_rio.toString());
    setPh(relatorioCacp[index].ph.toString());

    setChecked(relatorioCacp[index].status_id === 1);
  }
  //---------------------------------------------------------------------
  // Elemento Edit que aparece em todas tuplas da tabela
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
  // deixa a tabela com 2 cores
  const tableData = [];
  for (let i = 0; i < 30; i += 1) {
    const rowData = [];
    for (let j = 0; j < 9; j += 1) {
      rowData.push(`${i}${j}`);
    }
    tableData.push(rowData);
  }
  // DATEPICKER CODE
  const CalendarIcon = props => <IconKitten {...props} name="calendar" />;

  // pagination

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
                Relatório CACP
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
              height: hp('10%'),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Datepicker
              style={styles.Datepicker}
              placeholder="Data Inicial"
              date={date}
              onSelect={nextDate => setDate(nextDate)}
              accessoryRight={CalendarIcon}
            />
            <Datepicker
              style={styles.Datepicker2}
              placeholder="Data Final"
              date={date2}
              onSelect={nextDate => setDate2(nextDate)}
              accessoryRight={CalendarIcon}
              placement="bottom end"
            />

            <Button
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                paddingTop: hp('4%'),
                marginLeft: wp('2%'),
              }}
              iconLeft
              transparent
            >
              {loading ? (
                <View style={{ marginLeft: wp('3.5%') }}>
                  <Spinner status="basic" />
                </View>
              ) : (
                <Icon
                  name="search"
                  onPress={Buscar}
                  style={styles.IconSearch}
                />
              )}
            </Button>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: dimensionW,
              backgroundColor: color.g1,
              height: hp('10%'),
              alignItems: 'center',
            }}
          >
            <Select
              style={[
                orientation === 'PORTRAIT'
                  ? styles.selectAnalisePORTRAIT
                  : styles.selectAnaliseLANDSCAPE,
              ]}
              multiSelect
              selectedIndex={index2}
              value={groupDisplayValues.join(',')}
              onSelect={index => setIndex2(index)}
            >
              {analises.map(analise => (
                <SelectItem key={analise.id} title={analise.nomeAnalise} />
              ))}
            </Select>
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
                      {relatorioCacp.map((rowData, index) => (
                        <TableWrapper
                          key={rowData.id}
                          style={[
                            styles.row,
                            index % 2 && {
                              backgroundColor: '#F4F4F4',
                            },
                          ]}
                        >
                          <Cell
                            data={rowData.piscina_id}
                            textStyle={styles.text}
                            width={telaW25porcent}
                          />

                          <Cell
                            data={rowData.cloro}
                            textStyle={styles.text}
                            width={telaW15porcent}
                          />
                          <Cell
                            data={rowData.ph}
                            textStyle={styles.text}
                            width={telaW15porcent}
                          />
                          <Cell
                            data={`${rowData.temperatura} °C`}
                            textStyle={styles.text}
                            width={telaW15porcent}
                          />
                          <Cell
                            data={rowData.qualidade_agua}
                            textStyle={styles.text}
                            width={telaW15porcent}
                          />
                          <Cell
                            data={`${rowData.hidrogeron} %`}
                            textStyle={styles.text}
                            width={telaW15porcent}
                          />
                          <Cell
                            data={`${rowData.analise_id} º`}
                            textStyle={styles.text}
                            width={telaW15porcent}
                          />
                          <Cell
                            data={`${rowData.temperatura_ambiente} °C`}
                            textStyle={styles.text}
                            width={telaW15porcent}
                          />
                          <Cell
                            data={`${rowData.temperatura_rio} °C`}
                            textStyle={styles.text}
                            width={telaW15porcent}
                          />

                          <Cell
                            data={rowData.creatd_at}
                            textStyle={styles.text}
                            width={telaW25porcent}
                          />
                          <Cell
                            data={rowData.user_id}
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
              <View
                style={
                  orientation === 'PORTRAIT'
                    ? styles.divModalPORTRAIT
                    : styles.divModalLANDSCAPE
                }
              >
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
                        selectedIndex={index3}
                        onSelect={index => setIndex3(index)}
                        value={selectAnalises[index3.row].nomeAnalise}
                      >
                        {selectAnalises.map(analise => (
                          <SelectItem
                            key={analise.id}
                            title={analise.nomeAnalise}
                          />
                        ))}
                      </Select>
                      <Select
                        style={
                          orientation === 'PORTRAIT'
                            ? styles.formInputPORTRAIT
                            : styles.formInputLANDSCAPE
                        }
                        selectedIndex={index}
                        onSelect={index => setIndex(index)}
                        value={selectPiscinas[index.row].nomePiscina}
                      >
                        {selectPiscinas.map(piscina => (
                          <SelectItem
                            key={piscina.id}
                            title={piscina.nomePiscina}
                          />
                        ))}
                      </Select>
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
                        style={
                          orientation === 'PORTRAIT'
                            ? styles.formInputPORTRAIT
                            : styles.formInputLANDSCAPE
                        }
                        autoCorrect={false}
                        autoCapitalize="none"
                        ref={cloroRef}
                        keyboardType="numeric"
                        value={cloro}
                        onChangeText={setCloro}
                        returnKeyType="next"
                        onSubmitEditing={() => qualidadeAguaRef.current.focus()}
                        placeholder="Cloro"
                      />
                      <FormInput
                        style={
                          orientation === 'PORTRAIT'
                            ? styles.formInputPORTRAIT
                            : styles.formInputLANDSCAPE
                        }
                        autoCorrect={false}
                        autoCapitalize="none"
                        ref={qualidadeAguaRef}
                        keyboardType="numeric"
                        value={qualidadeAgua}
                        onChangeText={setQualidadeAgua}
                        onSubmitEditing={() => phRef.current.focus()}
                        returnKeyType="next"
                        placeholder="Qualidade de água"
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
                        style={
                          orientation === 'PORTRAIT'
                            ? styles.formInputPORTRAIT
                            : styles.formInputLANDSCAPE
                        }
                        autoCorrect={false}
                        autoCapitalize="none"
                        ref={phRef}
                        keyboardType="numeric"
                        value={ph}
                        onChangeText={setPh}
                        returnKeyType="next"
                        onSubmitEditing={() => temperaturaRef.current.focus()}
                        placeholder="PH"
                      />
                      <FormInput
                        style={
                          orientation === 'PORTRAIT'
                            ? styles.formInputPORTRAIT
                            : styles.formInputLANDSCAPE
                        }
                        autoCorrect={false}
                        autoCapitalize="none"
                        ref={temperaturaRef}
                        keyboardType="numeric"
                        value={temperatura}
                        onChangeText={setTemperatura}
                        returnKeyType="next"
                        onSubmitEditing={() => hidrogeronRef.current.focus()}
                        placeholder="Temperatura"
                      />
                    </View>

                    <View
                      style={[
                        orientation === 'PORTRAIT'
                          ? styles.divRowFormPORTRAIT
                          : styles.divRowFormLANDSCAPE,
                        { width: dimensionW },
                      ]}
                    />

                    <View
                      style={[
                        orientation === 'PORTRAIT'
                          ? styles.divRowFormHidrogeronPORTRAIT
                          : styles.divRowFormHidrogeronLANDSCAPE,
                        { width: dimensionW },
                      ]}
                    >
                      <FormInput
                        style={
                          orientation === 'PORTRAIT'
                            ? styles.formInputPORTRAIT
                            : styles.formInputLANDSCAPE
                        }
                        autoCorrect={false}
                        keyboardType="numeric"
                        autoCapitalize="none"
                        ref={hidrogeronRef}
                        value={hidrogeron}
                        onChangeText={setHidrogeron}
                        returnKeyType="send"
                        onSubmitEditing={submitAtualizaCACP}
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
                        onPress={submitAtualizaCACP}
                      >
                        Enviar
                      </SubmitButton>
                    </View>
                  </Form>
                </View>
              </View>
            </Card>
          </Modal>
        </Container>
      )}
    </StyleProvider>
  );
}

export default withNavigationFocus(RelatorioPQA);
