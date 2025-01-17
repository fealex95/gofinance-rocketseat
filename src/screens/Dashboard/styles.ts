import styled from 'styled-components/native';
import { FlatList, FlatListProps, TouchableOpacity } from 'react-native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize'
import { Feather } from '@expo/vector-icons';
import { getStatusBarHeight, getBottomSpace } from 'react-native-iphone-x-helper';
import { DataListProps } from '.';
import { BorderlessButton } from 'react-native-gesture-handler';

export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
    
`;

export const Header = styled.View`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.primary};
    height: ${RFPercentage(42)}px;    
`;

export const UserWrapper = styled.View`
    width: 100%;
    padding: 0 24px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: ${getStatusBarHeight() + RFValue(28)}px;
`

export const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;
`;

export const Photo = styled.Image`
    width: ${RFValue(48)}px;
    height: ${RFValue(48)}px;
    border-radius: 10px;

    `;

export const User = styled.View`
    margin-left: 17px;
`;

export const UserGreting = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
`;

export const UserName = styled.Text`
    font-family: ${({ theme }) => theme.fonts.bold};
    font-size: ${RFValue(18)}px;
    color: ${({ theme }) => theme.colors.shape};
`;

export const LogoutButton = styled.TouchableOpacity`
    flex: 1;
`;

export const Icon = styled(Feather)`
    color: ${({ theme }) => theme.colors.secondary};
    font-size: ${RFValue(24)}px;

`;

export const HighLightCards = styled.ScrollView.attrs({
    horizontal: true,
    showsHorizontalScrollIndicator: false,
    contentContainerStyle: { paddingHorizontal: 24 }
})`
    width: 100%;
    position: absolute;
    margin-top: ${RFPercentage(20)}px;
`;

export const Transactions = styled.View`
    flex: 1;
    padding: 0 24px;
    
    margin-top: ${RFPercentage(12)}px;
`;
export const Title = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({ theme }) => theme.fonts.regular};
    margin-bottom: 16px;
`;

export const TransactionsList = styled(
    FlatList as new (props: FlatListProps<DataListProps>) => FlatList<DataListProps> //Pegar as propriedades da interface
).attrs({
    showsVerticalScrollIndicator: false,
    contentContainerStyle: {
        paddingBottom: getBottomSpace()
    }
})`
    
`;

export const LoadContainer = styled.View`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

