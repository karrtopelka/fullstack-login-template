import React from 'react';
import { Link } from 'react-router-dom';
import './footer.scss';

const Footer = () => {
  return (
    <div className='footer'>
      <h5>
        Made with 💜 by{' '}
        <Link
          style={{ color: 'inherit' }}
          to={{
            pathname: 'https://instagram.com/karrtopelka',
          }}
          target='_blank'>
          karrtopelka 🥔
        </Link>
      </h5>
      <h5>2021</h5>
    </div>
  );
};

export default Footer;
