import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const BottomNavigationBar = () => {

    const navigation = useNavigation();

    return (
    <View>
        <TouchableOpacity onPress={() => navigation.navigate('Shopping Cart')}>
            <Text>CART</Text>
        </TouchableOpacity>
    </View>
    )
}

export default BottomNavigationBar

const styles = StyleSheet.create({
    container:{
        width:"100%",
        height:"10%"
    }
})