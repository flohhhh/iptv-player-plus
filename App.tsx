import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelectedProfile } from './src/atoms/profilesAtom'
import Home from './src/components/home'
import Profiles from './src/components/profiles'

const App = () => {
  const [selectedProfile] = useSelectedProfile()

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
