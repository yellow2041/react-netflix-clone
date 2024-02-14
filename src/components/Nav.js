import React, { useEffect, useState } from 'react';
import './Nav.css';

export default function Nav() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        setShow(true);
      } else {
        setShow(false);
      }
    });
    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, []);
  return (
    <nav className={`nav ${show && 'nav__black'}`}>
      <img
        role='presentation'
        alt='Netflix logo'
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/440px-Netflix_2015_logo.svg.png'
        className='nav__logo'
        onClick={() => window.location.reload()}
        onKeyDown={() => window.location.reload()}
      />
      <img
        alt='User logged'
        src='https://cdnimg.melon.co.kr/cm2/artistcrop/images/001/01/094/101094_20230811102600_org.jpg?cd68ba8b82e366d4414f44e1e2e84352/melon/optimize/90'
        className='nav__avatar'
      />
    </nav>
  );
}
