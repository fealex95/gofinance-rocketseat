import React from "react";
import {TouchableOpacityProps} from 'react-native';
import { SvgProps } from "react-native-svg";


import {
    Button,
    ImageContainer,
    Text
} from './styles';

interface Props extends TouchableOpacityProps{
    title: string;
    svg: React.FC<SvgProps>;
}

export function SigninSocialButton({
    title,
    svg: Svg,
    ...rest
}: Props){
    return(
        <Button {...rest}>
            <ImageContainer>
                <Svg />
            </ImageContainer>

            <Text>
                {title}
            </Text>
        </Button>
    )
}