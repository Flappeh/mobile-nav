import React from 'react'
import { Text } from 'react-native'
import { Slot, Stack } from 'expo-router'
import { useFonts } from 'expo-font';

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{headerShown: false}} ></Stack.Screen>
    </Stack>
  )
}



export default RootLayout
