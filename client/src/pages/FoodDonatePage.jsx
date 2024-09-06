import React, { useState } from 'react'
import './FoodDonatePage.css'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function FoodDonatePage () {
  const [foodName, setFoodName] = useState('');
  const [foodType, setFoodType] = useState('');
  const [mealType, setMealType] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [showDonationsError, setShowDonationsError] = useState(false);
  const [RestaurantUserDonations, setRestaurantUserDonations] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (phoneNumber.length !== 10) {
        alert('Phone number must be of 10 digits');
        return;
      }
    const response = await fetch('/api/FoodDonation/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Food_Name: foodName,
        Type_Of_Food: foodType,
        Meal_Type: mealType,
        Qauntity: quantity,
        PhoneNumber: Number(phoneNumber), // Parse phone number as a number
        Address: address,
      }),
    });

    if (response.ok) {
        alert('Donation successful');
      } else {
        const data = await response.json();
      }
    };

    const handleShowDonations = async () => {
        try {
          setShowDonationsError(false);
          const res = await fetch(`/api/RestaurantUser/donations/${currentUser._id}`);
          const data = await res.json();
          if (data.success === false) {
            setShowDonationsError(true);
            return;
          }
          setRestaurantUserDonations(data);
          console.log(data);
    
        } catch (error) {
          setShowDonationsError(true);
        }
      };
    
      return (
        <div className='container' > 
          {/* <div className="sidepanel">
            <div className="profile">
            <Link to="/RestaurantProfile">
              {currentUser.avatar ? (
                <img src={currentUser.avatar} alt="Profile"  style={{width: "100px", height: "100px", borderRadius: "50%"}}/>
              ) : (
                'Profile'
              )}
            </Link>
            </div>
            <div className="profiledetails">
              <ul>
                <li>
                  Total Donations:
                </li>
                <li>
                  Current Donations:
                </li>
              </ul>
            </div>
          </div> */}
          <div className="profile">
          <Link to="/RestaurantProfile">
            {currentUser.avatar ? (
              <img src={currentUser.avatar} alt="Profile" className='rounded-full h-12 w-12 object-cover cursor-pointer self-center mt-2'/>
            ) : (
              'Profile'
            )}
          </Link>
        </div>

          <div className="main">
            <h1 id='main_title'>Donate Food</h1>
            <div>
              <h1 className='title'>Food name</h1>
              <input type="text" id='foodname' className='inputbox' required onChange={e => setFoodName(e.target.value)} />
            </div>
            <div className="category_container">
              <h1 className='title'>Select type of Food :</h1>
              <div className="wrapper">
                <div className="card">
                  <div className="category" style={{backgroundImage: "url('./cooked.jpg')"}}></div>
                  <input type="radio" name='catergory_checkbox' className="category_check" value="Cooked" onChange={e => setFoodType(e.target.value)} /> Cooked
                </div>
                <div className="card">
                  <div className="category" style={{backgroundImage: "url('./raw.jpg')"}}></div>
                  <input type="radio" name='catergory_checkbox' className="category_check" value="Raw" onChange={e => setFoodType(e.target.value)} /> Raw
                </div>
                <div className="card">
                  <div className="category" style={{backgroundImage: "url('./packed.jpg')"}}></div>
                  <input type="radio" name='catergory_checkbox' className="category_check" value="Packed" onChange={e => setFoodType(e.target.value)} /> Packed
                </div> 
              </div>
            </div>
            <div className="details">
              <div className="category_container">
                <h1 className='title'>Meal Type</h1>
                <div className="wrapper">
                  <div className="card">
                    <div className="category" style={{backgroundImage: "url('./veg.jpg')"}}> </div>
                    <input type="radio" name='meal' id='veg' className="meal_type" value="Veg" onChange={e => setMealType(e.target.value)} /> Veg
                  </div>
                  <div className="card">
                    <div className="category" style={{backgroundImage: "url('./nonveg.jpg')"}}></div>
                    <input type="radio" name='meal' id='nonveg' className="meal_type" value="Non-Veg" onChange={e => setMealType(e.target.value)} /> Non-Veg
                  </div>
                </div>
              </div>
              <div className="meal">
              </div>
              <div className="quantity">
                <h1 className="title">Quantity (Person)</h1>
                <input type="number" 
                  min="1" 
                  id="quantitySelect" 
                  onChange={e => setQuantity(e.target.value)} 
                  style={{margin: "15px", padding: "15px", borderRadius: "5px", width: "200px"}}/>
              </div>
              <div>
                <h1 className='title'>Phone Number</h1>
                <input type="text" className='inputbox' required onChange={e => setPhoneNumber(e.target.value)} />
              </div>
              <div>
                <h1 className='title'>Address</h1>
                <input type="text" className='inputbox' required onChange={e => setAddress(e.target.value)} />
              </div>
              <button id='submit' onClick={handleSubmit}>
                Donate
              </button>
              <button onClick={handleShowDonations} className='text-green-700 w-full'>
                Show Donations
              </button>
              <p className='text-red-700 mt-5'>
                {showDonationsError ? 'Error showing donations' : ''}
              </p>
              {RestaurantUserDonations && RestaurantUserDonations.length > 0 && (
                <div className='flex flex-col gap-4'>
                  <h1 className='text-center mt-7 text-2xl font-semibold'>
                    Your Donations
                  </h1>
                  {RestaurantUserDonations.map((donation) => 
                    <div
                      key={donation._id}
                      className='border rounded-lg p-3 flex justify-between items-center gap-4'
                    >
                      <Link to={`/donation-details/${donation._id}`}>
                        {/* <p className='h-16 w-16 object-contain'>
                          {donation.Food_Name}
                        </p> */}
                      </Link>
                      <Link
                        className='text-slate-700 font-semibold  hover:underline truncate flex-1'
                        to={`/DonationDetails/${donation._id}`}
                      >
                        <p>{donation.Food_Name}</p>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )
}
