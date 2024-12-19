import { CategoryScale, Chart, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js';
import React, { useEffect, useState } from 'react';

import axiosInstance from '../axiosConfig';
import { mockCountries } from './dadosMockados';
import styles from './CountryListPage.module.css';
import { useRouter } from 'next/router';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface Country {
  name: string;
  code: string;
}

const CountryListPage: React.FC = () => {
  const router = useRouter();
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    // const fetchCountries = async () => {
    //   try {
    //     const response = await axiosInstance.get('/available-countries');
    //     setCountries(response.data);
    //   } catch (error) {
    //     console.error('Error fetching countries:', error);
    //   }
    // };

    // fetchCountries();

    const convertedCountries: Country[] = mockCountries.map((country) => ({
      name: country.name,
      code: country.countryCode,
    }));

    convertedCountries.sort((a, b) => a.name.localeCompare(b.name));

    setCountries(convertedCountries);
  }, []);

  const handleOnClick = (countryCode: string) => {
    router.push(`/country/${countryCode}`);
  };

  
  const groupedCountries = countries.reduce((acc, country) => {
    const firstLetter = country.name[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(country);
    return acc;
  }, {} as Record<string, Country[]>);

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
