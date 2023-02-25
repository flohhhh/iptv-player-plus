import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Text from '../../text'
import { SpacerX } from '../../spacer'
import { useFocusBlur } from '../../../hooks/useFocusBlur'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { useSelectDrawerOpen } from '../../../atoms/selectDrawerItemAtom'
import { useTranslation } from 'react-i18next'
import { Disconnect } from '../../../icons/Disconnect'
import { useSelectedAccount } from '../../../atoms/accounts/accountsAtom'
import { colors } from '../../../utils/colors'

interface IDrawerProfileItem {}
export const DrawerDisconnectAccountItem: React.FC<
  IDrawerProfileItem
> = ({}) => {
  const { t } = useTranslation()
  const [drawerIsOpen, setDrawerIsOpen] = useSelectDrawerOpen()
  const { onFocus, onBlur, focus } = useFocusBlur()

  const onFocusChange = () => {
    onFocus()
    setDrawerIsOpen(true)
  }

  const [_, setSelectedAccount] = useSelectedAccount()

  const opacityAnimated = useAnimatedStyle(() => ({
    opacity: withTiming(drawerIsOpen ? 1 : 0),
  }))

  const onPressDisconnect = () => setSelectedAccount(null)

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { borderLeftColor: focus ? colors.white['0'] : colors.black['1'] },
      ]}
      onFocus={onFocusChange}
      onBlur={onBlur}
      onPress={onPressDisconnect}
    >
      <SpacerX size={8} />

      <Disconnect size={focus ? 16 : 14} />

      <SpacerX size={20} />

      <Animated.View style={opacityAnimated}>
        <Text size={focus ? 14 : 12}>
          {t('drawer.item.disconnect_account')}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 2,
  },
  selectedProfile: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  squareProfile: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
})
