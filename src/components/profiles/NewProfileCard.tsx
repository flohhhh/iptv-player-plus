import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import Animated from 'react-native-reanimated'
import { colors } from '../../utils/colors'
import { useFocusBlur } from '../../hooks/useFocusBlur'
import { MyList as Plus } from '../../icons/MyList'

interface INewProfileCard {}
export const NewProfileCard: React.FC<INewProfileCard> = ({}) => {
  const { onFocus, onBlur, focus } = useFocusBlur()

  const onNewProfile = () => {}

  return (
    <Animated.View
      style={[
        styles.profile,
        {
          borderColor: focus ? colors.white['0'] : colors.white['1'],
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onNewProfile}
        style={styles.button}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        <Plus size={32} color={colors.white['0']} />
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  containerProfiles: {
    flexDirection: 'row',
  },
  profile: {
    width: 100,
    height: 100,
    borderRadius: 6,
    borderWidth: 2,
  },
  button: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  manageProfiles: {
    borderWidth: 1,
    borderColor: 'red',
    borderRadius: 4,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: 'center',
  },
})
