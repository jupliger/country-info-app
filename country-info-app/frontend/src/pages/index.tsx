import { CategoryScale, Chart, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';

import axiosInstance from '../axiosConfig';
import styles from './CountryListPage.module.css';
import { useRouter } from 'next/router';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Country {
  name: string;
  code: string;
}

interface ApiResponse {
  name: string;
  countryCode: string;
}

const CountryListPage: React.FC = () => {
  const router = useRouter();
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axiosInstance.get<ApiResponse[]>('/available-countries');
        const fetchedCountries: Country[] = response.data.map((country) => ({
          name: country.name,
          code: country.countryCode,
        }));

        fetchedCountries.sort((a, b) => a.name.localeCompare(b.name));
        setCountries(fetchedCountries);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const handleOnClick = (countryCode: string) => {
    router.push(`/country/${countryCode}`);
  };

  const groupedCountries = countries.reduce((acc: Record<string, Country[]>, country: Country) => {
    const firstLetter = country.name[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(country);
    return acc;
  }, {});

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Available Countries</h1>
      </div>
      {Object.keys(groupedCountries).sort().map((letter) => (
        <div key={letter} className={styles.section}>
          <h2 className={styles.sectionTitle}>{letter}</h2>
          
          <div className={styles.list}>
            {groupedCountries[letter].map((country) => (
              <div key={country.code} className={styles.listItem}>
                <button className={styles.button} onClick={() => handleOnClick(country.code)}>
                  {country.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CountryListPage;
