import React, { useState } from 'react';
import { Card, Col, Row, Input } from 'antd';
import millify from 'millify';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Link } from 'react-router-dom';

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptoList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState(cryptoList?.data?.coins);

  if (isFetching) return 'Loading...';

  return (
    <>
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((coin) => (
          <Col className="crypto-card" xs={24} sm={12} lg={6} key={coin.uuid}>
            <Link to={`/crypto/${coin.uuid}`}>
              <Card
                title={`${coin.rank}. ${coin.name}`}
                extra={<img src={coin.iconUrl} className="crypto-image" />}
                hoverable
              >
                <p>Price: {millify(coin.price)}</p>
                <p>Market Cap: {millify(coin.marketCap)}</p>
                <p>Daily Change: {millify(coin.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
