import { useState } from "react";
import { Alert } from "react-native";
import {  VStack } from "native-base";
import { Controller, useForm } from "react-hook-form";
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from "@react-navigation/native";

import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";

export function Register() {
  const [isLoading, setIsLoading] = useState(false)

  const navigation = useNavigation()

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      patrimony: '',
      description: '',
    }
  })


  function handleNewOrderRegister({ patrimony, description }: { patrimony: string, description: string }) {
    if (!patrimony || !description) {
      return Alert.alert('Nova Solicitação', 'Preencha todos os campos.')
    }

    setIsLoading(true)

    firestore()
      .collection('orders')
      .add({
        patrimony,
        description,
        status: 'open',
        created_at: firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        Alert.alert('Solicitação', 'Solicitação registrada com sucesso.')
        navigation.goBack()
      })
      .catch((error) => {
        Alert.alert('Solicitação', 'Não foi possível registar solicitação')
        console.error(error)
      })
      .finally(() => {
        setIsLoading(false)
      })

    reset()
  }

  return (
    <VStack flex={1} p={6} bg="gray.600">
      <Header title="Nova solicitação"/>
      
      <Controller
        control={control}
        name="patrimony"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Número do patrimônio"
            mt={4}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder="Descrição do problema"
            flex={1}
            mt={5}
            multiline
            textAlignVertical="top"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />


      <Button
        title="Cadastrar"
        mt={5}
        onPress={handleSubmit(handleNewOrderRegister)}
        isLoading={isLoading}
      />
    </VStack>
  )
}