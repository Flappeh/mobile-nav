import { View, Text, FlatList, TouchableOpacity, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable'

interface AnimationProps{
  activeItem: string,
  item: VideoProps
}

const zoomIn = {
  0: {
    scale: 0.9
  },
  1: {
    scale: 1
  }
}

const zoomOut = {
  0: {
    scale: 1
  },
  1: {
    scale: 0.9
  }
}

const TrendingItem = ({activeItem, item}: AnimationProps ) => {
  const [play, setplay] = useState(false)
  return (
        <Animatable.View 
          className='mr-5' 
          animation={activeItem === item.$id ? zoomIn : zoomOut}
          duration={500}  
        >
          {play ? (
            <Text className='text-white'>
              Playing
            </Text>
          ) : (
            <TouchableOpacity className='relative justify-center items-center' activeOpacity={0.7} onPress={() => setplay(true)}>
              <ImageBackground
                source={{uri: item.thumbnail}}
                className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40'
                resizeMode='cover'
              />
            </TouchableOpacity>
          )}
        </Animatable.View>
    )
}

const Trending = ({video}: TrendingProps) => {
  const [activeItem, setactiveItem] = useState<string|undefined>(video[0].$id)
  console.log(video)
  return (
    <FlatList
        data={video}
        // @ts-ignore
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
            <TrendingItem 
                activeItem={activeItem}
                item={item}
            />
        )}
        horizontal
    >

    </FlatList>
  )
}

export default Trending