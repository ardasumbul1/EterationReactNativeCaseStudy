import AsyncStorage from '@react-native-async-storage/async-storage';

export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Failed to get data from AsyncStorage:', e);
    return [];
  }
};

export const isHaveItem = async (key, id) => {
  try {
    const items = await getData(key);
    const index = items.findIndex(item => item.id === id);
    return index !== -1;
  } catch (e) {
    console.error('Failed to check item in AsyncStorage:', e);
    return false;
  }
};

export const updateItemQuantityInList = async (key, newItem) => {
  try {
    const items = await getData(key);
    const index = items.findIndex(item => item.id === newItem.id);
    if (index !== -1) {
      items[index].count = items[index].count + newItem.count;
      await AsyncStorage.setItem(key, JSON.stringify(items));
    }
  } catch (e) {
    console.error('Failed to update item in AsyncStorage:', e);
  }
};

export const updateItemInList = async (key, newItem) => {
    try {
      const items = await getData(key);
      const index = items.findIndex(item => item.id === newItem.id);
      if (index !== -1) {
        items[index].count = newItem.count;
        await AsyncStorage.setItem(key, JSON.stringify(items));
      }
    } catch (e) {
      console.error('Failed to update item in AsyncStorage:', e);
    }
  };

export const addItem = async (key, newItem) => {
  try {
    const itemExists = await isHaveItem(key, newItem.id);
    if (itemExists) {
      console.log("Updating existing item");
      await updateItemQuantityInList(key, newItem);
    } else {
      console.log("Adding new item");
      const existingData = await getData(key);
      existingData.push(newItem);
      await AsyncStorage.setItem(key, JSON.stringify(existingData));
      console.log('Item added successfully!');
    }
  } catch (error) {
    console.error('Error adding item:', error);
  }
};