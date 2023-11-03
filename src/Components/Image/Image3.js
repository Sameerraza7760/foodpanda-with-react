

import React, { useEffect } from 'react';
import './../style.css';
import { useDispatch } from 'react-redux';
import { setCity } from '../../Redux/useraction/useraction';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../Config/firebase/firebase';

function Image3() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCitySelection = (cityName) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setCity(cityName));
        navigate('/RestCity');
      } else {
        navigate('/account');
      }
    });
  };

  return (
    <div className='image3-container'>
      <h2 className='image3-heading'>Find us in these cities and many more!</h2>
      <div className='image-container'>
        <div className='bc-image1' onClick={() => handleCitySelection('Karachi')}>
          <h2>Karachi</h2>
        </div>
        <div className='bc-image2' onClick={() => handleCitySelection('Lahore')}>
          <h2>Lahore</h2>
        </div>
        <div className='bc-image3' onClick={() => handleCitySelection('Islamabad')}>
          <h2>Islamabad</h2>
        </div>
        <div className='bc-image4' onClick={() => handleCitySelection('Hyderabad')}>
          <h2>Hyderabad</h2>
        </div>
      </div>
    </div>
  );
}

export default Image3;
