import React, { useContext } from 'react';
import { Alert } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import AppleSvg from '../../assets/apple.svg';
import GoogleSvg from '../../assets/google.svg';
import LogoSvg from '../../assets/logo.svg';
import { useAuth } from '../../hooks/auth';

import { SigninSocialButton } from '../../components/SigninSocialButton';

import {
    Container,
    Header,
    TitleWrapper,
    Title,
    SigninTitle,
    Footer,
    FooterWrapper
} from './styles';

export function Signin() {

    const { signInWithGoogle, signInWithApple } = useAuth();

    async function handleSignInWithGoogle() {
        try {
            await signInWithGoogle();
        } catch (error) {
            Alert.alert(`Erro: ${error}`);
        }
    }

    async function handleSignInWithApple() {
        try {
            await signInWithApple();
        } catch (error) {
            Alert.alert(`Erro: ${error}`);
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
                    <SigninSocialButton title="Entrar com Apple" svg={AppleSvg} onPress={handleSignInWithApple} />
                </FooterWrapper>
            </Footer>
        </Container>
    )
}