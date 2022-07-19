import { Text, Button, IButtonProps, useTheme } from 'native-base'

type FilterProps = IButtonProps & {
  title: string;
  isActive?: boolean;
  type: 'open' | 'closed';
}

export function Filter(props: FilterProps) {
  const { title, isActive = false, type, ...attrs } = props;

  const { colors } = useTheme()

  const color = type === 'open' ? colors.secondary[700] : colors.green[300]

  return (
    <Button
      variant="outline"
      borderWidth={isActive ? 1 : 0}
      borderColor={color}
      bgColor="gray.600"
      flex={1}
      size="sm"
      {...attrs}
    >
     <Text color={isActive ? color : 'gray.300'}>{title}</Text> 
    </Button>
  )
}