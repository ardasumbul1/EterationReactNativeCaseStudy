import { StyleSheet, Text, View, FlatList, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { scaleFont, scaleWidth } from '../utils/scaling';
import ShoppingCartItem from '../components/ShoppingCartItem';

const { width, height } = Dimensions.get('window');

const ShoppingCartScreen = () => {
  const cartItems = useSelector((state) => state.cart);
  const [totalPrice, setTotalPrice] = useState(null)

  useEffect(() => {
    var updatedTotalPrice = 0
    cartItems.forEach(element => {
      updatedTotalPrice += element.price * element.count
    });
    setTotalPrice(updatedTotalPrice)
  })

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyCart}>Your cart is empty</Text>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={({ item }) => (
            <ShoppingCartItem id={item.id} name={item.name} count={item.count} price={item.price} />
          )}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
        />
      )}

      <View style={styles.footer}>
        <Text style={styles.totalPrice}>Total: ${totalPrice}</Text>
        <TouchableOpacity style={styles.button} onPress={() => { 
          console.log("Go to payment");
        }}>
          <Text style={styles.buttonText}>Complete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ShoppingCartScreen;

const styles = StyleSheet.create({
  container: {
    height:"90%",
    padding: width * 0.04,
    backgroundColor: '#fff',
    alignItems:"center"
  },
  emptyCart: {
    fontSize: scaleFont(18),
    textAlign: 'center',
    marginTop: height * 0.2,
  },
  listContent: {
    paddingBottom: height * 0.1,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    padding: width * 0.04,
    borderTopWidth: 1,
    borderTopColor: '#d3d3d3',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalPrice: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.08,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: scaleFont(16),
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});