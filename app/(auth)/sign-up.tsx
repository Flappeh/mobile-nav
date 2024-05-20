import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import {createUser} from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'


const SignUp = () => {

  const {setUser} = useGlobalContext();
  const [form, setForm] = useState({
    username:"",
    email:"",
    password:""
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all of the fields")
    }
    setIsSubmitting(true)
    try{
      const userData: userCreate = {
        email: form.email,
        password: form.password,
        username: form.username
      }
      const result = await createUser(userData)
      setUser(result)
      router.replace('/home')
    }
    catch(err){
      alert("Error", err.message)
    }finally{
      setIsSubmitting(false)
    }
  }
  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView>
        <View className='w-full min-h-[85vh] justify-center px-4 my-6'>
          <Image source={images.logo} resizeMode='contain' className='w-[150px] h-[35px]'/>
            <Text className='text-2xl text-white font-semibold mt-10'>
              Log in to Aora!
            </Text>
            <FormField
              title="Username"
              value={form.username}
              handleChangeText={(e:Event) => {
                setForm({...form, username: e})
              }}
              otherStyles="mt-10"
              keyboardType="usename"
              />
            <FormField
              title="Email"
              value={form.email}
              handleChangeText={(e:Event) => {
                setForm({...form, email: e})
              }}
              otherStyles="mt-7"
              keyboardType="email-address"
              />
            <FormField
              title="Password"
              value={form.password}
              handleChangeText={(e:Event) => {
                setForm({...form, password: e})
              }}
              otherStyles="mt-7"
              />

            <CustomButton
              title='Sign Up'
              handlePress={submit}
              containerStyles='mt-7'
              isLoading={isSubmitting}
              />
              <View className='justify-center pt-5 flex-row gap-2'>
                <Text className='text-lg text-gray-100 font-pregular'>
                  Have an account already?
                </Text>
                <Link href="/sign-in" className='text-lg font-psemibold text-secondary'>
                  Sign In!
                </Link>
              </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp
