import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import React,{useState} from 'react';
import { scaleFont, scaleWidth, scaleHeight } from '../utils/scaling';
import { useNavigation } from '@react-navigation/native';
import {addToFavorites,removeFromFavorites} from '../redux/favoriteSlice';
import AddToCardButton from './AddToCardButton';
import { useDispatch } from 'react-redux';
import { addItem, removeItem } from '../utils/storageUtils';

const { width } = Dimensions.get('window');
const itemWidth = (width - 50) / 2; 

const ProductListElement = ({ id, name, image_url, price, model, brand, description,isFavoriteStatus }) => {

    const navigation = useNavigation();
    const dispatch = useDispatch()
    const [isFavorite, changeFavoriteState] = useState(isFavoriteStatus)

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
          <TouchableOpacity style={styles.favButton} 
            onPress={async () => {            
              try {
                if(!isFavorite){
                  dispatch(addToFavorites({id, name, image_url, price, model, brand}))
                  await addItem("favoriteItems", { id, name, image_url, price, model, brand}); 
                  console.log("Item added to favorites");
                  
                }
                else if(isFavorite){
                  console.log("Item removed from favorites");
                  dispatch(removeFromFavorites({id, name, image_url, price, model, brand}))
                  await removeItem("favoriteItems", id); 
                }
                changeFavoriteState(!isFavorite)
              } catch (error) {
                console.error('Error handling favorites:', error);
              }
            }}>  
            <Text style={[styles.buttonText, { color: isFavorite ? 'orange' : '#fff' }]}>Fav</Text>
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
    borderRadius: scaleWidth(8),
    marginBottom: scaleHeight(10),
  },
  name: {
    fontSize: scaleFont(16),
    fontWeight: 'bold',
    marginBottom: scaleHeight(5),
  },
  price: {
    fontSize: scaleFont(12),
    color: '#393E46',
    marginBottom: scaleHeight(10),
  },
  details: {
    fontSize: scaleFont(11),
    color: '#888',
    marginBottom: scaleHeight(5),
  },
  button: {
    backgroundColor: '#929AAB',
    paddingVertical: scaleHeight(10),
    paddingHorizontal: scaleWidth(10),
    borderRadius: scaleHeight(5),
    alignItems: 'center',
  },
  buttonContainer:{
    flexDirection:"row"
  },
  favButton:{
    backgroundColor: '#3498db',
    paddingVertical: scaleHeight(7),
    paddingHorizontal: scaleWidth(4),
    borderRadius: scaleWidth(5),
    marginLeft:scaleWidth(2),
  },
  buttonText: {
    fontSize: scaleFont(16),
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});