import React, { useEffect, useState } from 'react';

import Link from 'next/link';
import axios from 'axios';

interface Country {
  name: string;
  code: string;
}

const CountryListPage: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('/api/available-countries');
        setCountries(response.data);
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            console.error('Erro ao buscar países:', error.response.status, error.response.data);
          } else if (error.request) {
            console.error('Nenhuma resposta recebida:', error.request);
          } else {
            console.error('Erro ao configurar a requisição:', error.message);
          }
        } else {
          console.error('Erro desconhecido:', error);
        }
      }
    };

    fetchCountries();
  }, []);

  return (
    <div>
      <h1>Available Countries</h1>
      <ul>
        {countries.map((country) => (
          <li key={country.code}>
            <Link href={`/country/${country.code}`}>
              <a>{country.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CountryListPage;
