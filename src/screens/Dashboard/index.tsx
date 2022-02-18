import React, { useCallback, useEffect, useState } from "react";
import { HighLightCard } from "../../components/HighLightCard";
import { TransactionCard, ITrasactionCardProps } from "../../components/TransactionCard";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";
import {
    Container,
    Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreting,
    UserName,
    Icon,
    HighLightCards,
    Transactions,
    Title,
    TransactionsList,
    LogoutButton
} from './styles'

export interface DataListProps extends ITrasactionCardProps {
    id: string;
}

export function Dashboard() {
    const [data, setData] = useState<DataListProps[]>([]);

    async function loadTransaction() {
        const dataKey = "@gofinance:transaction";
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];

        const transactionFormatted: DataListProps[] = transactions.map((item: DataListProps) => {
            const amount = Number(item.amount).toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL'
            });

            const date = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            }).format(new Date(item.date));

            return {
                id: item.id,
                name: item.name,
                amount,
                date,
                type: item.type,
                category: item.category,
            }
        });

        setData(transactionFormatted);

    }

    useEffect(() => {
        loadTransaction();

        //const dataKey = "@gofinance:transaction";
        //AsyncStorage.removeItem(dataKey);

        console.log(data)
    }, []);

    useFocusEffect(useCallback(() => {
        loadTransaction();
    }, []));

    return (
        <Container>
            <Header>
                <UserWrapper>
                    <UserInfo>
                        <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/21689807?v=4' }} />
                        <User>
                            <UserGreting>Olá, </UserGreting>
                            <UserName>Kamila</UserName>
                        </User>
                    </UserInfo>
                    <GestureHandlerRootView>
                        <LogoutButton onPress={() => { }}>
                            <Icon name="power" />
                        </LogoutButton>
                    </GestureHandlerRootView>
                </UserWrapper>
            </Header>
            <HighLightCards>
                <HighLightCard
                    title="Entradas"
                    amount="R$ 17.400,00"
                    lastTransation="Última entrada em 12 de abril"
                    type="up"
                />

                <HighLightCard
                    title="Saidas"
                    amount="R$ 1.259,00"
                    lastTransation="Última saída em 03 de abril"
                    type="down"
                />
                <HighLightCard
                    title="Total"
                    amount="R$ 16.141,00"
                    lastTransation="01 à 16 de abril"
                    type="total"
                />
            </HighLightCards>
            <Transactions>
                <Title>Listagem</Title>
                <TransactionsList
                    data={data}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <TransactionCard data={item} />}
                />

            </Transactions>
        </Container >
    )
}
