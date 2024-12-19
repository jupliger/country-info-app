import { CategoryScale, Chart, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';

import { Line } from 'react-chartjs-2';
import axiosInstance from '@/axiosConfig';
import styles from './CountryInfoPage.module.css';
import { useRouter } from 'next/router';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface PopulationCount {
  year: number;
  value: number;
}

interface CountryInfo {
  name: string;
  flagUrl?: string;
  borders: string[];
  populationCounts: PopulationCount[];
  code: string;
}

const CountryInfoPage: React.FC = () => {
  const router = useRouter();
  const { code } = router.query;
  const [countryInfo, setCountryInfo] = useState<CountryInfo | null>(null);
  const [flagUrl, setFlagUrl] = useState<string | null>(null);

  const fetchCountryFlag = (fullCountryName: string, flagData: any[]) => {
    for (const flagItem of flagData) {
      if (flagItem.name === fullCountryName) {
        setFlagUrl(flagItem.flag);
        break;
      }
    }
  };

  useEffect(() => {
    if (code) {
      const fetchCountryInfo = async () => {
        try {
          const response = await axiosInstance.get(`/country-info/${code}`);
          const fullCountryName = response.data.commonName;

          console.log('Response data:', response.data);
          console.log('Full country name:', fullCountryName);

          let matchedCountryData: CountryInfo | undefined;
          response.data.populationData.data.forEach((item: { country: string; populationCounts: PopulationCount[] }) => {
            if (item.country === fullCountryName) {
              matchedCountryData = {
                name: fullCountryName,
                flagUrl: response.data.flagUrl,
                borders: response.data.borders,
                populationCounts: item.populationCounts,
                code: response.data.code,
              };
              console.log('Match found:', matchedCountryData);
            }
          });

          if (matchedCountryData) {
            setCountryInfo(matchedCountryData);
            fetchCountryFlag(fullCountryName, response.data.flagUrl.data); 
          } else {
            console.error('Country not found in population data');
          }
        } catch (error) {
          console.error('Error fetching country info:', error);
        }
      };

      fetchCountryInfo();
    }
  }, [code]);

  if (!countryInfo) {
    return <div>Loading...</div>;
  }

  if (!Array.isArray(countryInfo.populationCounts) || countryInfo.populationCounts.length === 0) {
    return <div>No population data available</div>;
  }

  const populationChartData = {
    labels: countryInfo.populationCounts.map((data) => data.year),
    datasets: [
      {
        label: 'Population',
        data: countryInfo.populationCounts.map((data) => data.value),
        fill: false,
        borderColor: ' #ec9513',
      },
    ],
  };

  const handleOnClick = (countryCode: string | null | undefined) => {
    if (countryCode === null || countryCode === undefined) {
      console.error('Country code is null or undefined');
      return;
    }

    try {
      router.push(`/country/${countryCode}`);
    } catch (error) {
      console.error('Error handling country code:', error);
    }
  };

  console.log(countryInfo, "countryInfo");

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{countryInfo.name}</h1>
      </div>
      {flagUrl && (
        <img className={styles.flag} src={flagUrl} alt={`${countryInfo.name} flag`} />
      )}
      <div className={styles.section}>
        <h2 className={styles.sectionTitle}>Border Countries</h2>
        <ul className={styles.list}>
           {countryInfo.borders.map((border) => (
            <div key={border.countryCode} className={styles.listItem}>
              <button className={styles.button} onClick={() => handleOnClick(border.countryCode)}>
                {border.commonName}
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
