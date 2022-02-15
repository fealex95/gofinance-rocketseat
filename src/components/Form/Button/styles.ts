import styled from "styled-components/native";
import { RectButton } from 'react-native-gesture-handler'
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableOpacity } from 'react-native';

export const Container = styled.TouchableOpacity`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.secondary};
    border-radius: 5px;
    align-items: center;
    padding: 18px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(14)}px;
    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.medium};    
    
`;