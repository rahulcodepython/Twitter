import SignOutButton from '@/components/SignOutButton'
import { useUserSync } from '@/hooks/useUserSync'
import React from 'react'
import { Text, View } from 'react-native'

const HomeScreen = () => {
    useUserSync()
    return (
        <View>
            <Text>HomeScreen</Text>
            <SignOutButton />
        </View>
    )
}

export default HomeScreen