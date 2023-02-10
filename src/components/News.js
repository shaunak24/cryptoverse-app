import React, { useState } from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

const News = ({ simplified }) => {
  const { Text, Title } = Typography;
  const { Option } = Select;
  const count = simplified ? 8 : 100;
  const defaultImageUrl =
    'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  // after updating to bing API, pass in newsCategory to API for select to work
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery(count);
  const { data: cryptoList } = useGetCryptosQuery(100);

  if (isFetching) return 'Loading...';

  return (
    <Row gutter={[24, 24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase())
            }
          >
            <Option value="Cryptocurrency" key="default">
              Cryptocurrency
            </Option>
            {cryptoList?.data?.coins.map((coin) => (
              <Option value={coin.name} key={coin.uuid}>
                {coin.name}
              </Option>
            ))}
          </Select>
        </Col>
      )}
      {cryptoNews.map((news, i) => (
        <Col xs={24} sm={12} lg={6} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title className="news-title" level={4}>
                  {news.title}
                </Title>
                <img src={defaultImageUrl} alt="News Thumbnail" />
              </div>
              <p>
                {news.description > 100
                  ? `${news.description.substring(100)}...`
                  : news.description}
              </p>
              {/* Update after start using bing news API */}
              <div className="provider-container">
                <div>
                  <Avatar src={defaultImageUrl} alt="provider logo" />
                  {/* <Title className="provider-name">Cointelegraph</Title> */}
                </div>
                <Text>{moment(news.date).startOf('ss').fromNow()}</Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
