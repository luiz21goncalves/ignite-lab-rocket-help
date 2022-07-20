import { Alert } from "react-native";
import { useState } from "react";
import { VStack, Heading, Icon, useTheme } from "native-base";
import { Envelope, Key } from 'phosphor-react-native'
import { Controller, useForm } from "react-hook-form";
import auth from '@react-native-firebase/auth'

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import LogoPrimary from '../../assets/logo_primary.svg'

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false)
  const { colors } = useTheme()

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  function handleSignIn({ email, password }: { email: string, password: string }) {
    if (!email || !password) {
      return Alert.alert('Entrar', "informe email e senha!")
    }

    setIsLoading(true)

    auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        console.error(error)

        if (error.code === 'auth/invalid-email') {
          return Alert.alert('Entrar', "Email inválido.")
        }

        if (error.code === 'auth/user-not-found') {
          return Alert.alert('Entrar', 'Email ou senha inválida.')
        }

        if (error.code === 'auth/wrong-password') {
          return Alert.alert('Entrar', 'Email ou senha inválida.')
        }

        return Alert.alert('Entrar', 'Não foi possível acessar')
       })
      .finally(()=> {
        setIsLoading(false)
      })

    reset()
  }

  return (
    <VStack flex={1} alignItems="center" bg="gray.600" px={8} pt={24}>
      <LogoPrimary />

      <Heading color="gray.100" fontSize="xl" mt={20} mb={6} >
        Acesse sua conta
      </Heading>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder='Email'
            mb={4}
            InputLeftElement={
              <Icon as={<Envelope color={colors.gray[300]} />} ml={4} />
            }
            keyboardType="email-address"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <Input
            placeholder='Senha'
            mb={8}
            InputLeftElement={
              <Icon as={<Key color={colors.gray[300]} />} ml={4} />
            }
            secureTextEntry
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />

      <Button
        title="Entrar"
        w="full"
        onPress={handleSubmit(handleSignIn)}
        isLoading={isLoading}
      />
    </VStack>
  )
}