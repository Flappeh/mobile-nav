import { View, Text, FlatList, TouchableOpacity, ImageBackground, Image } from 'react-native'
import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable'
import { icons } from '../constants'
import { Video,ResizeMode } from 'expo-av'

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
            // <Text>
            //   asdf
            // </Text>
            <Video 
              source={{uri : item.video}}
              className='w-52 h-72 rounded-[35px] mt-3 bg-white/10'
              resizeMode={ResizeMode.CONTAIN}
              useNativeControls
              shouldPlay
              onPlaybackStatusUpdate={(status) => {
                if(status.isLoaded === true){
                  if(status.didJustFinish){
                    setplay(false)
                  }
                }
                else{
                  console.log('error not loaded')
                }
              }}
            />
          ) : (
            <TouchableOpacity className='relative justify-center items-center' activeOpacity={0.7} onPress={() => setplay(true)}>
              <ImageBackground
                source={{uri: item.thumbnail}}
                className='w-52 h-72 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40'
                resizeMode='cover'
              />
              <Image
                source={icons.play}
                className='h-12 w-12 absolute'
                resizeMode='contain'
              />
            </TouchableOpacity>
          )}
        </Animatable.View>
    )
}

const Trending = ({video}: TrendingProps) => {
  const [activeItem, setActiveItem] = useState<any>(video[0])

  const viewableItemsChanges = ({viewableItems}: any) => {
    if (viewableItems.length > 0){
      setActiveItem(viewableItems[0].key)
    }
  }
  return (
    <FlatList
        data={video}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
            <TrendingItem 
                activeItem={activeItem}
                item={item}
            />
        )}
        viewabilityConfig={{
          itemVisiblePercentThreshold: 70
        }}
        contentOffset={{x:170}}
        onViewableItemsChanged={viewableItemsChanges}
        horizontal
    >

    </FlatList>
  )
}

export default Trending