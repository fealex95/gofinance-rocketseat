import React from "react";
import { TouchableOpacityProps } from "react-native";
import { RectButtonProps, GestureHandlerRootView } from "react-native-gesture-handler";
import { Container, Title } from './styles';

interface Props extends RectButtonProps {
    title: string;
}

export function Button({ title, ...rest }: Props) {
    return (
        <GestureHandlerRootView>
            <Container {...rest}>
                <Title> {title}</Title>
            </Container>
        </GestureHandlerRootView>
    )
}