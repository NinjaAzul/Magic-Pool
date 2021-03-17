import styled from 'styled-components/native';
import { Platform } from 'react-native';
import Input from '../../components/InputAzul';
import Button from '../../components/Button';
import color from '../../styles/colors';

export const Constainer = styled.SafeAreaView`
  flex: 1;
`;
export const Title = styled.Text`
  font-size: 24px;
  color: #fff;
  font-weight: bold;
  margin-top: 30px;
`;
export const Form = styled.View`
  align-items: center;
  margin-top: 20px;
  border-radius: 10px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 15px;
  margin-left: 10px;
  margin-right: 10px;
  width: 250px;
  height: 40px;
  border-radius: 5px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 30px;
  margin-left: 10px;
  margin-right: 10px;
  width: 250px;
  height: 38px;
  border-radius: 5px;
  align-items: center;
  align-self: center;
`;

export const SignLink = styled.TouchableOpacity`
  margin-top: 20px;
`;

export const SignLinkText = styled.Text`
  color: ${color.light};
  font-weight: bold;
  font-size: 16px;
`;
