import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Text from '../../../text'
import { SpacerX } from '../../../spacer'
import { useFocusBlur } from '../../../../hooks/useFocusBlur'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { useDrawerOpen } from '../../../../atoms/drawerAtom'
import { useTranslation } from 'react-i18next'
import { Disconnect } from '../../../../icons/Disconnect'
import { useSelectedAccount } from '../../../../atoms/accounts/accountsAtom'
import { colors } from '../../../../utils/colors'
import { dateFromTime } from '../../../../utils/time'

interface IDrawerProfileItem {}
export const DrawerDisconnectAccountItem: React.FC<
  IDrawerProfileItem
> = ({}) => {
  const { t } = useTranslation()
  const { drawerOpen, setDrawerOpen } = useDrawerOpen()
  const { onFocus, onBlur, focus } = useFocusBlur()

  const onFocusChange = () => {
    onFocus()
  }

  const { account, setAccount } = useSelectedAccount()

  const opacityAnimated = useAnimatedStyle(() => ({
    opacity: withTiming(drawerOpen ? 1 : 0),
  }))

  const onPressDisconnect = () => setAccount(null)

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

      <SpacerX size={8} />

      <Animated.View style={opacityAnimated}>
        <Text font="CandyCake" size={focus ? 14 : 12}>
          {t('drawer.item.disconnect_account')}
        </Text>
        <Text size={8}>
          {t('drawer.item.expire_date_account', {
            date: dateFromTime(account?.info?.user_info.exp_date),
          })}
        </Text>
      </Animated.View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 2,
  },
  squareProfile: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 6,
  },
})
