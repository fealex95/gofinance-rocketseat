import React, {useEffect, useState} from "react";

import AsyncStorage from '@react-native-async-storage/async-storage';

import { HistoryCard } from "../../components/HistoryCard";

import {
    Container,
    Header,
    Title,
    Content
} from './styles';
import { categories } from "../../utils/categories";
import { ScrollView } from "react-native-gesture-handler";

interface ITransactionData {
    
    name: string;
    amount: string;
    category: string;
    date: string;
    type: 'positive' | 'negative';
}

interface CategoryData{
    key: string;
    name: string;
    total: string;
    color: string;
}

export function Resume(){

    const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>([])
    
    async function loadData(){
        const dataKey = "@gofinance:transaction";
        const response = await AsyncStorage.getItem(dataKey);
        const responseFormatted = response ? JSON.parse(response) : [];

        const expensives = responseFormatted.filter((expensive: ITransactionData) => expensive.type === 'negative');

        const totalByCategory: CategoryData[] = [];

        categories.forEach(category => {
            let categorySum = 0;

            expensives.forEach((expensive:ITransactionData) => {
                if(expensive.category === category.key){
                    categorySum += Number(expensive.amount);
                }
            });

            if(categorySum > 0){

                const total = categorySum.toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL'
                })

                totalByCategory.push({
                    key: category.key,
                    name: category.name,
                    total,
                    color: category.color
                })
            }
            
        })

        setTotalByCategories(totalByCategory);
    
    }

    useEffect(() => {
        loadData();
    }, [])

    return(
        <Container>
            <Header>
                <Title>Resumo por categorias</Title>
            </Header>

            <Content >
            {
                totalByCategories.map(item => (
                    <HistoryCard key={item.key} title={item.name} amount={item.total} color={item.color} />
                ))
                
            }
            </Content>

        </Container>
    )
}