import { VStack, Heading, Icon, useTheme } from "native-base";
import { Envelope, Key } from 'phosphor-react-native'
import { Controller, useForm } from "react-hook-form";

import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import LogoPrimary from '../../assets/logo_primary.svg'

export function SignIn() {
  const { colors } = useTheme()

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      email: '',
      password: ''
    }
  })

  function handleSignIn(data) {
    console.log({ data })
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
            placeholder='E-mail'
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

      <Button title="Entrar" w="full" onPress={handleSubmit(handleSignIn)} />
    </VStack>
  )
}