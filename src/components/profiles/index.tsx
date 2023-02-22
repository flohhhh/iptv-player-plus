import React, { useState } from 'react'
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
import { EditProfilesButton } from './EditProfilesButton'

const orderedProfiles = {
  kids: 10,
}

const Profiles = () => {
  const setSelectedProfile = useSelectedProfileSet()
  const lastSelectedProfileID = useLastSelectedProfileID()

  const [editMode, setEditMode] = useState(false)

  const [profiles] = useProfiles()
  const { t } = useTranslation()
  const onSelectProfile = (p: IProfile) => () => {
    setSelectedProfile(p)
  }

  const allProfiles: Array<IProfile | null> =
    profiles.length === 4 ? profiles : [...profiles, null]
  // .sort((a, b) => (a == null ? -2 : a.id === 'kids' ? 1 : -1))

  const onEditProfilesButton = () => {
    setEditMode(!editMode)
  }

  return (
    <View>
      <Text size={40} font="CandyCake">
        {t('profiles.whos_watching')}
      </Text>

      <SpacerY size={10} />

      <View style={styles.containerProfiles}>
        {allProfiles.map((p, i) => (
          <React.Fragment key={p?.id || i}>
            {p === null ? (
              <NewProfileCard />
            ) : (
              <ProfileCard
                i={i}
                selectedProfileID={lastSelectedProfileID}
                profile={p}
                onSelectProfile={onSelectProfile}
              />
            )}
            {i !== allProfiles.length - 1 && <SpacerX size={14} />}
          </React.Fragment>
        ))}
      </View>

      <SpacerY size={30} />
      <EditProfilesButton onEditProfilesButton={onEditProfilesButton} />
    </View>
  )
}

const styles = StyleSheet.create({
  containerProfiles: {
    flexDirection: 'row',
  },
  profile: {
    width: 100,
    height: 100,
    backgroundColor: colors.white['0'],
    borderRadius: 10,
    borderWidth: 2,
  },
})

export default Profiles
