import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className='text-3xl'>Mantap Bisa njeng!</Text>
      <StatusBar style="auto" />
      <Link href="/profile" className='text-xl font-bold text-blue-600 '> Go to Profile </Link>
    </View>
  );
}
