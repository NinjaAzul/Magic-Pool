import styled from 'styled-components/native';
import InputAzul from '../../components/InputAzul';
import Button from '../../components/Button';
import color from '../../styles/colors';

export const Constainer = styled.SafeAreaView`
  background-color: ${color.g2};
  flex: 1;
`;
export const Title = styled.Text``;
export const Form = styled.View`
  align-items: center;
`;

export const FormInput = styled(InputAzul)`
  margin-left: 20px;
  margin-right: 10px;
  margin-top: 20px;
  border-radius: 5px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 50px;
`;

export const SignLink = styled.TouchableOpacity`
  margin-top: 20px;
`;

export const SignLinkText = styled.Text`
  color: ${color.light};
  font-weight: bold;
  font-size: 16px;
`;
