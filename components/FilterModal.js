import React, { useState } from 'react';
import { Modal, StyleSheet, View, Text, TextInput, TouchableOpacity, Picker } from 'react-native';
import { scaleFont, scaleHeight, scaleWidth } from '../utils/scaling';

const FilterModal = ({ visible, onClose, onApply }) => {
  const [model, setModel] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Convert price inputs to numbers, or use Infinity if empty
  const handleApply = () => {
    onApply({
      model: model.trim(),
      minPrice: minPrice ? parseFloat(minPrice) : 0,
      maxPrice: maxPrice ? parseFloat(maxPrice) : Infinity,
    });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Filter Options</Text>

          <Text style={styles.label}>Model</Text>
          <TextInput
            style={styles.input}
            value={model}
            onChangeText={setModel}
            placeholder="Enter model"
          />

          <Text style={styles.label}>Price Range</Text>
          <View style={styles.priceContainer}>
            <TextInput
              style={[styles.input, styles.priceInput]}
              value={minPrice}
              onChangeText={setMinPrice}
              placeholder="Min Price"
              keyboardType="numeric"
            />
            <TextInput
              style={[styles.input, styles.priceInput]}
              value={maxPrice}
              onChangeText={setMaxPrice}
              placeholder="Max Price"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleApply}>
              <Text style={styles.buttonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: scaleHeight(20),
    alignItems: 'center',
  },
  title: {
    fontSize: scaleFont(18),
    fontWeight: 'bold',
    marginBottom: scaleHeight(10),
  },
  label: {
    fontSize: scaleFont(14),
    fontWeight: 'bold',
    marginBottom: scaleHeight(5),
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    padding: scaleHeight(10),
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: scaleHeight(10),
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  priceInput: {
    flex: 1,
    marginHorizontal: scaleWidth(5),
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginTop: scaleHeight(20),
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: scaleHeight(10),
    paddingHorizontal: scaleWidth(15),
    borderRadius: 5,
    marginHorizontal: scaleWidth(10),
  },
  buttonText: {
    color: '#fff',
    fontSize: scaleFont(16),
    fontWeight: 'bold',
  },
});

export default FilterModal;