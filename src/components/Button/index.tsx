import { Button as NativeBaseButton, IButtonProps, Heading } from 'native-base'

type ButtonProps = IButtonProps & {
  title: string
}

export function Button(props: ButtonProps) {
  const { title, ...attrs } = props

  return (
    <NativeBaseButton
      bg="green.700"
      h={14}
      fontSize="sm"
      rounded="sm"
      _pressed={{ bg: 'green.500' }}
      {...attrs}
    >
      <Heading color="white" fontSize="sm">
        {title}
      </Heading>
    </NativeBaseButton>
  )
}