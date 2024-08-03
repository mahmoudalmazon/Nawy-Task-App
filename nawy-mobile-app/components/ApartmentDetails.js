import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Card } from 'react-native-elements';

const ApartmentDetails = ({ apartment }) => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{apartment?.name}</Text>
      <Card>
        <Card.Image
          source={{ uri: apartment?.images[0]?.url }}
          style={styles.image}
          resizeMode="cover"
        />
        <Card.Divider />
        <View style={styles.cardContent}>
          <Text style={styles.name}>{apartment?.name}</Text>
          <Text style={styles.description}>{apartment?.description}</Text>
          <Text style={styles.price}>Price: ${apartment?.price}</Text>
          <Text style={styles.location}>Location: {apartment?.location.city}, {apartment?.location.address}</Text>
          <Text style={styles.features}>Features: {apartment?.amenities.join(', ')}</Text>
          <Text style={styles.size}>Size: {apartment?.size} sqft</Text>
          <Text style={styles.details}>{apartment.bedrooms} bed, {apartment.bathrooms} bath</Text>
        </View>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    color: '#1976D2', // Primary color
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
  },
  cardContent: {
    marginTop: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#6e6e6e',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    marginBottom: 8,
  },
  location: {
    fontSize: 16,
    marginBottom: 8,
  },
  features: {
    fontSize: 16,
    marginBottom: 8,
  },
  size: {
    fontSize: 16,
    marginBottom: 8,
  },
  details: {
    fontSize: 16,
  },
});

export default ApartmentDetails;
