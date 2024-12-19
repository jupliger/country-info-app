export interface CountryInfo {
  name: string;
  flagUrl: string;
  borders: string[];
  populationData: { year: number; population: number }[];
}

export const mockCountryInfo: CountryInfo = {
  name: "Brazil",
  flagUrl: "https://restcountries.com/v3.1/all/brazil/flag",
  borders: ["ARG", "BOL", "COL", "GUY", "PRY", "PER", "SUR", "URY", "VEN"],
  populationData: [
    { year: 2000, population: 174790340 },
    { year: 2005, population: 186127103 },
    { year: 2010, population: 195713635 },
    { year: 2015, population: 204471769 },
    { year: 2020, population: 212559417 },
  ],
};
