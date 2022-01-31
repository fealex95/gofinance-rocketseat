import React, { useState } from 'react'

import { Container, Header, Title, Form, Fields, TransactionTypes } from './styles';
import { Modal, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native'
import { Button } from '../../components/Form/Button';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { CategorySelect } from '../CategorySelect'
import { InputForm } from '../../components/Form/InputForm';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

interface FormData {
    [name: string]: any;
}

const schema = Yup.object().shape({
    name: Yup.
        string().
        required('Nome é obrigátório'),

    amount: Yup.
        number().
        typeError('Informe um valor númerico').
        positive('O valor não pode ser negativo').
        required('O valor é obrigátório')
})

export function Register() {

    const [transactionType, setTransactionType] = useState('');
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',

    });
    const [categoryModalOpen, setCategoryModalOpen] = useState(false);

    const {
        control,
        handleSubmit,
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

    function handleRegister({ name, amount }: FormData) {

        if (!transactionType) {
            return Alert.alert("Atenção", "Escolha o tipo de transação");
        }

        if (category.key === 'category') {
            return Alert.alert("Atenção", "Selecione uma categoria!")
        }

        const data = {
            name,
            amount,
            transactionType,
            category: category.key
        }

        console.log(data);
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