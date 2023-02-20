import { Row, Typography } from 'antd';
import React from 'react';
// import { useGetExchangesQuery } from '../services/cryptoApi';
// import Loader from './Loader';

const Exchanges = () => {
  // const { data, isFetching } = useGetExchangesQuery();

  // if (isFetching) return <Loader />;
  // console.log(data);

  return (
    <>
      <Row gutter={[32, 32]} className="exchanges-card-container">
        <img
          className="exchanges-image"
          src="https://reactjscryptoapp.netlify.app/static/media/coming-soon.e0c3c7cb03634ebdc855.png"
          alt="coming-soon-exchanges"
        />
        <Typography.Title level={1} className="exchanges-heading">
          Coming Soon
        </Typography.Title>
      </Row>
    </>
  );
};

export default Exchanges;
