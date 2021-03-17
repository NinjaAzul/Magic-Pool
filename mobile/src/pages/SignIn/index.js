import React, { useRef, useState, useEffect, useCallback } from 'react';
import {
  Image,
  View,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import logo from '../../assets/logo2.png';
import { signInRequest } from '../../store/modules/auth/actions';
import color from '../../styles/colors';

import { Title, Constainer, Form, FormInput, SubmitButton } from './styles';

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);
  const passwordRef = useRef();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  // CSS
  const styles = StyleSheet.create({
    logoLoginLANDSCAPE: {
      width: widthPercentageToDP('100%'),
      height: heightPercentageToDP('55%'),
    },
    logoLoginPORTRAIT: {
      width: widthPercentageToDP('200%'),
      height: heightPercentageToDP('30%'),
    },
    viewFormLoginLANDSCAPE: {
      marginHorizontal: 20,
      position: 'relative',
      bottom: 50,
      backgroundColor: '#fff',
      width: widthPercentageToDP('100%'),
      height: heightPercentageToDP('50%'),
      borderWidth: 1,
      alignSelf: 'center',
      borderColor: color.g2,
      borderStyle: 'solid',
      borderRadius: 30,
    },
    viewFormLoginPORTRAIT: {
      marginHorizontal: 20,
      position: 'relative',
      bottom: 50,
      backgroundColor: '#fff',
      width: widthPercentageToDP('100%'),
      height: heightPercentageToDP('50%'),
      borderWidth: 1,
      alignSelf: 'center',
      borderColor: color.g2,
      borderStyle: 'solid',
      borderRadius: 30,
    },
    viewFormLoginMarginLANDSCAPE: {
      marginTop: 100,
    },
    viewFormLoginMarginPORTRAIT: {},
  });

  function handleSubmit() {
    dispatch(signInRequest(login, password));
  }

  const [orientation, setOrientation] = useState('PORTRAIT');

  useEffect(() => {
    Dimensions.addEventListener('change', ({ window: { width, height } }) => {
      if (width < height) {
        setOrientation('PORTRAIT');
      } else {
        setOrientation('LANDSCAPE');
      }
      // console.log(orientation);
    });
  }, [orientation]);

  useEffect(() => {
    const { width, height } = Dimensions.get('window');
    if (width < height) {
      setOrientation('PORTRAIT');
    } else {
      setOrientation('LANDSCAPE');
    }
    // console.log(orientation);
  }, []);

  return (
    <Constainer>
      <View
        style={{
          alignItems: 'center',
          alignSelf: 'center',
          borderRadius: 5,
          backgroundColor: color.g2,
        }}
      >
        <Image
          style={[
            orientation === 'PORTRAIT'
              ? styles.logoLoginLANDSCAPE
              : styles.logoLoginPORTRAIT,
          ]}
          source={logo}
        />
      </View>
      <View
        style={[
          orientation === 'PORTRAIT'
            ? styles.viewFormLoginLANDSCAPE
            : styles.viewFormLoginPORTRAIT,
        ]}
      >
        <View>
          <View
            style={[
              orientation === 'PORTRAIT'
                ? styles.viewFormLoginMarginLANDSCAPE
                : styles.viewFormLoginMarginPORTRAIT,
            ]}
          >
            <KeyboardAwareScrollView>
              <Form>
                <FormInput
                  icon="person-outline"
                  autoCorrect={false}
                  autoCapitalize="none"
                  placeholder="Digite seu usuário"
                  returnKeyType="next"
                  value={login}
                  onChangeText={setLogin}
                  onSubmitEditing={() => passwordRef.current.focus()}
                />
                <FormInput
                  icon="lock-outline"
                  secureTextEntry
                  placeholder="Sua senha"
                  returnKeyType="send"
                  value={password}
                  onChangeText={setPassword}
                  onSubmitEditing={handleSubmit}
                  ref={passwordRef}
                />
                <SubmitButton loading={loading} onPress={handleSubmit}>
                  Acessar
                </SubmitButton>
              </Form>
            </KeyboardAwareScrollView>
          </View>
        </View>
      </View>
    </Constainer>
  );
}
