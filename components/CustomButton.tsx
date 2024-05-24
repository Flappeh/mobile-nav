import { View, TouchableOpacity,Text } from 'react-native'
import React from 'react'


const CustomButton = ({title, handlePress, containerStyles, textStyles, isLoading}: buttonProps) => {
  return (
    <TouchableOpacity 
        className={`bg-secondary-100 justify-center items-center min-h-[62px] rounded-xl ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
        onPress={handlePress}
        activeOpacity={0.7}
        disabled={isLoading}
        >
        <Text className={`text-primary font-psemibold text-lg ${textStyles}`}>
            {title}
        </Text>
    </TouchableOpacity>
  )
}

export default CustomButton