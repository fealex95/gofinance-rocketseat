import React from "react";
import { View, Text } from 'react-native';

type WelcomeProps = {
    name: string;
}

export function Welcome({ name }: WelcomeProps) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 36, fontWeight: 'bold' }}>
                Bem vindo! {name}
            </Text>
        </View>
    )
}