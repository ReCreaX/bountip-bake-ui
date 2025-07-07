// types/custom.d.ts
declare module "country-currency-map" {
  export function getCurrencyAbbreviation(countryName: string): string;
  export function getCurrency(currencyAbbr: string): string;
  export function getCurrencyList(): { name: string; currencyCode: string }[];
  export function getCountry(countryName: string): {
    name: string;
    currencyCode: string;
  };
  export function getCountryByAbbreviation(isoCode: string): {
    name: string;
    currencyCode: string;
  };
  export function formatCurrency(value: number, currencyAbbr: string): string;
  export function formatLocaleCurrency(value: number, currency: string): string;
  export function getCurrencyAbbreviationFromName(currencyName: string): string;

  const countryCurrencyMap: {
    getCurrencyAbbreviation: typeof getCurrencyAbbreviation;
    getCurrency: typeof getCurrency;
    getCurrencyList: typeof getCurrencyList;
    getCountry: typeof getCountry;
    getCountryByAbbreviation: typeof getCountryByAbbreviation;
    formatCurrency: typeof formatCurrency;
    formatLocaleCurrency: typeof formatLocaleCurrency;
    getCurrencyAbbreviationFromName: typeof getCurrencyAbbreviationFromName;
  };

  export default countryCurrencyMap;
}
