import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import { scaleFont } from '../utils/scaling';

const { width } = Dimensions.get('window');
const itemWidth = (width - 50) / 2; // Subtracting margins and spacing for two columns

const ProductListElement = ({ name, image_url, price, description }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: image_url }} />
      <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail'>
        {name}
      </Text>
      <Text style={styles.price}>${price}</Text>
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProductListElement;

const styles = StyleSheet.create({
  container: {
    width: itemWidth,
    margin: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: '100%',
    aspectRatio: 1/1,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: scaleFont(14),
    color: '#888',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#929AAB',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: scaleFont(16),
    fontWeight: 'bold',
  },
});