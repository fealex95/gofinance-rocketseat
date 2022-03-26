import React, { useContext, useState } from 'react';
import { ActivityIndicator, Alert, Platform } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { useAuth } from '../src/hooks/auth';

import { useTheme } from 'styled-components';

import { SigninSocialButton } from '../src/components/SigninSocialButton';

import {
    Container,
    Header,
    TitleWrapper,
    Title,
    SigninTitle,
    Footer,
    FooterWrapper
} from './styles';

export function SignIn() {
    const [isLoading, setIsLoading] = useState(false);
    const { signInWithGoogle, signInWithApple } = useAuth();
    const theme = useTheme();

    async function handleSignInWithGoogle() {
        try {
            setIsLoading(true);
            return await signInWithGoogle();

        } catch (error) {
            Alert.alert(`Erro: ${error}`);
            setIsLoading(false)
        }
    }

    async function handleSignInWithApple() {
        try {
            setIsLoading(true);
            return await signInWithApple();
        } catch (error) {
            Alert.alert(`Erro: ${error}`);
            setIsLoading(false)
        }
    }

    return (
        <Container>
            <Header>
                <TitleWrapper>
                    <LogoSvg
                        width={RFValue(120)}
                        height={RFValue(68)}
                    />

                    <Title>
                        Controle suas {'\n'}
                        finanças de forma {'\n'}
                        muito simples
                    </Title>
                </TitleWrapper>

                <SigninTitle>
                    Faça seu login com {'\n'}
                    uma das contas abaixo
                </SigninTitle>
            </Header>
            <Footer>
                <FooterWrapper>
                    <SigninSocialButton title="Entrar com Google" svg={GoogleSvg} onPress={handleSignInWithGoogle} />
                    {Platform.OS === 'ios' && <SigninSocialButton title="Entrar com Apple" svg={AppleSvg} onPress={handleSignInWithApple} />}
                </FooterWrapper>
                {
                    isLoading && <ActivityIndicator color={theme.colors.shape} style={{ marginTop: 18 }} />
                }
            </Footer>
        </Container>
    )
}