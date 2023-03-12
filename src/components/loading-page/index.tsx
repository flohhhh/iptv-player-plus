import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import { Cake } from '../../icons/Cake'
import { SpacerX, SpacerY } from '../spacer'
import Text from '../text'
import { colors } from '../../utils/colors'
import { useMoviesByCategoryId } from '../../atoms/api/moviesByCategoryId'

export const LoadingPage = () => {
  const [ready, setReady] = useState(false)

  // useEffect(() => {}, [])

  return (
    <View>
      <View style={styles.container}>
        <Cake size={64} />

        <SpacerX size={12} />

        <Text size={24}>
          <Text size={32} font="CandyCake" color={colors.fun.redSecondary}>
            C
          </Text>
          <SpacerX size={4} />
          <Text size={32} font="CandyCake" color={colors.fun.greenSecondary}>
            A
          </Text>
          <SpacerX size={4} />
          <Text size={32} font="CandyCake" color={colors.fun.orangeSecondary}>
            K
          </Text>
          <Text size={32} font="CandyCake" color={colors.fun.pinkSecondary}>
            E
          </Text>{' '}
          TV
        </Text>

        <SpacerX size={12} />

        <ActivityIndicator size="small" color={colors.white['1']} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
