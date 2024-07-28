import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { scaleFont, scaleWidth } from '../utils/scaling';
import { updateQuantity } from '../redux/cartSlice';
import { useDispatch } from 'react-redux';
import { updateItemInList } from '../utils/storageUtils';

const buttonSize = scaleWidth(40);

const ShoppingCartItem = ({ id, name, count, price }) => {
  const dispatch = useDispatch();
  const [countToUpdate, setCount] = useState(count);

  const handleIncrease = async () => {
    const newCount = countToUpdate + 1;
    setCount(newCount);
    dispatch(updateQuantity({ id, name, count: newCount, price }));
  };

  const handleDecrease = async () => {
    const newCount = countToUpdate > 1 ? countToUpdate - 1 : 1;
    setCount(newCount);
    dispatch(updateQuantity({ id, name, count: newCount, price }));
  };

  useEffect(() => {
    const updateItem = async () => {
      await updateItemInList("cartItems", { id, name, count: countToUpdate, price });
    };
    updateItem();
  }, [countToUpdate]);

  
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.itemName}>{name}</Text>
        <Text style={styles.itemQuantity}>Quantity: {countToUpdate}</Text>
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
  );
};

export default ShoppingCartItem;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
  },
  infoContainer: {
    padding: scaleWidth(16),
  },
  itemName: {
    fontSize: scaleFont(16),
    fontWeight: 'bold',
  },
  itemQuantity: {
    fontSize: scaleFont(14),
    color: 'gray',
  },
  itemPrice: {
    fontSize: scaleFont(14),
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
});