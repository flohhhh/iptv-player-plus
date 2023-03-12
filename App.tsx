import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { useSelectedProfileValue } from './src/atoms/profiles/profilesAtom'
import Home from './src/components/home'
import Profiles from './src/components/profiles'
import { useSelectedAccount } from './src/atoms/accounts/accountsAtom'
import { SelectAccount } from './src/components/accounts'

const App = () => {
  const { account } = useSelectedAccount()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // setTimeout(() => {
    //   setReady(true)
    // }, 10000)
  }, [])

  const selectedProfile = useSelectedProfileValue()

  // if (loadingMovies) {
  //   return (
  //     <View style={styles.container}>
  //       <LoadingPage />
  //     </View>
  //   )
  // }

  return (
    <View style={styles.container}>
      {!account ? <SelectAccount /> : selectedProfile ? <Home /> : <Profiles />}
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
