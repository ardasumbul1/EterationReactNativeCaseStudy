import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { scaleFont, scaleWidth } from '../utils/scaling';
import ShoppingCartItem from '../components/ShoppingCartItem';

const buttonSize = scaleWidth(40);

const ShoppingCartScreen = () => {
  const cartItems = useSelector((state) => state.cart);
  console.log("Burası",cartItems)


  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyCart}>Your cart is empty</Text>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={( {item} ) => (
            <ShoppingCartItem  name={item.name} count={item.count} price={item.price} />
          )}
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