import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useState} from 'react'
import { scaleFont, scaleWidth } from '../utils/scaling';

const buttonSize = scaleWidth(40);
const ShoppingCartItem = ({ name, count, price }) => {
    
    const [countToUpdate, setCount] = useState(count);

    const handleIncrease = () => {
      setCount(prevCount => prevCount + 1);
      count ++
    };
  
    const handleDecrease = () => {
      setCount(prevCount => (prevCount > 1 ? prevCount - 1 : 1));
    };
  
  return (
    <View style={styles.container}>
        <View style={styles.infoContainer}>
        <Text style={styles.itemName}>{name}</Text>
        <Text style={styles.itemQuantity}>Quantity: {count}</Text>
        <Text style={styles.itemPrice}>Price: ${price}</Text>
        </View>
        <View style={styles.countContainer}>
          <TouchableOpacity style={styles.countButton} onPress={handleDecrease}>
            <Text style={styles.countButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.count}>{countToUpdate}</Text>
          <TouchableOpacity style={styles.countButton} onPress={handleIncrease}>
            <Text style={styles.countButtonText}>+</Text>
          </TouchableOpacity>
        </View>
    </View>

  )
}

export default ShoppingCartItem

const styles = StyleSheet.create({
  container:{
    display:"flex",
    flexDirection:"row",
    justifyContent:"space-between"
  },
  infoContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemQuantity: {
    fontSize: 14,
    color: 'gray',
  },
  itemPrice: {
    fontSize: 14,
    color: 'green',
  },
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