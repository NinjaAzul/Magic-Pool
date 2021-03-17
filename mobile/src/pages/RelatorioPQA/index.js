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
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange,
} from 'react-native-responsive-screen';
import { format } from 'date-fns';
import { Button, StyleProvider, Container, Content } from 'native-base';
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
  Datepicker,
  Icon as IconKitten,
  Layout,
  NativeDateService,
  Spinner,
} from '@ui-kitten/components';
import { TextInputMask } from 'react-native-masked-text';
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
    marginTop: hp('10%'),
    alignItems: 'center',
    justifyContent: 'center',
  },

  subimitButtonLANDSCAPE: {
    width: wp('50%'),
    height: hp('5%'),
    marginBottom: hp('100%'),
    alignItems: 'center',
    justifyContent: 'center',
    right: wp('43%'),
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
    color: color.g1,
    alignSelf: 'center',
  },

  TituloModalLANDSCAPE: {
    bottom: hp('5%'),
    marginLeft: wp('63%'),
    color: color.g1,
  },

  togglePORTRAIT: {
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
    margin: 20,
  },
  legendaExelente: {
    marginTop: 3,
    marginHorizontal: 0,
    height: 40,
    backgroundColor: 'rgba(27,149,224,1)',
  },
  legendaOtimo: {
    marginHorizontal: 0,
    marginTop: 3,
    height: 40,
    backgroundColor: 'rgba(27,149,224,1)',
  },
  legendaBom: {
    marginHorizontal: 0,
    marginTop: 3,
    height: 40,
    backgroundColor: 'rgba(27,149,224,1)',
  },
  legendaRuim: {
    marginHorizontal: 0,
    marginTop: 3,
    height: 40,
    backgroundColor: 'rgba(27,149,224,1)',
  },
  legendaPessimo: {
    marginHorizontal: 0,
    marginTop: 3,
    height: 40,
    backgroundColor: 'rgba(27,149,224,1)',
  },

  HeaderTable: {
    margin: 10,
  },
  container: { flex: 1, marginTop: 2, backgroundColor: '#fff' },
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
  BtnBuscar: {
    position: 'absolute',
    top: 98,
    left: 350,
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

  Toggle: {
    left: 110,
    top: 20,
  },
  Datepicker2: {
    marginLeft: 5,
    marginRight: 5,
    height: hp('7%'),
    width: wp('35%'),
  },

  Datepicker: {
    marginLeft: 5,
    marginRight: 5,
    height: hp('7%'),
    width: wp('35%'),
  },

  BottonMenu: {
    right: 30,
    bottom: 45,
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.g2,
  },
});

