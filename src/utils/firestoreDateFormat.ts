import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export function dateFormat(timestamp: FirebaseFirestoreTypes.Timestamp): string {
  const date = new Date(timestamp.toDate());

  const [month, day, year] = date.toLocaleDateString('pt-BR').split('/')
  const hour = date.toLocaleTimeString('pt-BR')
  
  const formatedDate = `${day}/${month}/${year} às ${hour}`

  return formatedDate
}