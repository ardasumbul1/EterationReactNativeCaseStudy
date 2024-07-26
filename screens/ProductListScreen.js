import { StyleSheet, Text, View, SafeAreaView, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { fetchData } from '../services/api';
import ProductListElement from '../components/ProductListElement';
import SearchBox from '../components/SearchBox';
const ProductListScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

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

    // Cleanup timeout on component unmount or when `page` changes
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
    setIsLoadMore(true);
    setPage(prevPage => prevPage + 1);
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
            name={item.name} 
            image_url={item.image} 
            price={item.price} 
            model={item.model}
            brand={item.brand}
          />
        )}
        keyExtractor={item => item.id}
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
    container:{
        alignItems:"center",
        backgroundColor:"#EEEEEE"
    }
});