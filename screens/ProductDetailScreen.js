import { StyleSheet, Text, View, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { scaleFont, scaleWidth,scaleHeight } from '../utils/scaling';
import AddToCardButton from '../components/AddToCardButton';


const { width } = Dimensions.get('window');
const buttonSize = scaleWidth(40);

const ProductDetailScreen = ({ route }) => {
  const { id, name, image_url, model, brand, price, description } = route.params;

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
        <AddToCardButton id={id} name={name} price={price} count={count} />
      </View>
    </View>
  );
};

export default ProductDetailScreen;

const styles = StyleSheet.create({
  container: {
    height:"90%",
    padding: scaleHeight(16),
    backgroundColor: '#fff',
  },
  image: {
    width: width * 0.8,
    height: width * 0.7,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: scaleHeight(10),
  },
  name: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: scaleHeight(8),
  },
  details: {
    fontSize: scaleFont(16),
    textAlign: 'center',
    color: 'gray',
    marginBottom: scaleHeight(8),
  },
  descriptionContainer: {
    flex: 1,
    marginBottom: scaleHeight(8),
  },
  description: {
    fontSize: scaleFont(14),
    textAlign: 'justify',
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: scaleHeight(5),
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
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
    marginHorizontal: scaleWidth(10),
  },
  price: {
    fontSize: scaleFont(20),
    textAlign: 'center',
    color: 'green',
    fontWeight: 'bold',
  },

});