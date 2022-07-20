import { useRoute } from "@react-navigation/native";
import { Text, VStack } from "native-base";

import { Header } from "../../components/Header";

type RouterParams = {
  orderId: string
}

export function Details() {
  const router = useRoute()
  const { orderId } = router.params as RouterParams

  return (
    <VStack flex={1} bg="gray.700">
      <Header title="Solicitação" />
      <Text color="white">{orderId}</Text>
    </VStack>
  )
}