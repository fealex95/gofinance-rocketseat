import React, { useCallback, useEffect, useState } from "react";
import { HighLightCard } from "../../components/HighLightCard";
import { ActivityIndicator } from 'react-native';
import { TransactionCard, ITrasactionCardProps } from "../../components/TransactionCard";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "styled-components";
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
    LogoutButton,
    LoadContainer
} from './styles'
import theme from "../../global/styles/theme";

export interface DataListProps extends ITrasactionCardProps {
    id: string;
}

interface HighlightProps {
    amount: string;
    lastTransaction: string;
}

interface HighlightData {
    entries: HighlightProps;
    expensives: HighlightProps;
    total: HighlightProps;
}

export function Dashboard() {
    const [isLoading, setIsLoading] = useState(true);
    const [transactions, setTransactions] = useState<DataListProps[]>([]);
    const [highlightData, setHighlightData] = useState<HighlightData>({} as HighlightData);
    const theme = useTheme();

    function getLastTransactionDate(collection: DataListProps[], type: 'positive' | 'negative') {
        const lastTransaction = new Date(
            Math.max.apply(Math,
                collection
                    .filter((transaction) => transaction.type === type)
                    .map((transaction) => new Date(transaction.date).getTime())
            )
        );

        return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-br', { month: 'long' })}`;
    }

    async function loadTransactions() {

        const dataKey = "@gofinance:transaction";
        const response = await AsyncStorage.getItem(dataKey);
        const transactions = response ? JSON.parse(response) : [];



        let entriesTotal = 0;
        let expensivesTotal = 0;



        const transactionFormatted: DataListProps[] = transactions.map((item: DataListProps) => {

            if (item.type === 'positive') {
                entriesTotal += Number(item.amount);
            } else {
                expensivesTotal += Number(item.amount);
            }

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

        const lastTransactionEntries = getLastTransactionDate(transactions, 'positive');
        const lastTransactionExpensives = getLastTransactionDate(transactions, 'negative');

        setTransactions(transactionFormatted);

        const total = entriesTotal - expensivesTotal;

        setHighlightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL'
                }),

                lastTransaction: `Última entrada dia ${lastTransactionEntries}`
            },

            expensives: {
                amount: expensivesTotal.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: `Última saída dia ${lastTransactionEntries}`
            },

            total: {
                amount: total.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL'
                }),
                lastTransaction: `01 à ${lastTransactionExpensives}`
            }
        })

        setIsLoading(false);


    }

    useEffect(() => {
        loadTransactions();

        //const dataKey = "@gofinance:transaction";
        //AsyncStorage.removeItem(dataKey);

        // console.log(data)
    }, []);

    useFocusEffect(useCallback(() => {
        loadTransactions();
    }, []));

    return (
        <Container>

            {
                isLoading ?
                    <LoadContainer>
                        <ActivityIndicator
                            color={theme.colors.primary}
                            size="large"
                        />
                    </LoadContainer>
                    :
                    <>
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
                                amount={highlightData.entries.amount}
                                lastTransation={highlightData.entries.lastTransaction}
                                type="up"
                            />

                            <HighLightCard
                                title="Saidas"
                                amount={highlightData.expensives.amount}
                                lastTransation={highlightData.expensives.lastTransaction}
                                type="down"
                            />
                            <HighLightCard
                                title="Total"
                                amount={highlightData.total.amount}
                                lastTransation={highlightData.total.lastTransaction}
                                type="total"
                            />
                        </HighLightCards>
                        <Transactions>
                            <Title>Listagem</Title>
                            <TransactionsList
                                data={transactions}
                                keyExtractor={item => item.id}
                                renderItem={({ item }) => <TransactionCard data={item} />}
                            />

                        </Transactions>
                    </>
            }
        </Container >
    )
}
