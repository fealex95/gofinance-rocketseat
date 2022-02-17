import React, { useState, useEffect } from 'react'

import { Container, Header, Title, Form, Fields, TransactionTypes } from './styles';
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { CategorySelect } from '../CategorySelect'
import { InputForm } from '../../components/Form/InputForm';

import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { useForm } from 'react-hook-form';
import {NavigationContainer, useNavigation} from '@react-navigation/native';

interface FormData {
    [name: string]: any;
}

const schema = Yup.object().shape({
    name: Yup.
        string().
        required('Nome é obrigátório!'),

    amount: Yup.
        number().
        typeError('Informe um valor númerico').
        positive('O valor não pode ser negativo').
        required('O valor é obrigátório')
})

const dataKey = "@gofinance:transaction";

export function Register() {

    const [transactionType, setTransactionType] = useState('');
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',

    });
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const navigation = useNavigation();

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    function handleTransactionTypeSelect(type: 'up' | 'down') {
        setTransactionType(type)
    }

    function handleOpenSelectCategoryModal() {
        setCategoryModalOpen(true);
    }

    function handleCloseSelectCategoryModal() {
        setCategoryModalOpen(false);
    }

    async function handleRegister({ name, amount }: FormData) {

        if (!transactionType) {
            return Alert.alert("Atenção", "Escolha o tipo de transação");
        }

        if (category.key === 'category') {
            return Alert.alert("Atenção", "Selecione uma categoria!")
        }

        const newTransaction = {
            id: String(uuid.v4()),
            name,
            amount,
            transactionType,
            category: category.key,
            date: new Date()
        }

        try{
            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data) : [];
            const dataFormatted = [
                ...currentData, 
                newTransaction
            ];
            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

            setTransactionType('');
            setCategory({
                key: 'category',
                name: 'Categoria',
        
            });
            reset();

            navigation.navigate('Listagem');

        }catch(error){
            console.log(error);
            Alert.alert("Não foi possível salvar!");
        }
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>

                <Header>
                    <Title>Cadastro</Title>
                </Header>
                <Form>
                    <Fields>
                        <InputForm
                            name="name"
                            control={control}
                            placeholder="Nome"
                            autoCapitalize='sentences'
                            autoCorrect={false}
                            error={errors.name && errors.name.message}
                        />
                        <InputForm
                            name="amount"
                            control={control}
                            placeholder="Preço"
                            keyboardType='numeric'
                            error={errors.amount && errors.amount.message}
                        />
                        <TransactionTypes>
                            <TransactionTypeButton
                                title="Income"
                                type="up"
                                onPress={() => handleTransactionTypeSelect('up')}
                                isActive={transactionType === 'up'}

                            />
                            <TransactionTypeButton
                                title="Outcome" type="down"
                                onPress={() => handleTransactionTypeSelect('down')}
                                isActive={transactionType === 'down'}
                            />
                        </TransactionTypes>

                        <CategorySelectButton title={category.name} onPress={handleOpenSelectCategoryModal} />
                    </Fields>

                    <Button title="Enviar" onPress={handleSubmit(handleRegister)} />

                </Form>

                <Modal visible={categoryModalOpen}>
                    <CategorySelect category={category} setCategory={setCategory} closeSelectCategory={handleCloseSelectCategoryModal} />
                </Modal>

            </Container>
        </TouchableWithoutFeedback>
    );
}