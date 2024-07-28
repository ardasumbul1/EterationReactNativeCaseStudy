import { StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { fetchData } from '../services/api';
import ProductListElement from '../components/ProductListElement';
import SearchBox from '../components/SearchBox';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addLocalDataToCart } from '../redux/cartSlice';
import { useDispatch } from 'react-redux';
import { getData } from '../utils/storageUtils';


const ProductListScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const dispatch = useDispatch();

  const loadCartData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('cartItems');
      if (jsonValue != null) {
        const data = JSON.parse(jsonValue);
        console.log("data",data)
        dispatch(addLocalDataToCart(data));
        return data;
      } else {
        console.log('No data found');
        return [];
      }
    } catch (e) {
      console.error('Error loading data:', e);
      return [];
    }
  };

  // method to reset AsyncStorage
  /*const clearAllData = async () => {
    try {
      await AsyncStorage.clear();
      console.log('All data cleared from AsyncStorage');
    } catch (e) {
      console.error('Failed to clear data from AsyncStorage', e);
    }
  };*/

  useEffect(() => {
    //clearAllData()
    loadCartData()
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
    if (searchQuery) {
      const filtered = data.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }, [searchQuery, data]);

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

  if (loading && page === 1) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <SafeAreaView style={styles.container}>
      <SearchBox searchQuery={searchQuery} onSearch={setSearchQuery} />
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
    </SafeAreaView>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    height:"90%"
  },
});