import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';
import ApartmentDetails from '@/components/ApartmentDetails'; // Adjust the import path as needed
import { useNavigation, useRoute } from '@react-navigation/native';
import { useLocalSearchParams } from 'expo-router';

const Apartment = () => {
  const [apartment, setApartment] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useLocalSearchParams(); // Get the apartment ID from navigation params
  useEffect(() => {
    const fetchApartment = async () => {
      try {
        const { data } = await axios.get(`http://localhost:9999/api/v1/apartment/${id}`); // Replace with your API URL
        setApartment(data);
      } catch (error) {
        console.error('Error fetching apartment:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchApartment();
  }, [id]);

  if (isLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ApartmentDetails apartment={apartment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Apartment;
