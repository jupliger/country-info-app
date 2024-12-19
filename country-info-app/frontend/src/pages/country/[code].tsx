import { CategoryScale, Chart, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js';
import { CountryInfo, mockCountryInfo } from './mockData';
import React, { useEffect, useState } from 'react';

import { Line } from 'react-chartjs-2';
import styles from './CountryInfoPage.module.css';
import { useRouter } from 'next/router';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CountryInfoPage: React.FC = () => {
  const router = useRouter();
  const { code } = router.query;
  const [countryInfo, setCountryInfo] = useState<CountryInfo | null>(null);

  useEffect(() => {
    // if (code) {
    //   const fetchCountryInfo = async () => {
    //     try {
    //       const response = await axiosInstance.get(`/country-info/${code}`);
    //       setCountryInfo(response.data);
    //     } catch (error) {
    //       console.error('Error fetching country info:', error);
    //     }
    //   };

    //   fetchCountryInfo();
    // }

    if (code) {
      setCountryInfo(mockCountryInfo);
    }
  }, [code]);

  if (!countryInfo) {
    return <div>Loading...</div>;
  }

  const populationChartData = {
    labels: countryInfo.populationData.map((data) => data.year),
    datasets: [
      {
        label: 'Population',
        data: countryInfo.populationData.map((data) => data.population),
        fill: false,
        borderColor: 'rgba(75,192,192,1)',
      },
    ],
  };

  const handleOnClick = (countryCode: string) => {
    router.push(`/country/${countryCode}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{countryInfo.name}</h1>
      </div>
      <img className={styles.flag} src={countryInfo.flagUrl} alt={`${countryInfo.name} flag`} />
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Border Countries</h2>
        <ul className={styles.list}>
          {countryInfo.borders.map((border) => (
            <div key={border} className={styles.listItem}>
              <button className={styles.button} onClick={() => handleOnClick(border)}>
                {border}
              </button>
            </div>
          ))}
        </ul>
      </div>
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Population Over Time</h2>
        <div className={styles.chart}>
          <Line data={populationChartData} />
        </div>
      </div>
    </div>
  );
};

export default CountryInfoPage;
