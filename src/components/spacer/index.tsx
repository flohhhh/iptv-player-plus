import React from 'react'
import { View } from 'react-native'

interface ISpacer {
  size: number
}

export const SpacerX: React.FC<ISpacer> = ({ size }) => (
  <View style={{ width: size }} />
)

export const SpacerY: React.FC<ISpacer> = ({ size }) => (
  <View style={{ height: size }} />
)
