import React from 'react'
import { StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'
import { colors } from '../../utils/colors'
import { MyList as Plus } from '../../icons/MyList'
import { FocusPressableWithFocus } from '../focus-pressable/FocusPressable'

interface INewProfileCard {
  onNewProfile: () => void
}
export const NewProfileCard: React.FC<INewProfileCard> = ({ onNewProfile }) => {
  return (
    <FocusPressableWithFocus onPress={onNewProfile}>
      {(focus) => (
        <Animated.View
          style={[
            styles.profile,
            {
              borderColor: focus ? colors.white['0'] : colors.white['2'],
              scaleX: focus ? 1 : 0.9,
              scaleY: focus ? 1 : 0.9,
            },
          ]}
        >
          <Plus
            size={focus ? 32 : 30}
            color={colors.white[focus ? '0' : '2']}
          />
        </Animated.View>
      )}
    </FocusPressableWithFocus>
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
    justifyContent: 'center',
    alignItems: 'center',
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
