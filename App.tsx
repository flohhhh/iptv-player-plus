import React, { useEffect } from 'react'
import { StyleSheet, useTVEventHandler, View } from 'react-native'
import { useTranslation } from 'react-i18next'
import { useSelectedProfile } from './src/atoms/profilesAtom'
import Home from './src/components/home'
import Profiles from './src/components/profiles'

const App = () => {
  const { t } = useTranslation()
  const [lastEventType, setLastEventType] = React.useState('')

  const myTVEventHandler = (evt) => {
    setLastEventType(evt.eventType)
  }

  useTVEventHandler(myTVEventHandler)

  const [selectedProfile] = useSelectedProfile()

  console.log('----selectedProfile', selectedProfile)
  return (
    <View style={styles.container}>
      {selectedProfile ? <Home /> : <Profiles />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default App
