import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Box, HStack, ScrollView, Text, useTheme, VStack } from "native-base";
import firestore from '@react-native-firebase/firestore'
import { CircleWavyCheck, ClipboardText, DesktopTower, Hourglass } from "phosphor-react-native";

import { Header } from "../../components/Header";
import { OrderFirestoreDTO } from "../../dtos/OrderFirestoreDTO";
import { dateFormat } from "../../utils/firestoreDateFormat";
import { Loading } from "../../components/Loading";
import { CardDetails } from "../../components/CardDetails";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { Controller, useForm } from "react-hook-form";

type RouterParams = {
  orderId: string
}

type OrderDetails = {
  id: string;
  patrimony: string;
  description: string;
  status: 'open' | 'closed';
  solution?: string;
  when: string;
  closed?: string;
}

export function Details() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [order, setOrder] = useState<OrderDetails>({} as OrderDetails)

  const navigation = useNavigation()
  const { colors } = useTheme()
  const router = useRoute()
  const { orderId } = router.params as RouterParams

  const { control, handleSubmit, reset } = useForm({
    defaultValues: {
      solution: ''
    }
  })

  function handleOrderClose({ solution }: {solution: string}) {
    if (!solution) {
      return Alert.alert('Solicitação', 'Informe a solução para encerrar a solicitação.')
    }

    setIsSubmitting(true)

    firestore()
      .collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .update({
        status: 'closed',
        solution,
        closed_at: firestore.FieldValue.serverTimestamp()
      })
      .then(() => {
        Alert.alert('Solicitação', 'Solicitação encerrada.')
        navigation.goBack()
      })
      .catch((error) => {
        console.error(error)
        Alert.alert('Solicitação', 'Não foi possível encerrar a solicitação.')
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  useEffect(() => {
    firestore()
      .collection<OrderFirestoreDTO>('orders')
      .doc(orderId)
      .get()
      .then((doc) => {
        const { patrimony, description, status, solution, created_at, closed_at } = doc.data()

        const closed = closed_at ? dateFormat(closed_at) : undefined

        setOrder({
          id: doc.id,
          patrimony,
          description,
          status,
          when: dateFormat(created_at),
          closed,
          solution,
        })
      })
      .catch((error) => {
        console.error(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [orderId])

  if(isLoading) {
    return <Loading />
  }

  return (
    <VStack flex={1} bg="gray.700">
      <Box px={6} bg="gray.600">
        <Header title="Solicitação" />
      </Box>
      
      <HStack bg="gray.500" justifyContent="center" p={4}>
        {
          order.status === 'closed'
            ? <CircleWavyCheck size={22} color={colors.green[300]} />
            : <Hourglass size={22} color={colors.secondary[700]} />
        }

        <Text
          fontSize="sm"
          color={order.status === 'closed' ? colors.green[300] : colors.secondary[700]}
          ml={2}
          textTransform="uppercase"
        >
          { order.status === 'closed' ? 'finalizado' : 'em andamento' }
        </Text>
      </HStack>

      <ScrollView mx={5} showsVerticalScrollIndicator={false}>
        <CardDetails
          title="equipamento"
          description={`Patrimônio ${order.patrimony}`}
          icon={DesktopTower}
          />

        <CardDetails
          title="descrição do problema"
          description={order.description}
          icon={ClipboardText}
          footer={`Registrado em ${order.when}`}
        />

        <CardDetails
          title="solução"
          icon={CircleWavyCheck}
          footer={order.closed && `Encerrado em ${order.closed}`}
          description={order.solution}
        >
          { !order.solution && (
            <Controller
              control={control}
              name="solution"
              render={({ field: { value, onBlur, onChange } }) => (
                <Input 
                  placeholder="Descrição do problema"
                  h={24}
                  textAlignVertical="top"
                  multiline
                  value={value}
                  onBlur={onBlur}
                  onChangeText={onChange}
                />
              )}
            />
          ) }
        </CardDetails>
      </ScrollView>

      { order.status === 'open' && (
        <Button
          title="Encerrar
          solicitação"
          m={5}
          onPress={handleSubmit(handleOrderClose)}
          isLoading={isSubmitting}
        />
      )}
    </VStack>
  )
}