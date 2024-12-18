import React, { useEffect, useState } from 'react';

import { Line } from 'react-chartjs-2';
import Link from 'next/link';
import axiosInstance from '../../axiosConfig';
import { useRouter } from 'next/router';

interface CountryInfo {
  name: string;
  flagUrl: string;
  borders: string[];
  populationData: { year: number; population: number }[];
}

const CountryInfoPage: React.FC = () => {
  const router = useRouter();
  const { code } = router.query;
  const [countryInfo, setCountryInfo] = useState<CountryInfo | null>(null);

  useEffect(() => {
    if (code) {
      const fetchCountryInfo = async () => {
        try {
          const response = await axiosInstance.get(`/country-info/${code}`);
          setCountryInfo(response.data);
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

  return (
    <div>
      <h1>{countryInfo.name}</h1>
      <img src={countryInfo.flagUrl} alt={`${countryInfo.name} flag`} />
      <h2>Border Countries</h2>
      <ul>
        {countryInfo.borders.map((border) => (
          <li key={border}>
            <Link href={`/country/${border}`}>
              <a>{border}</a>
            </Link>
          </li>
        ))}
      </ul>
      <h2>Population Over Time</h2>
      <Line data={populationChartData} />
    </div>
  );
};

export default CountryInfoPage;
