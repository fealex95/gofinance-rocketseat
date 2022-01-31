import React from 'react';

import {
    Container,
    Header,
    Title,
    Icon,
    Footer,
    Amount,
    LastTransition
} from './styles'

interface Props {
    title: string;
    amount: string;
    lastTransation: string;
    type: 'up' | 'down' | 'total';
}

const icon = {
    up: 'arrow-up-circle',
    down: 'arrow-down-circle',
    total: 'dollar-sign'
}

export function HighLightCard({ title, amount, lastTransation, type }: Props) {
    return (
        <Container type={type}>
            <Header>
                <Title type={type}>{title}</Title>
                <Icon name={icon[type]} type={type} />
            </Header>
            <Footer>
                <Amount type={type}>{amount}</Amount>
                <LastTransition type={type}>{lastTransation}</LastTransition>
            </Footer>
        </Container>
    )
}