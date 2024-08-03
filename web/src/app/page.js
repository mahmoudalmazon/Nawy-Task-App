'use client'
import ApartmentCard from "@/components/ApartmentCard";
import { Grid, Container, Typography } from '@mui/material';
import { useEffect, useState } from "react";
import axios from "axios";
const Home = () => {
  const [apartments, setApartments] = useState([]);
  useEffect(() => {
    const fetchApartments = async () => {
      const { data } = await axios.get('http://localhost:9999/api/v1/apartment/');
      console.log(data)
      setApartments(data);
    };
    fetchApartments();
  }, [])
  return (
      <c>
        <Typography variant="h2" color={"primary"} textAlign={"center"} >
          Nawy 
        </Typography>
        <Grid container spacing={3}>
          {apartments.map((apartment) => (
            <Grid item xs={12} sm={6} md={4} key={apartment._id}>
              <ApartmentCard apartment={apartment} />
            </Grid>
          ))}
        </Grid>
      </c>
  );
}
export default Home