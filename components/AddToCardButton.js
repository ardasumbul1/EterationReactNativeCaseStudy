import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scaleFont, scaleWidth } from '../utils/scaling';
import { addToCart } from '../redux/cartSlice';
import { getData, updateItemInList, isHaveItem, addItem } from '../utils/storageUtils';

const AddToCardButton = ({ id,name, price,count }) => {



    dispatch = useDispatch()
    return (
    <TouchableOpacity style={styles.button} onPress={() => { 
        dispatch(addToCart({ id, name, price,count }))
        addItem("cartItems",{ id, name, price, count })
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
        paddingHorizontal: 10,
        borderRadius: 5,
      },
      buttonText: {
        fontSize: scaleFont(16),
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
      },
})