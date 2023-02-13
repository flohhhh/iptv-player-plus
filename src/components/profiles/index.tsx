import React from 'react'
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  TVEventHandler,
} from 'react-native'
import { useTranslation } from 'react-i18next'
import {
  IProfile,
  useProfiles,
  useSelectedProfile,
} from '../../atoms/profilesAtom'
import Text from '../text'
import { colors } from '../../utils/colors'
import { SpacerX, SpacerY } from '../spacer'
import { ProfileCard } from './ProfileCard'

const Profiles = () => {
  const [_, setSelectedProfile] = useSelectedProfile()
  const [profiles] = useProfiles()
  const { t } = useTranslation()
  const onSelectProfile = (p: IProfile) => () => {
    setSelectedProfile(p)
  }

  const onManageProfiles = () => {}

  return (
    <View>
      <Text size={30} font="CandyCake">
        {t('profiles.whos_watching')}
      </Text>

      <SpacerY size={10} />

      <View style={styles.containerProfiles}>
        {profiles.map((p, i) => (
          <React.Fragment key={p.id}>
            <ProfileCard i={i} profile={p} onSelectProfile={onSelectProfile} />
            {i !== profiles.length - 1 && <SpacerX size={14} />}
          </React.Fragment>
        ))}
      </View>

      <SpacerY size={30} />

      <TouchableOpacity
        activeOpacity={0.9}
        onPress={onManageProfiles}
        style={styles.manageProfiles}
      >
        <Text size={14}>{t('profiles.manage_profiles')}</Text>
      </TouchableOpacity>
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
  button: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  manageProfiles: {
    borderWidth: 1,
    // borderColor: colors.orange['0'],
    borderColor: 'red',
    borderRadius: 4,
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignSelf: 'center',
  },
})

export default Profiles
