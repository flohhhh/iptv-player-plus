import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Text from '../../text'
import { colors } from '../../../utils/colors'
import { SpacerX, SpacerY } from '../../spacer'
import { buildApiUrl, fetchConfig } from '../../../atoms/api/utils'
import { useSelectedAccount } from '../../../atoms/accounts/accountsAtom'
import { useFocusSerieId } from '../../../atoms/api/seriesCategories'
import { ISerieInfo } from '../../../atoms/api/seriesTypes'
import { useTranslation } from 'react-i18next'

export const SerieDetails: React.FC = () => {
  const { t } = useTranslation()
  const [details, setDetails] = useState<ISerieInfo | null>(null)
  const { account } = useSelectedAccount()
  const { focusSerieId } = useFocusSerieId()

  const callAsync = async (id: number) => {
    if (!account) return
    const res = await fetch(
      buildApiUrl(account, ['get_series_info', 'series_id=%sid%s'], String(id)),
      fetchConfig
    )
    const data = await res.json()
    setDetails(data)
  }

  useEffect(() => {
    if (focusSerieId > -1) {
      callAsync(focusSerieId)
    }
  }, [focusSerieId])

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
          {details.info.releaseDate.slice(0, 4)}
        </Text>

        <SpacerX size={8} />

        <Text size={10} color={colors.white['0']}>
          {t(`series.season${details.seasons.length > 1 ? 's' : ''}_total`, {
            num: details.seasons.length,
          })}
        </Text>

        <SpacerX size={8} />

        <Text size={10} color={colors.white['0']}>
          {t(
            `series.episode${
              Object.keys(details.episodes).length > 1 ? 's' : ''
            }_total`,
            { num: Object.keys(details.episodes).length }
          )}
        </Text>

        <SpacerX size={8} />

        <Text size={10} color={colors.white['0']}>
          {details.info.genre}
        </Text>

        <SpacerX size={8} />

        <SpacerX size={8} />

        <Text size={10} color={colors.white['0']}>
          {Number(details.info.rating).toFixed(1).replace('.0', '')} / 10
        </Text>
      </View>

      <SpacerY size={8} />

      <View style={styles.description}>
        <Text size={10} color={colors.white['1']}>
          {details.info.plot}
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
