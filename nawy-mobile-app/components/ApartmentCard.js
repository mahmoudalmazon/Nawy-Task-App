import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { Link } from 'expo-router';
const ApartmentCard = ({ apartment }) => {

  return (
    <Link href={`/apartment/${apartment._id}`}>

    <Card containerStyle={styles.card}>
      <Card.Image
          source={{ uri: apartment.images[0]?.url }}
          style={styles.image}
          PlaceholderContent={<Text>Loading...</Text>}
          onError={(e) => console.log('Image Load Error: ', e.nativeEvent.error)}
      />
      <Card.Divider />
      <Card.Title style={styles.title}>{apartment.name}</Card.Title>
      <Text style={styles.description}>{apartment.description}</Text>
      <Text style={styles.amenities}>{apartment.amenities.join(', ')}</Text>
      <Text style={styles.price}>${apartment.price}</Text>
      <Text
        style={[
          styles.availability,
          { color: apartment.availabilityStatus === 'Available' ? 'green' : 'red' },
        ]}
      >
        {apartment.availabilityStatus}
      </Text>
    </Card>
    </Link>

  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    height: 140,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 10,
  },
  description: {
    marginBottom: 10,
  },
  amenities: {
    marginBottom: 10,
    color: '#777',
  },
  price: {
    fontSize: 18,
    color: '#000',
    marginBottom: 10,
  },
  availability: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default ApartmentCard;
