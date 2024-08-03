'use client'

import {useEffect, useState} from 'react'
import { useParams } from 'next/navigation';
import axios from 'axios';
import ApartmentDetails from '@/components/ApartmentDetails';
const Apartment = () => {
  const [apartment, setApartment] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  
  useEffect(() => {
    const fetchApartment = async () => {
      try {
        const {data} = await axios.get(`http://localhost:9999/api/v1/apartment/${id}`);
        console.log("data",data)
        setApartment(data);
      } catch (error) {
        console.error('Error fetching apartment:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchApartment();
  },[id]);
  
  if(isLoading){
    return <div>Loading...</div>
  }
  
  return (
    <ApartmentDetails apartment={apartment} />
  )
}

export default Apartment