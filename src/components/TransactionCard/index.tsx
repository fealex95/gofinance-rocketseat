import React from "react";
import { categories } from "../../utils/categories";



import {
    Container,
    Title,
    Amount,
    Footer,
    Category,
    Icon,
    CategoryName,
    Date,
} from './styles';



export interface ITrasactionCardProps {
    name: string;
    amount: string;
    category: string;
    date: string;
    type: 'positive' | 'negative';
}

interface Props {
    data: ITrasactionCardProps;
}

export function TransactionCard({
    data
}: Props) {
    const [category] = categories.filter(item => item.key === data.category);
    return (
        <Container>
            <Title>{data.name}</Title>
            <Amount type={data.type}>
                {data.type === 'negative' && "- "}
                {data.amount}
            </Amount>
            <Footer>
                <Category>
                    <Icon name={category.icon} />
                    <CategoryName>
                        {category.name}
                    </CategoryName>
                </Category>
                <Date>{data.date}</Date>
            </Footer>

        </Container>
    )
}