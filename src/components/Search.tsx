import IconSearch from "./IconSearch";
import useFetchCountries from "./GetContries";
import ArrowLeft from "./Arrow";
import "./Countries.css";
import "./Search.css";
import "./CountryInformation.css";
import { useState, useEffect } from "react";
import type { Country } from "./CountryType";

export function Search() {
    const { data, loading} = useFetchCountries("./data.json");

    const [dataFilter, setDataFilter] = useState([]);
    const [countryInformation, setCountryInformation] = useState<Country | null>(null);
    useEffect(() => {
        if (!loading && data) {
            setDataFilter(data);
        }
    }, [loading, data]);

    function chooseCountry(region: string) {
        if (!loading && data) {
            if (['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'].includes(region)) {
                setDataFilter(data.filter((country: any) => country.region === region));
            } else {
                setDataFilter(data);
            }
        }
    }




    function getCountryInformation(name: string) {
        const country = data.find((country: any) => country.name == name);
        if (country) setCountryInformation(country);
    }

    function clearCountry() {
        setCountryInformation(null);
    }

    function fixComillas(lenguages: { name: string }[]): string {
        const leaguagesModify = lenguages.map(lenguage => lenguage.name);
        return leaguagesModify.join(", ");
    }

    function transfomrAlpha3Code(code: string) {
        const country = data.find((country: any) => country.alpha3Code == code);
        return country.name;
    }


    const [searchValue, setSearchValue] = useState("");
    function searchCountry() {
        getCountryInformation(searchValue);
    }

    return (
        <>
            {
                !countryInformation && <search>
                <form className="countries__form" role="search">
                    <div className="countries-content">
                        <button onClick={searchCountry} className="countries__btn-search">
                            <IconSearch />
                        </button>
                        <input onChange={(e) => setSearchValue(e.target.value)} value={searchValue} id="search" className="countries__input-search" type="search" placeholder="Search for a country..." />
                    </div>
                    <details className="countries__filter" name="filter" id="filter">
                        <summary>Filter by Region</summary>
                        <ul className="countries__list">
                            <li onClick={() => chooseCountry("Africa")} tabIndex={0} className="countries__continent">Africa</li>
                            <li onClick={() => chooseCountry("Americas")} tabIndex={0} className="countries__continent">America</li>
                            <li onClick={() => chooseCountry("Asia")} tabIndex={0} className="countries__continent">Asia</li>
                            <li onClick={() => chooseCountry("Europe")} tabIndex={0} className="countries__continent">Europe</li>
                            <li onClick={() => chooseCountry("Oceania")} tabIndex={0} className="countries__continent">Oceania</li>
                        </ul>
                    </details>
                </form>
            </search>
            }
            {!countryInformation && <section className="countries-block">
                        {loading && <p className="countries__loading">Countries are loading...</p>}
                        {dataFilter && dataFilter.map((country: any) => (
                            <article onClick={() => getCountryInformation(country.name)} key={country.numericCode} className="countries__country">
                                <figure className="countries__picture">
                                    <img src={country.flags.png} alt={country.name} className="countries__img" />
                                </figure>
                                <section className="countries__details">
                                    <h3 className="countries__name">{country.name}</h3>
                                    <p className="countries__data"><span className="countries__bold">Population:</span> {country.population.toLocaleString()}</p>
                                    <p className="countries__data"><span className="countries__bold">Region:</span> {country.region}</p>
                                    <p className="countries__data"><span className="countries__bold">Capital:</span> {country.capital}</p>
                                </section>
                            </article>
                        ))}
                    </section>
            }

            {
                countryInformation &&

            <section key={countryInformation.alpha2Code} className="countries__option">
                <button onClick={clearCountry} className="countries__back"><ArrowLeft/> Back</button>
                <section className="countries__block">
                    <figure className="countries__flag">
                        <img className="countries__img" src={countryInformation.flags.svg} alt={countryInformation.name} />
                    </figure>
                    <section className="countries__country-information">
                        <h2 className="countries__country-name">{countryInformation.name}</h2>
                        <div className="countries__country-list">
                            <ul>
                                <li className="countries__country-data"><b>Native Name: </b>{countryInformation.nativeName}</li>
                                <li className="countries__country-data"><b>Population: </b>{countryInformation.population.toLocaleString()}</li>
                                <li className="countries__country-data"><b>Region: </b>{countryInformation.region}</li>
                                <li className="countries__country-data"><b>Sub Region: </b>{countryInformation.subregion}</li>
                                <li className="countries__country-data"><b>Capital: </b>{countryInformation.capital}</li>
                            </ul>
                            <ul>
                                <li className="countries__country-data"><b>Top Level Domain: </b>{countryInformation.topLevelDomain[0]}</li>
                                <li className="countries__country-data"><b>Currencies: </b>{countryInformation.currencies[0].name}</li>
                                <li className="countries__country-data"><b>Languages: </b>{fixComillas(countryInformation.languages)}</li>
                            </ul>
                        </div>
                        <div className="countries__border-content">
                            <h3 className="countries__border">Border Countries:</h3>
                            <div className="countries__names">
                                {countryInformation.borders?.map(border => (<button className="countries__btn-country">{transfomrAlpha3Code(border)}</button>))}                
                            </div>
                        </div>
                    </section>
                </section>
            </section>
            }

        </>
    )
}
