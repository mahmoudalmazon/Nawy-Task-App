import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';
import Link from 'next/link';

const ApartmentCard = ({ apartment }) => {
    console.log(apartment)
    return (
        <Link href={`/apartments/${apartment._id}`} textDecoration="none">
        <Card
            sx={{
                height: 345,
            }}
        >
            <CardMedia
                component="img"
                height="140"
                image={apartment.images[0].url}
                alt={apartment.images.description}
            />
            <CardContent>
                <Typography   variant="h5" color={"primary"}  textAlign={"center"}>
                    {apartment.name}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    {apartment.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {apartment.amenities.join(' , ')}
                </Typography>
                <Typography variant="h5" color={"primary"}>
                    $ {apartment.price}
                </Typography>
                <Typography color={ apartment.availabilityStatus === "Available" ? "green" : "red"}>
                {apartment.availabilityStatus}
                </Typography>
            </CardContent>
        </Card>
        </Link>
    );
}

export default ApartmentCard;
