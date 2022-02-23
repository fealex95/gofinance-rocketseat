import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native'

import { HistoryCard } from "../../components/HistoryCard";

import {
    Container,
    Header,
    Title,
    Content,
    ChartContainer,
    MonthSelect,
    MonthSelectButton,
    MonthSelectIcon,
    Month
} from './styles';
import { categories } from "../../utils/categories";
import { RFValue } from "react-native-responsive-fontsize";
import { useTheme } from 'styled-components'
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";


interface ITransactionData {

    name: string;
    amount: string;
    category: string;
    date: string;
    type: 'positive' | 'negative';
}

interface CategoryData {
    key: string;
    name: string;
    total: number;
    totalFormatted: string;
    percent: string;
    color: string;
}

export function Resume() {

    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

    const theme = useTheme();

    async function loadData() {
        const dataKey = "@gofinance:transaction";
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];

        const expensives = responseFormatted.filter((expensive: ITransactionData) => expensive.type === 'negative');

        const totalByCategory: CategoryData[] = [];

        categories.forEach(category => {
            let categorySum = 0;

            expensives.forEach((expensive: ITransactionData) => {
                if (expensive.category === category.key) {
                    categorySum += Number(expensive.amount);
                }
            });

            const expensivesTotal = expensives.reduce((acumullator: number, expensive: ITransactionData) => {
                const sum = acumullator + Number(expensive.amount);
                return sum;
            }, 0)


            if (categorySum > 0) {

                const total = categorySum.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL'
                })

                const percent = `${((categorySum / expensivesTotal) * 100).toFixed(0)}%`

                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    total: categorySum,
                    totalFormatted: total,
                    percent,
                    color: category.color
                })
            }

        })

        setTotalByCategories(totalByCategory);

    }

    useEffect(() => {
        loadData();
    }, [])

    return (
        <Container>
            <Header>
                <Title>Resumo por categorias</Title>
            </Header>

            <Content
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: useBottomTabBarHeight(),
                    paddingHorizontal: 24
                }}
            >
                <MonthSelect>
                    <MonthSelectButton>
                        <MonthSelectIcon name="chevron-left" />
                    </MonthSelectButton>

                    <Month>Maio</Month>

                    <MonthSelectButton>
                        <MonthSelectIcon name="chevron-right" />
                    </MonthSelectButton>
                </MonthSelect>

                <ChartContainer>
                    <VictoryPie
                        data={totalByCategories}
                        x="percent"
                        y="total"
                        colorScale={totalByCategories.map(category => category.color)}
                        style={{
                            labels: {
                                fontSize: RFValue(18),
                                fontWeight: 'bold',
                                fill: theme.colors.shape
                            }
                        }}
                        labelRadius={50}
                    />
                </ChartContainer>

                {
                    totalByCategories.map(item => (
                        <HistoryCard key={item.key} title={item.name} amount={item.totalFormatted} color={item.color} />
                    ))

                }
            </Content>

        </Container>
    )
}