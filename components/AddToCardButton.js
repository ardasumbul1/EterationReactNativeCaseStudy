import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scaleFont, scaleWidth } from '../utils/scaling';
import { addToCart } from '../redux/cartSlice';


const AddToCardButton = ({ id,name, price,count }) => {

    const addItem = async (newItem) => {
        try {
            const existingData = await AsyncStorage.getItem('anotherKey');
            const data = existingData ? JSON.parse(existingData) : [];
            data.push(newItem);
        
            await AsyncStorage.setItem('anotherKey', JSON.stringify(data));
        
            console.log('Item added successfully!');
        } catch (error) {
            console.error('Error adding item:', error);
        }
        };

    dispatch = useDispatch()
    return (
    <TouchableOpacity style={styles.button} onPress={() => { 
        dispatch(addToCart({ id, name, price,count }))
        addItem({ id, name, price,count })
        console.log(name)
        }}>
        <Text style={styles.buttonText}>Add to Cart</Text>
    </TouchableOpacity>
    )
}

export default AddToCardButton

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#3498db',
        paddingVertical: 7,
        paddingHorizontal: 20,
        borderRadius: 5,
      },
      buttonText: {
        fontSize: scaleFont(16),
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
      },
})