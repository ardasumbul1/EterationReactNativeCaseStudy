import { StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { scaleFont } from '../utils/scaling';

const { width } = Dimensions.get('window');

const ProductDetailScreen = ({ route }) => {
  const { name, image_url, model, brand, price, description } = route.params;
  const [count, setCount] = useState(1);

  const handleIncrease = () => {
    setCount(prevCount => prevCount + 1);
  };

  const handleDecrease = () => {
    setCount(prevCount => (prevCount > 1 ? prevCount - 1 : 1));
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: image_url }} />
      <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
        {name}
      </Text>
      <Text style={styles.details}>{model} - {brand}</Text>
      <ScrollView style={styles.descriptionContainer}>
        <Text style={styles.description}>{description}</Text>
      </ScrollView>
      <View style={styles.footer}>
        <View style={styles.countContainer}>
          <TouchableOpacity style={styles.countButton} onPress={handleDecrease}>
            <Text style={styles.countButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.count}>{count}</Text>
          <TouchableOpacity style={styles.countButton} onPress={handleIncrease}>
            <Text style={styles.countButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.price}>${count * price}</Text>
        <TouchableOpacity style={styles.button} onPress={() => { /* Add to cart func*/ }}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  image: {
    width: width * 0.7,
    height: width * 0.7,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 10,
  },
  name: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  details: {
    fontSize: scaleFont(16),
    textAlign: 'center',
    color: 'gray',
    marginBottom: 8,
  },
  descriptionContainer: {
    flex: 1,
    marginBottom: 16,
  },
  description: {
    fontSize: scaleFont(14),
    textAlign: 'left',
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  countContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countButton: {
    backgroundColor: '#d3d3d3',
    padding: 10,
    borderRadius: 5,
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
  price: {
    fontSize: scaleFont(20),
    textAlign: 'center',
    color: 'green',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: scaleFont(16),
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});