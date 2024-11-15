import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const FooterButton = ({url, children}) => {
  let location = useLocation();
  const choosen = () => location.pathname === url;

  return (
    <button className={`footer-button ${choosen() ? 'selected' : ''}`}>
      <Link className='footer-link' to={url}>{children}</Link>
    </button>
  )
}

export default FooterButton