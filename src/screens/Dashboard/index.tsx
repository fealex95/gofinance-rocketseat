import React from "react";
import { HighLightCard } from "../../components/HighLightCard";
import { TransactionCard, ITrasactionCardProps } from "../../components/TransactionCard";

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
    const data: DataListProps[] = [{
        id: '1',
        type: 'positive',
        title: "Desenvolvimento de site",
        amount: "R$ 12.000,00",
        category: {
            name: 'Vendas',
            icon: 'dollar-sign'
        },
        date: "13/04/2020"
    },

    {
        id: '2',
        type: 'negative',
        title: "Hamburgueria Pizzy",
        amount: "R$ 59,00",
        category: {
            name: 'Alimentação',
            icon: 'coffee'
        },
        date: "10/04/2020"
    },
    {
        id: '3',
        type: 'negative',
        title: "Aluguel do apartamento",
        amount: "R$ 1.200,00",
        category: {
            name: 'Vendas',
            icon: 'shopping-bag'
        },
        date: "10/04/2020"
    }];
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
                    <LogoutButton>
                        <Icon name="power" />
                    </LogoutButton>
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
