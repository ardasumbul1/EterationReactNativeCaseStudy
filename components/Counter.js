import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { scaleFont, scaleWidth } from '../utils/scaling';
const buttonSize = scaleWidth(40);

const Counter = ({count, updateCount}) => {


    const handleIncrease = () => {
        updateCount(count);
      };
    
    const handleDecrease = () => {
        updateCount(prevCount => (prevCount > 1 ? prevCount - 1 : 1));
    };

      
  return (
    <View style={styles.countContainer}>
    <TouchableOpacity style={styles.countButton} onPress={handleDecrease}>
      <Text style={styles.countButtonText}>-</Text>
    </TouchableOpacity>
    <Text style={styles.count}>{count}</Text>
    <TouchableOpacity style={styles.countButton} onPress={handleIncrease}>
      <Text style={styles.countButtonText}>+</Text>
    </TouchableOpacity>
    </View>
  )
}

export default Counter

const styles = StyleSheet.create({
    countContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      countButton: {
        backgroundColor: '#d3d3d3',
        width: buttonSize,
        height: buttonSize,
        borderRadius: buttonSize / 2,
        justifyContent: 'center',
        alignItems: 'center',
      },
      countButtonText: {
        fontSize: scaleFont(18),
        color: '#000',
        fontWeight: 'bold',
      },
      count: {
        fontSize: scaleFont(18),
        marginHorizontal: 10,
      },
})