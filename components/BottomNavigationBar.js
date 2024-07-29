import { StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const BottomNavigationBar = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.button}>
                <Text style={styles.buttonText}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Shopping Cart')} style={styles.button}>
                <Text style={styles.buttonText}>Cart</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Favorites')} style={styles.button}>
                <Text style={styles.buttonText}>Favorites</Text>
            </TouchableOpacity>
        </View>
    );
}

export default BottomNavigationBar

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: height * 0.09,
        flexDirection:"row",
        justifyContent: 'space-evenly',
        display:"space-between",
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
        borderTopWidth: 1,
        borderColor: '#e7e7e7',
        position: 'absolute',
        bottom: 0,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: height * 0.02,
        paddingHorizontal: width * 0.05,
        borderRadius: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: height * 0.02,
        fontWeight: 'bold',
    },
});