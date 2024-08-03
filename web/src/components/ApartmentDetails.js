import { Card, CardContent, CardMedia, Container, Typography } from '@mui/material'
import React from 'react'

const ApartmentDetails = ({ apartment }) => {
  return (
    <Container  padding={2}  >
    <Typography textAlign={"center"} variant="h4" color={"primary"} >             {apartment?.name} 
    </Typography>
      <Card>
        <CardMedia
          component="img"
          height="50%"
          image={apartment?.images[0]?.url}
          alt={apartment?.title}
        />
        <CardContent>
          <Typography variant="h5" component="div">
            {apartment?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {apartment?.description}
          </Typography>
          <Typography variant="h6" component="div">
            Price: ${apartment?.price}
          </Typography>
          <Typography variant="body2" component="div">
            Location: {apartment?.location.city}, {apartment?.location.address}
          </Typography>
          <Typography variant="body2" component="div">
            Features: {apartment?.amenities.join(', ')}
          </Typography>
          <Typography variant="body2" component="div">
            Size: {apartment?.size} sqft
          </Typography>
          <Typography variant="body2" component="div" >
            {apartment.bedrooms} bed, {apartment.bathrooms} bath 
          </Typography>
        </CardContent>
      </Card>
    </Container>
  )
}

export default ApartmentDetails