import { StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { fetchData } from '../services/api';
import ProductListElement from '../components/ProductListElement';
import SearchBox from '../components/SearchBox';
import { scaleFont, scaleHeight } from '../utils/scaling';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addLocalDataToCart } from '../redux/cartSlice';
import { addLocalDataToFavItems } from '../redux/favoriteSlice';
import { useDispatch } from 'react-redux';
import FilterModal from '../components/FilterModal'; // Import the FilterModal component

const ProductListScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [filters, setFilters] = useState({ model: '', minPrice: 0, maxPrice: Infinity });

  const dispatch = useDispatch();

  const loadCartData = async () => {
    try {
      const cartItemsString = await AsyncStorage.getItem('cartItems');
      const favoriteItemsString = await AsyncStorage.getItem('favoriteItems');

      const cartItems = cartItemsString ? JSON.parse(cartItemsString) : [];
      const favoriteItems = favoriteItemsString ? JSON.parse(favoriteItemsString) : [];

      if (cartItems.length > 0) {
        console.log("cartItems", cartItems);
        dispatch(addLocalDataToCart(cartItems));
      } else {
        console.log('No cart items found');
      }

      if (favoriteItems.length > 0) {
        console.log("favoriteItems", favoriteItems);
        dispatch(addLocalDataToFavItems(favoriteItems));
      } else {
        console.log('No favorite items found');
      }

      return cartItems.length > 0 || favoriteItems.length > 0;

    } catch (e) {
      console.error('Error loading data:', e);
      return false;
    }
  };

  useEffect(() => {
    loadCartData();
  }, []);

  const loadData = async (page, pageSize) => {
    try {
      const response = await fetchData(page, pageSize);
      setData(prevData => page === 1 ? response : [...prevData, ...response]);
      setLoading(false);
      setIsRefreshing(false);
      setIsLoadMore(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      setIsRefreshing(false);
      setIsLoadMore(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadData(page, 12);
    }, 500); // 500ms timeout

    return () => clearTimeout(timer);
  }, [page]);

  useEffect(() => {
    if (searchQuery || filters.model || filters.minPrice || filters.maxPrice !== Infinity) {
      const filtered = data.filter(product => 
        (product.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (filters.model ? product.model.toLowerCase().includes(filters.model.toLowerCase()) : true) &&
        (filters.minPrice ? product.price >= filters.minPrice : true) &&
        (filters.maxPrice !== Infinity ? product.price <= filters.maxPrice : true)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [searchQuery, data, filters]);

  const handleLoadMore = () => {
    if (!isLoadMore) {
      setIsLoadMore(true);
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setPage(1);
  };

  const applyFilters = (filterData) => {
    setFilters(filterData);
  };

  if (loading && page === 1) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterContainer}>
        <SearchBox searchQuery={searchQuery} onSearch={setSearchQuery} />
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>Filter</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredData}
        renderItem={({ item }) => (
          <ProductListElement 
            id={item.id}
            name={item.name} 
            image_url={item.image} 
            price={item.price} 
            model={item.model}
            brand={item.brand}
            description={item.description}
            isFavoriteStatus={false}
          />
        )}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        ListFooterComponent={() => isLoadMore ? <ActivityIndicator size="large" /> : null}
      />
      <FilterModal
        visible={modalVisible}
        onClose

={() => setModalVisible(false)}
        onApply={applyFilters}
      />
    </SafeAreaView>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height: "90%"
  },
  filterContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: scaleHeight(10),
  },
  button: {
    backgroundColor: 'grey',
    paddingVertical: scaleHeight(7),
    width: "20%",
    justifyContent: "center"
  },
  buttonText: {
    fontSize: scaleFont(15),
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});