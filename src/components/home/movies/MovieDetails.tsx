import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Text from '../../text'
import { colors } from '../../../utils/colors'
import {
  useFocusMovieId,
  useMovieDetails,
} from '../../../atoms/api/moviesCategories'
import { SpacerX, SpacerY } from '../../spacer'
import { IInfoMovieData } from '../../../atoms/api/moviesTypes'
import { buildApiUrl, fetchConfig } from '../../../atoms/api/utils'
import { useSelectedAccount } from '../../../atoms/accounts/accountsAtom'

export const MovieDetails: React.FC = () => {
  const [details, setDetails] = useState<IInfoMovieData | null>(null)
  const { account } = useSelectedAccount()
  const { focusMovieId } = useFocusMovieId()

  const callAsync = async (id: number) => {
    const res = await fetch(
      buildApiUrl(account, ['get_vod_info', 'vod_id=%sid%s'], id),
      fetchConfig
    )
    const data = await res.json()
    setDetails(data)
  }

  useEffect(() => {
    if (focusMovieId > -1) {
      callAsync(focusMovieId)
    }
  }, [focusMovieId])

  if (!details || !details.info) {
    return <View style={styles.container} />
  }
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <Text size={16} color={colors.white['0']}>
          {details.info.name}
        </Text>
      </View>

      <View style={styles.subtitle}>
        <Text size={10} color={colors.white['0']}>
          {details.info.releasedate.slice(0, 4)}
        </Text>

        <SpacerX size={8} />

        <Text size={10} color={colors.white['0']}>
          {details.info.duration}
        </Text>

        <SpacerX size={8} />

        <Text size={10} color={colors.white['0']}>
          {details.info.genre}
        </Text>

        <SpacerX size={8} />

        <Text size={10} color={colors.white['0']}>
          {details.info.country}
        </Text>

        <SpacerX size={8} />

        <Text size={10} color={colors.white['0']}>
          {Number(details.info.rating).toFixed(1).replace('.0', '')} / 10
        </Text>
      </View>

      <SpacerY size={8} />

      <View style={styles.description}>
        <Text size={10} color={colors.white['1']}>
          {details.info.description}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: 140,
  },
  title: { flexDirection: 'row', alignItems: 'center' },
  subtitle: { flexDirection: 'row' },
  description: {},
})
