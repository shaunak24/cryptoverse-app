import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';

import {
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Chart,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from 'chart.js';
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTitle,
  Tooltip,
  Legend
);

const LineChart = ({ coinName, currentPrice, coinHistory }) => {
  const { Title } = Typography;
  const price = [];
  const timestamp = [];

  for (let i = coinHistory?.data?.history.length - 1; i > -1; i--) {
    price.push(coinHistory?.data?.history[i].price);
    const date = new Date(0);
    date.setUTCSeconds(coinHistory?.data?.history[i].timestamp);
    timestamp.push(date.toLocaleDateString());
  }
  // console.log(price);
  // console.log(timestamp);

  const data = {
    labels: timestamp,
    datasets: [
      {
        label: 'Price in USD',
        data: price,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        ticks: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          {coinName} Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            {coinHistory?.data?.change}%
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: $ {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
