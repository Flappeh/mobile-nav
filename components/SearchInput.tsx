import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { icons, images } from '../constants'



const SearchInput = ({value,placeholder, handleChangeText, otherStyles, ...props}: SearchInterface) => {
    const [showPassword, setShowPassword] = useState(false)
  return (
      <View className='border-2 border-black-200 w-full h-16 px-4 rounded-2xl bg-black-100 focus:border-secondary items-center flex-row space-x-4'>
        <TextInput 
            className='text-white text-base mt-0.5 font-pregular flex-1'
            value={value}
            placeholder={placeholder}
            placeholderTextColor="#7b7b8b"
            onChangeText={handleChangeText}
        />
        <TouchableOpacity>
            <Image 
                source={icons.search}
                className='w-5 h-5'
                resizeMode='contain'    
            />
        </TouchableOpacity>
      </View>
  )
}

export default SearchInput