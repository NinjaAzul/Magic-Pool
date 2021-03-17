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
`;
export const Title = styled.Text``;
export const Form = styled.View``;
export const FormInput = styled(InputAzul)``;
export const SubmitButton = styled(Button)``;
export const SignLink = styled.TouchableOpacity``;
export const SignLinkText = styled.Text``;
