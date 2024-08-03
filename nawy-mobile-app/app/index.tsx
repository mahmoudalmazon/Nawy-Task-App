import { FlatList, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { useEffect, useState } from 'react';
import ApartmentCard from '@/components/ApartmentCard'; 
import axios from 'axios';
const Home = () => {
    const [apartments, setApartments] = useState([]);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const { data } = await axios.get('http://localhost:9999/api/v1/apartment/');
        console.log(data);
        setApartments(data);
      } catch (error) {
        console.error('Failed to fetch apartments:', error);
      }
    };
    fetchApartments();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nawy</Text>
      <FlatList
        data={apartments}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <ApartmentCard apartment={item} />}
        contentContainerStyle={styles.flatListContainer}
        numColumns={1} // Adjust the number of columns as needed
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: '#1976D2', // Primary color
    textAlign: 'center',
    marginBottom: 16,
  },
  flatListContainer: {
    paddingBottom: 16,
  },
});

export default Home;