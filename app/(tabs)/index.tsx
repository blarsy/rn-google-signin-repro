import { Image, StyleSheet, Platform, View } from 'react-native';
import { GoogleSignin, GoogleSigninButton, User } from "@react-native-google-signin/google-signin"

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

GoogleSignin.configure({
  webClientId: '<YOUR_GOOGLE_CLIENT_ID>'
})

export default function HomeScreen() {
  const [message, setMessage] = useState('')
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
      </ThemedView>
      <View>
      <GoogleSigninButton style={{ alignSelf: 'center' }} onPress={async () => {
            setMessage('busy...')
            try{
                await GoogleSignin.hasPlayServices()
                const res = await GoogleSignin.signIn()
                
                if(res.type === 'success') {
                    //Call backend to verity google account
                    setMessage(GoogleSignin.getCurrentUser()!.user.email)
                }
            } catch (e) {
                setMessage(`Error ${e}`)
            }
        }} />
        {message && <ThemedText>{message}</ThemedText>}
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
