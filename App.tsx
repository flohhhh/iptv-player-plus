import React from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelectedProfileValue } from './src/atoms/profiles/profilesAtom'
import { useInitializeDefaultValues } from './src/hooks/useInitializeDefaultValues'
import { useSelectedAccount } from './src/atoms/accounts/accountsAtom'
import Player from './src/components/player'
import 'react-native/tvos-types.d'

const App = () => {
  const { account } = useSelectedAccount()

  const selectedProfile = useSelectedProfileValue()

  useInitializeDefaultValues()

  return (
    <View style={styles.container}>
      <Player />
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
