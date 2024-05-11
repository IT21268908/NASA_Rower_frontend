import React from 'react'
import '../css/Footer.css'


function Footer() {
  return (
    <footer className='footer'>
      <div className='footer_content'>
        <p> © 2024 NASA Clicks|Malmi Hewakapuge</p>
        <p>
          This project utilizes data from NASA APIs. For more information, visit
          <a href="https://api.nasa.gov/">NASA API Portal</a>.
        </p>
        
      </div>
    </footer>
  )
}

export default Footer