// codigos
export default function RelatorioPQA({ ...props }) {
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
  // Função Atualiza PQA.
  const [index, setIndex] = useState(new IndexPath(0));
  const [selected, setSelected] = useState(0);
  const [piscinas, setPiscinas] = useState([
    { id: 0, nomePiscina: 'Piscinas' },
  ]);

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
  // -----------------------------------------------------------

  const [piscina, setPiscina] = useState('');
  // date PICKER
  const [date, setDate] = React.useState(null);
  const [date2, setDate2] = React.useState(null);

  const [piscinaId, setPiscinaId] = useState(false);

  const [relatorioPQA, setRelatorioPQA] = useState([]);
  const [relatorioPQAId, setRelatorioPQAId] = useState(0);

  const [users, setUsers] = useState([]);
  const [visible, setVisible] = useState(false);

  const [checked, setChecked] = useState(null);

  // Função que atualiza um dado do RelatórioPQA
  async function submitAtualizaPQA() {
    const formCACPID = relatorioPQA.find(cacp => cacp.id === relatorioPQAId);

    const idCacp = formCACPID.id;

    const Piscina = piscinas.find(
      piscina => piscina.nomePiscina === piscinas[index.row].nomePiscina
    );

    const idPiscina = Piscina.id;

    const itens = {
      id: idCacp,
      piscina_id: idPiscina,
      agua: parseFloat(agua),
      borda: parseFloat(borda),
      odor: parseFloat(odor),
      residuos: parseFloat(residuos),
      nivel: parseFloat(nivel),
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
  //----------------------------------------------------------------------
  const { width, height } = Dimensions.get('window');

  const novaDimencao = width / 5;
  // Edita a tabela que é renderizada
  const tableLegend = ['1 = Exelente'];

  const tamanhoLegend = [novaDimencao];
  // OTIMO
  const tableLegendOtimo = ['2 = Otimo'];

  const tamanhoLegendOtimo = [novaDimencao];
  // BOM
  const tableLegendBom = ['3 = Bom'];

  const tamanhoLegendBom = [novaDimencao];
  // RUIM
  const tableLegendRuim = ['4 = Ruim'];

  const tamanhoLegendRuim = [novaDimencao];
  // Péssimo
  const tableLegendPessimo = ['5 = Pessimo'];

  const tamanhoLegendPessimo = [novaDimencao];

  const tableHead = [
    'Piscinas',
    'Água',
    'Borda',
    'Odor',
    'Residuos',
    'Nivel',
    'Data/Hora',
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
    telaW35porcent,
    telaW35porcent,
    80,
  ];
  // função que retorna uma analise PQA pesquisada
  async function Buscar() {
    setRelatorioPQA([]);
    setLoading(true);

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
      tipo_item_id: 2,
    };

    // console.log(itens);

    if (date !== '' && date2 !== '') {
      const response = await api.get('formularios', { params: itens });

      const pqaBanco = response.data;
      // console.log(pqaBanco);
      pqaBanco.map(pqa => {
        const ObjPQA = {
          id: pqa.id,
          agua: pqa.agua,
          borda: pqa.borda,
          odor: pqa.odor,
          nivel: pqa.nivel,
          residuos: pqa.residuos,
          creatd_at: format(new Date(pqa.created_at), 'dd/MM/yyyy HH:mm'),
          user_id: pqa.users.nome,
          piscina_id: pqa.piscinas.piscina,
          status_id: pqa.status_id,
          piscinaId: pqa.piscina_id,
        };

        // console.log(ObjCacp);

        setRelatorioPQA(states => [...states, ObjPQA]);
      });
    } else {
      Alert.alert('Error', 'Escolha um filtro correto!');
    }
    setLoading(false);
    // console.log(usersBanco);
  }
  //-----------------------------------------------------------

  // Modal que abre para atualizar um dado
  async function ModalUpdate(index) {
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
      setPiscinas(state => [...state, ObjPiscina]);
      if (piscina.id === relatorioPQA[index].piscinaId) {
        setIndex(new IndexPath(contar1));
      }
    });

    setVisible(true);
    setRelatorioPQAId(relatorioPQA[index].id);
    setAgua(relatorioPQA[index].agua.toString());
    setBorda(relatorioPQA[index].borda.toString());
    setOdor(relatorioPQA[index].odor.toString());
    setResiduos(relatorioPQA[index].residuos.toString());
    setNivel(relatorioPQA[index].nivel.toString());
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

  return (
    <StyleProvider style={getTheme(material)}>
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
            <TxtKitten
              style={[
                orientation === 'PORTRAIT'
                  ? styles.titlePORTRAIT
                  : styles.titleLANDSCAPE,
              ]}
            >
              Relatório PQA
            </TxtKitten>
          </View>
        </View>

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
              <Icon name="search" onPress={Buscar} style={styles.IconSearch} />
            )}
          </Button>
        </View>

        <Content>
          <View style={{ flexDirection: 'row' }}>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#E0FFFF' }}>
              <Row
                widthArr={tamanhoLegend}
                data={tableLegend}
                style={styles.legendaExelente}
                textStyle={styles.text2}
              />
            </Table>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#E0FFFF' }}>
              <Row
                widthArr={tamanhoLegendOtimo}
                data={tableLegendOtimo}
                style={styles.legendaOtimo}
                textStyle={styles.text2}
              />
            </Table>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#E0FFFF' }}>
              <Row
                widthArr={tamanhoLegendBom}
                data={tableLegendBom}
                style={styles.legendaBom}
                textStyle={styles.text2}
              />
            </Table>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#E0FFFF' }}>
              <Row
                widthArr={tamanhoLegendRuim}
                data={tableLegendRuim}
                style={styles.legendaRuim}
                textStyle={styles.text2}
              />
            </Table>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#E0FFFF' }}>
              <Row
                widthArr={tamanhoLegendPessimo}
                data={tableLegendPessimo}
                style={styles.legendaPessimo}
                textStyle={styles.text2}
              />
            </Table>
          </View>
          <View style={styles.container}>
            <ScrollView horizontal>
              <View>
                <Table borderStyle={{ borderWidth: 1, borderColor: '#E0FFFF' }}>
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
                    {relatorioPQA.map((rowData, index) => (
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
                          data={rowData.agua}
                          textStyle={styles.text}
                          width={telaW15porcent}
                        />
                        <Cell
                          data={rowData.borda}
                          textStyle={styles.text}
                          width={telaW15porcent}
                        />
                        <Cell
                          data={rowData.odor}
                          textStyle={styles.text}
                          width={telaW15porcent}
                        />
                        <Cell
                          data={rowData.residuos}
                          textStyle={styles.text}
                          width={telaW15porcent}
                        />
                        <Cell
                          data={rowData.nivel}
                          textStyle={styles.text}
                          width={telaW15porcent}
                        />
                        <Cell
                          data={rowData.creatd_at}
                          textStyle={styles.text}
                          width={telaW35porcent}
                        />
                        <Cell
                          data={rowData.user_id}
                          textStyle={styles.text}
                          width={telaW35porcent}
                        />
                        <Cell
                          data={element(rowData, index)}
                          textStyle={styles.text}
                          width={80}
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
              PQA
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
                  <FormInput
                    style={
                      orientation === 'PORTRAIT'
                        ? styles.formInputPORTRAIT
                        : styles.formInputLANDSCAPE
                    }
                    autoCorrect={false}
                    autoCapitalize="none"
                    keyboardType="numeric"
                    value={agua}
                    onChangeText={setAgua}
                    returnKeyType="next"
                    onSubmitEditing={() => bordaRef.current.focus()}
                    placeholder="Agua"
                  />

                  <Select
                    style={
                      orientation === 'PORTRAIT'
                        ? styles.formInputPORTRAIT
                        : styles.formInputLANDSCAPE
                    }
                    selectedIndex={index}
                    onSelect={index => setIndex(index)}
                    value={piscinas[index.row].nomePiscina}
                  >
                    {piscinas.map(piscina => (
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
                    keyboardType="numeric"
                    ref={bordaRef}
                    value={borda}
                    onChangeText={setBorda}
                    returnKeyType="next"
                    onSubmitEditing={() => residuosRef.current.focus()}
                    placeholder="Borda"
                  />
                  <FormInput
                    style={
                      orientation === 'PORTRAIT'
                        ? styles.formInputPORTRAIT
                        : styles.formInputLANDSCAPE
                    }
                    autoCorrect={false}
                    keyboardType="numeric"
                    autoCapitalize="none"
                    ref={residuosRef}
                    value={residuos}
                    onChangeText={setResiduos}
                    returnKeyType="next"
                    onSubmitEditing={() => odorRef.current.focus()}
                    placeholder="Resíduos"
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
                    keyboardType="numeric"
                    ref={odorRef}
                    value={odor}
                    onChangeText={setOdor}
                    returnKeyType="next"
                    onSubmitEditing={() => nivelRef.current.focus()}
                    placeholder="Odor"
                  />

                  <FormInput
                    style={
                      orientation === 'PORTRAIT'
                        ? styles.formInputPORTRAIT
                        : styles.formInputLANDSCAPE
                    }
                    autoCorrect={false}
                    autoCapitalize="none"
                    keyboardType="numeric"
                    ref={nivelRef}
                    value={nivel}
                    onChangeText={setNivel}
                    returnKeyType="send"
                    onSubmitEditing={submitAtualizaPQA}
                    placeholder="Nível"
                  />
                </View>

                <SubmitButton
                  style={
                    orientation === 'PORTRAIT'
                      ? styles.subimitButtonPORTRAIT
                      : styles.subimitButtonLANDSCAPE
                  }
                  loading={loading}
                  onPress={submitAtualizaPQA}
                >
                  Enviar
                </SubmitButton>
              </Form>
            </View>
          </Card>
        </Modal>
      </Container>
    </StyleProvider>
  );
}
