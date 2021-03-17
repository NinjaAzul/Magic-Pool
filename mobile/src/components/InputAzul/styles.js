import styled from 'styled-components/native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  listenOrientationChange,
} from 'react-native-responsive-screen';
import color from '../../styles/colors';

export const Container = styled.View`
  padding: 0 15px;
  height: 60px;
  background: ${color.g2};
  border-radius: 4px;
  border-width: 2px;
  border-bottom-color: ${color.g1};
  border-top-color: ${color.g2};
  border-left-color: ${color.g2};
  border-right-color: ${color.g2};
  flex-direction: row;
  align-items: center;
`;

export const TInput = styled.TextInput.attrs({
  placeholderTextColor: color.g1,
})`
  flex: 1;
  font-size: 15px;
  margin-left: 10px;
  color: ${color.g1};
`;
