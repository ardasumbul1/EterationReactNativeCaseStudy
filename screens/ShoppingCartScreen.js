import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

const ShoppingCartScreen = () => {
  const cartItems = useSelector((state) => state.cart);
  console.log(cartItems)
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>{item.id}</Text>
      <Text style={styles.itemQuantity}>Quantity: {item.count}</Text>
      <Text style={styles.itemPrice}>Price: ${item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyCart}>Your cart is empty</Text>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

export default ShoppingCartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  emptyCart: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  itemContainer: {
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
});