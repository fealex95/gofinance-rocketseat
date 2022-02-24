import React, { useCallback, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import { VictoryPie } from 'victory-native';
import {addMonths, subMonths, format} from 'date-fns';
import {ptBR} from 'date-fns/locale'

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
    Month,
    LoadContainer
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
    const [isLoading, setIsLoading] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([]);

    const theme = useTheme();

    function handleDateChange(action: 'next' | 'prev'){
        
        if(action === 'next'){
            setSelectedDate(addMonths(selectedDate, 1));
        }else{
            setSelectedDate(subMonths(selectedDate, 1));
        }
    }

    async function loadData() {
        setIsLoading(true);
        const dataKey = "@gofinance:transaction";
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];

        const expensives = responseFormatted.filter(
            (expensive: ITransactionData) => 
                expensive.type === 'negative' && 
                new Date(expensive.date).getMonth() === selectedDate.getMonth() &&
                new Date(expensive.date).getFullYear() === selectedDate.getFullYear());

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

        setIsLoading(false);
    }

    useFocusEffect(useCallback(() => {
        loadData();
    }, [selectedDate]));

    return (
        
        <Container>
            <Header>
                <Title>Resumo por categorias</Title>
            </Header>

            {

                isLoading ?
                <LoadContainer>
                    <ActivityIndicator
                        color={theme.colors.primary}
                        size="large"
                    />
                </LoadContainer>
                :
                
                <Content
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: useBottomTabBarHeight(),
                        paddingHorizontal: 24
                    }}
                >
                    <MonthSelect>
                        <MonthSelectButton onPress={() => handleDateChange("prev")}>
                            <MonthSelectIcon name="chevron-left" />
                        </MonthSelectButton>

                        <Month>{format(selectedDate, 'MMMM, yyyy', {locale: ptBR})}</Month>

                        <MonthSelectButton onPress={() => handleDateChange("next")}>
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
            }
        </Container>
    )
}