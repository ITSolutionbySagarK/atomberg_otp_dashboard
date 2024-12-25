import React from 'react';
import { Helmet } from 'react-helmet';
import logo from '../../assets/logo.svg'


const CustomHelmet = ({title="Discover Resorts"}) => {
  return (
    <Helmet>
    <title>{title}</title>
    <link rel="icon" type="image/svg+xml" href="../../assets/logo.svg" />
  </Helmet>
  );
};

export default CustomHelmet;
