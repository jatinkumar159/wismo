import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const action = definePartsStyle({
dialogContainer: {
    width: `50vw`,
    right: 0,
    left:`initial`
  },
})

export const ActionModalTheme = defineMultiStyleConfig({
  variants: { action },
})
