import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import {
  useLastSelectedProfileID,
  useProfiles,
  useSelectedProfileSet,
} from '../../atoms/profiles/profilesAtom'
import Text from '../text'
import { colors } from '../../utils/colors'
import { SpacerX, SpacerY } from '../spacer'
import { ProfileCard } from './ProfileCard'
import { IProfile } from '../../atoms/profiles/types'
import { NewProfileCard } from './NewProfileCard'
import { Keyboard } from 'react-native'

interface ISelectProfiles {
  onNewProfile: () => void
}
const SelectProfiles: React.FC<ISelectProfiles> = ({ onNewProfile }) => {
  const setSelectedProfile = useSelectedProfileSet()
  const lastSelectedProfileID = useLastSelectedProfileID()

  const [profiles] = useProfiles()
  const { t } = useTranslation()
  const onSelectProfile = (p: IProfile) => () => {
    setSelectedProfile(p)
  }

  useEffect(() => {
    console.log('----Coucou')
    Keyboard.dismiss()
  }, [])

  return (
    <View>
      <Text size={40} font="CandyCake">
        {t('profiles.whos_watching')}
      </Text>

      <SpacerY size={20} />

      <View style={styles.containerProfiles}>
        {profiles?.length <= 4 && (
          <>
            <NewProfileCard onNewProfile={onNewProfile} />
            <SpacerX size={14} />
          </>
        )}
        {profiles.map((p, i) => (
          <React.Fragment key={p?.id || i}>
            <ProfileCard
              i={i}
              selectedProfileID={lastSelectedProfileID}
              profile={p}
              onSelectProfile={onSelectProfile}
            />
            {i !== profiles.length - 1 && <SpacerX size={14} />}
          </React.Fragment>
        ))}
      </View>

      <SpacerY size={30} />
    </View>
  )
}

const styles = StyleSheet.create({
  containerProfiles: {
    flexDirection: 'row-reverse',
    justifyContent: 'flex-end',
  },
  profile: {
    width: 100,
    height: 100,
    backgroundColor: colors.white['0'],
    borderRadius: 10,
    borderWidth: 2,
  },
})

export default SelectProfiles
