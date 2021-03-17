import styled from 'styled-components/native';

import Input from '../../components/Input';
import Button from '../../components/Button';
import color from '../../styles/colors';

export const Constainer = styled.SafeAreaView`
  flex: 1;
`;
export const Title = styled.Text`
  font-size: 32px;
  color: ${color.g1};
  font-weight: bold;
  align-items: center;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 150px;
`;

export const FormInput = styled(Input)`
  margin-bottom: 10px;
  margin-left: 20px;
  margin-right: 10px;
  width: 180;
  height: 40px;
  border-radius: 5px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 30px;
  margin-bottom: 10px;
  margin-left: 65px;
  margin-right: 10px;
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
