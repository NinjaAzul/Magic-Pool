import styled from 'styled-components/native';
import { Platform } from 'react-native';
import InputAzul from '../../components/InputAzul';
import Button from '../../components/Button';
import color from '../../styles/colors';

export const Constainer = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  padding: 0px;
`;
export const Title = styled.Text`
  position: absolute;
  font-size: 24px;
  color: #fff;
  font-weight: bold;
  left: 100px;
  bottom: 30px;
`;
export const Form = styled.View`
  align-self: stretch;
  margin-top: 100px;
`;

export const FormInput = styled(InputAzul)`
  margin-bottom: 10px;
  margin-right: 5px;
  margin-left: 5;
  width: 170;
  height: 40px;
  border-radius: 5px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 30px;
  margin-bottom: 10px;
  margin-left: 70px;
  margin-right: 70px;
  width: 150px;
  height: 35px;
  border-radius: 5px;
`;
export const SignLink = styled.TouchableOpacity`
  margin-top: 20px;
`;

export const SignLinkText = styled.Text`
  color: ${color.light};
  font-weight: bold;
  font-size: 16px;
`;
