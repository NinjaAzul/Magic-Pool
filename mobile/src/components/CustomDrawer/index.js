/* eslint-disable no-nested-ternary */
import React from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container,
  Header,
  Content,
  Body,
  Title,
  Footer,
  FooterTab,
} from 'native-base';
import { withNavigationFocus } from 'react-navigation';
import { Button, Icon, Menu, MenuGroup, MenuItem } from '@ui-kitten/components';
import { DrawerActions } from 'react-navigation-drawer';
import { signOut } from '../../store/modules/auth/actions';
import color from '../../styles/colors';

// import { Container } from './styles';

const styles = StyleSheet.create({
  Header: {
    backgroundColor: color.g1,
    marginTop: 0,
  },
  Icon: {
    fontSize: 30,
    color: color.g2,
  },
  Icon2: {
    height: 60,

    width: 70,
    left: 30,

    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  controlContainer: {
    margin: 2,
    padding: 6,
    borderRadius: 4,
    justifyContent: 'center',
  },
  Footer: {
    backgroundColor: color.g1,
    height: 30,
  },
  FooterTab: {
    backgroundColor: color.g1,
    height: 40,
  },
  Button1: {
    backgroundColor: color.g1,
    marginLeft: 230,
    height: 30,
  },
});
// icon menu

const Cadastrar = props => <Icon {...props} name="file-add-outline" />;
const Logout = props => <Icon {...props} name="log-out-outline" />;
const Listar = props => <Icon {...props} name="file-text-outline" />;
const User = props => <Icon {...props} name="people-outline" />;
const Pasta = props => <Icon {...props} name="folder-outline" />;
const Sol = props => <Icon {...props} name="sun-outline" />;

const MenuOut = props => (
  <Icon width={30} height={30} {...props} name="menu-arrow-outline" />
);

function CustomDrawer({ ...props }) {
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  const dispatch = useDispatch();
  const UserPerfil = useSelector(state => state.user.profile.perfilUser);

  function SubmitLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Header style={styles.Header}>
        <StatusBar barStyle="light-content" backgroundColor={color.g1} />
        <Body>
          <Title style={{ fontFamily: 'bold' }}>{UserPerfil}</Title>
        </Body>
        <Button
          style={styles.Icon2}
          status={color.g2}
          onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
          accessoryLeft={MenuOut}
          appearance="ghost"
        />
      </Header>

      <Content>
        <>
          {UserPerfil === 'Gerencial' ? (
            <Menu
              selectedIndex={selectedIndex}
              onSelect={index => setSelectedIndex(index)}
            >
              <MenuGroup title="CACP" accessoryLeft={Pasta}>
                <MenuItem
                  title="Nova Analise CACP"
                  onPress={() => props.navigation.navigate('CACP')}
                  accessoryLeft={Cadastrar}
                />
                <MenuItem
                  title="Relátorio CACP"
                  onPress={() => props.navigation.navigate('RelatorioCACP')}
                  accessoryLeft={Listar}
                />
              </MenuGroup>
              <MenuGroup title="PQA" accessoryLeft={Pasta}>
                <MenuItem
                  title="Nova Analise PQA"
                  onPress={() => props.navigation.navigate('PQA')}
                  accessoryLeft={Cadastrar}
                />
                <MenuItem
                  title="Relátorio PQA"
                  onPress={() => props.navigation.navigate('RelatorioPQA')}
                  accessoryLeft={Listar}
                />
              </MenuGroup>
              <MenuGroup title="Piscinas" accessoryLeft={Pasta}>
                <MenuItem
                  title="Cadastrar"
                  onPress={() => props.navigation.navigate('Piscinas')}
                  accessoryLeft={Cadastrar}
                />
                <MenuItem
                  title="Lista de Piscinas"
                  onPress={() => props.navigation.navigate('PiscinasList')}
                  accessoryLeft={Listar}
                />
              </MenuGroup>
              <MenuItem
                title="Temperatura Diaria"
                onPress={() => props.navigation.navigate('Temperatura')}
                accessoryLeft={Sol}
              />
            </Menu>
          ) : UserPerfil === 'Operacional' ? (
            <Menu
              selectedIndex={selectedIndex}
              onSelect={index => setSelectedIndex(index)}
            >
              <MenuGroup title="CACP" accessoryLeft={Pasta}>
                <MenuItem
                  title="Nova Analise CACP"
                  onPress={() => props.navigation.navigate('CACP')}
                  accessoryLeft={Cadastrar}
                />
              </MenuGroup>
              <MenuGroup title="PQA" accessoryLeft={Pasta}>
                <MenuItem
                  title="Nova Analise PQA"
                  onPress={() => props.navigation.navigate('PQA')}
                  accessoryLeft={Cadastrar}
                />
              </MenuGroup>
              <MenuItem
                title="Temperatura Diaria"
                onPress={() => props.navigation.navigate('Temperatura')}
                accessoryLeft={Sol}
              />
            </Menu>
          ) : (
            <Menu
              selectedIndex={selectedIndex}
              onSelect={index => setSelectedIndex(index)}
            >
              <MenuGroup title="Usuários" accessoryLeft={User}>
                <MenuItem
                  title="Novos Usúarios"
                  onPress={() => props.navigation.navigate('Users')}
                  accessoryLeft={Cadastrar}
                />
                <MenuItem
                  title="Lista de Usúarios"
                  onPress={() => props.navigation.navigate('UsersList')}
                  accessoryLeft={Listar}
                />
              </MenuGroup>
              <MenuGroup title="CACP" accessoryLeft={Pasta}>
                <MenuItem
                  title="Nova Analise CACP"
                  onPress={() => props.navigation.navigate('CACP')}
                  accessoryLeft={Cadastrar}
                />
                <MenuItem
                  title="Relátorio CACP"
                  onPress={() => props.navigation.navigate('RelatorioCACP')}
                  accessoryLeft={Listar}
                />
              </MenuGroup>
              <MenuGroup title="PQA" accessoryLeft={Pasta}>
                <MenuItem
                  title="Nova Analise PQA"
                  onPress={() => props.navigation.navigate('PQA')}
                  accessoryLeft={Cadastrar}
                />
                <MenuItem
                  title="Relátorio PQA"
                  onPress={() => props.navigation.navigate('RelatorioPQA')}
                  accessoryLeft={Listar}
                />
              </MenuGroup>
              <MenuGroup title="Piscinas" accessoryLeft={Pasta}>
                <MenuItem
                  title="Cadastrar"
                  onPress={() => props.navigation.navigate('Piscinas')}
                  accessoryLeft={Cadastrar}
                />
                <MenuItem
                  title="Lista de Piscinas"
                  onPress={() => props.navigation.navigate('PiscinasList')}
                  accessoryLeft={Listar}
                />
              </MenuGroup>
              <MenuItem
                title="Temperatura Diaria"
                onPress={() => props.navigation.navigate('Temperatura')}
                accessoryLeft={Sol}
              />
            </Menu>
          )}
        </>
      </Content>
      <Footer style={styles.FooterTab}>
        <FooterTab style={styles.FooterTab}>
          <Button
            style={styles.button}
            status={color.g2}
            onPress={SubmitLogout}
            accessoryLeft={Logout}
            appearance="ghost"
          >
            Logout || Release 1.0.0
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
}

export default withNavigationFocus(CustomDrawer);
