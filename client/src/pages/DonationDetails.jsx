import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function DonationDetails() {
  const { id } = useParams();
  const [donation, setDonation] = useState(null);

  useEffect(() => {
    const fetchDonation = async () => {
      const response = await fetch(`/api/FoodDonation/get/${id}`);
      const data = await response.json();
      setDonation(data);
    };

    fetchDonation();
  }, [id]);

  return (
    <div className='cards'>
      {donation ? (
        <>
          <h1 style={{fontSize:"24px", marginBottom: "8px", textTransform: "uppercase"}}>{donation.Food_Name}</h1>
          <p>Type of Food: {donation.Type_Of_Food}</p>
          <p>Meal Type: {donation.Meal_Type}</p>
          <p>Quantity: {donation.Qauntity}</p>
          <p>Phone Number: {donation.PhoneNumber}</p>
          <p>Address: {donation.Address}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default DonationDetails;
