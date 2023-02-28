import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import SelectProfiles from './SelectProfiles'
import { NewProfile } from './NewProfile'
import { colors } from '../../utils/colors'

const Profiles = () => {
  const [newProfile, setNewProfile] = useState<boolean>(false)
  const onNewProfile = () => {
    setNewProfile(true)
  }

  const onClose = () => {
    setNewProfile(false)
  }

  return (
    <View>
      {newProfile ? (
        <NewProfile onClose={onClose} />
      ) : (
        <SelectProfiles onNewProfile={onNewProfile} />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  containerProfiles: {
    flexDirection: 'row',
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

export default Profiles
