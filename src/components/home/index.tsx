import { FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelectedProfile } from '../../atoms/profilesAtom'
import { useTranslation } from 'react-i18next'
import Text from '../text'

const Home = () => {
  const [selectedProfile] = useSelectedProfile()
  const { t } = useTranslation()
  return (
    <>
      <Text size={40}>{t('test')}</Text>
      <FlatList
        data={['A', 'B', 'C', 'D', 'E', 'F', 'G']}
        renderItem={({ item }) => (
          <TouchableOpacity
            key={item}
            style={[
              {
                width: 50,
                height: 50,
                backgroundColor: 'blue',
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}
            onPress={() => {
              console.log('CLicked ' + t('test'))
            }}
          >
            <Text size={20}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </>
  )
}

export default Home
