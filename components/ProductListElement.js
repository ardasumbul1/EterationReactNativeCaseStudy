import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import { scaleFont } from '../utils/scaling';
import { useNavigation } from '@react-navigation/native';
import {addToFavorites,removeFromFavorites} from '../redux/favoriteSlice';
import AddToCardButton from './AddToCardButton';
import { useDispatch } from 'react-redux';

const { width } = Dimensions.get('window');
const itemWidth = (width - 50) / 2; 

const ProductListElement = ({ id, name, image_url, price, model, brand, description }) => {

    const navigation = useNavigation();
    const dispatch = useDispatch()

    const handleAddToFavorites = (id, name, image_url, price, model, brand, description) => {
      console.log("methoda girdi")
      dispatch(addToFavorites({id, name, image_url, price, model, brand, description}))
    }

  return (
    <TouchableOpacity style={styles.imageContainer} onPress={() => navigation.navigate('Product Details', {
        id,
        name,
        image_url,
        model,
        brand,
        price,
        description
      })}>
        <View style={styles.container}>
        <Image style={styles.image} source={{ uri: image_url }} />
        <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail'>
            {name}
        </Text>
        <Text style={styles.details}>{model} - {brand}</Text>
        <Text style={styles.price}>${price}</Text>
        <View style={styles.buttonContainer}>
          <AddToCardButton id={id} name={name} price={price} count={1}/>
          <TouchableOpacity style={styles.favButton} onPress={() => handleAddToFavorites(id, name, image_url, price, model, brand, description)}>
            <Text style={styles.buttonText}>Fav</Text>
          </TouchableOpacity>
        </View>

        </View>
    </TouchableOpacity>
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
    aspectRatio: 4/3,
    borderRadius: 8,
    marginBottom: 10,
  },
  name: {
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    marginBottom: 5,
  },
  price: {
    fontSize: scaleFont(12),
    color: '#393E46',
    marginBottom: 10,
  },
  details: {
    fontSize: scaleFont(11),
    color: '#888',
    marginBottom: 5,
  },
  button: {
    backgroundColor: '#929AAB',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: scaleFont(16),
    fontWeight: 'bold',
  },
  buttonContainer:{
    flexDirection:"row"
  },
  favButton:{
    backgroundColor: '#3498db',
    paddingVertical: 7,
    paddingHorizontal: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: scaleFont(16),
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});