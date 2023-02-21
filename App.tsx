import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelectedProfileValue } from './src/atoms/profiles/profilesAtom'
import Home from './src/components/home'
import Profiles from './src/components/profiles'
import { useInitializeDefaultValues } from './src/hooks/useInitializeDefaultValues'

const App = () => {
  const selectedProfile = useSelectedProfileValue()

  useInitializeDefaultValues()

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
