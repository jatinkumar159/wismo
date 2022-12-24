import { modalAnatomy as parts } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts.keys)

const action = definePartsStyle({
  dialogContainer: {
    height: `35vh`,
    bottom: 0,
    top:`initial`,
    borderTopLeftRadius: `1rem`,
    borderTopRightRadius: `1rem`,
  },
})

export const ActionModalTheme = defineMultiStyleConfig({
  variants: { action },
})
