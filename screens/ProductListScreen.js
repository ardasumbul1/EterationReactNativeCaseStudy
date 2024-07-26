import { StyleSheet, Text, View } from 'react-native'
import React,{ useState, useEffect }  from 'react'
import axios from 'axios';
import { fetchData } from '../services/api';

const ProductListScreen = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      fetchData()
        .then(response => {
          setData(response.data);
          setLoading(false);
        })
        .catch(error => {
          setError(error);
          setLoading(false);
        });
    }, []);
  
    if (loading) return <Text>Loading...</Text>;
    if (error) return <Text>Error: {error.message}</Text>;
  
    return <Text>Data: {JSON.stringify(data[0])}</Text>;
  };
  
export default ProductListScreen

const styles = StyleSheet.create({})