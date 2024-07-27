import { StyleSheet, Text, View, FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { scaleFont, scaleWidth } from '../utils/scaling';
import ProductListElement from '../components/ProductListElement';

const buttonSize = scaleWidth(40);

const FavoritesScreen = () => {
  const favoriteItems = useSelector((state) => state.favorites);
  console.log(favoriteItems)
  return (
    <View style={styles.container}>
      {favoriteItems.length === 0 ? (
        <Text style={styles.emptyCart}>Your cart is empty</Text>
      ) : (
        <FlatList
        data={favoriteItems}
        renderItem={({ item }) => (
          <ProductListElement 
            id={item.id}
            name={item.name} 
            image_url={item.image} 
            price={item.price} 
            model={item.model}
            brand={item.brand}
            description={item.description}
          />
        )}
        keyExtractor={item => item.id.toString()}
        numColumns={2}

      />
      )}
    </View>
  );
};

export default FavoritesScreen;

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