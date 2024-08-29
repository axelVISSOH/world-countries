import { Card } from "primereact/card";
import { Divider } from "primereact/divider";
import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../contexts/theme/ThemeContext";
import { ICountryCardProps } from "../../interfaces/interfaces";
import CountryImage from "../countryList/cellTemplates/CountryImage";
import { displayTzs } from "../countryList/cellTemplates/TimeZonesBodyTemplate";


export default function CountryCard ({country}: ICountryCardProps) {

    const { t } = useTranslation();
    const { theme } = useContext(ThemeContext);
    
    const renderField = (icon: string, color: string, label: string, value: any, showDivider: boolean = false) => (
        <div className='m-6 mb-10'>
            <div className='flex items-center'>
                <div className="flex">
                    <i className={`pi ${icon} mr-4`} style={{ color, fontSize: '1.5rem' }} />
                    <p><strong> {label } </strong> &nbsp;&nbsp;</p>
                </div>
                { value || 'N/A'}
            </div>
            {showDivider && <Divider />}
        </div>
    );
    
    return(
        <>
            <Card className={"rounded-xl justify-center items-center " + theme.colors.text}
                  style={{ backgroundColor: theme.colors.background }}
                  title={t('countryInfo.title')}>

                <div className="flex-col">
                    {renderField("pi-globe", "blue", t('countryInfo.officialName'), country.names?.official, true)}
                    {renderField("pi-map-marker", "red", t('countryInfo.capital'), `${country.capital?.name || t('countryInfo.na')} (${country.capital?.pos?.lat || t('countryInfo.na')}, ${country.capital?.pos?.long || t('countryInfo.na')})`, true)}
                    {renderField("pi-users", "green", t('countryInfo.population'), country.population?.toLocaleString(), true)}
                    {renderField("pi-compass", "purple", t('countryInfo.continent'), country.continentAndRegion?.continent, false)}
                    {renderField("pi-map", "orange", t('countryInfo.region'), country.continentAndRegion?.regions?.region, false)}
                    {renderField("pi-sitemap", "teal", t('countryInfo.subregion'), country.continentAndRegion?.regions?.subregion, true)}
                    
                    <p className="ml-8"> <strong> {t('countryInfo.demonyms')} </strong> </p>
                    {country.demonyms?.map((dem: any) => (
                        <div key={dem.lang} style={{ marginLeft: '1rem' }}>
                            {renderField("pi-user", "darkred", `${dem.lang} - ${t('countryInfo.demonymMale')}`, dem.m, false)}
                            {renderField("pi-user", "darkorange", `${dem.lang} - ${t('countryInfo.demonymFemale')}`, dem.f, false)}
                        </div>
                    ))}
                    <Divider />
                    
                    {renderField("pi-comments", "brown", t('countryInfo.languages'), country.languages?.map((lang: any) => lang.name).join(", "), true)}
                    {renderField("pi-globe", "navy", t('countryInfo.timezones'), displayTzs(country, "detail"), true)}
                    
                    {renderField("pi-flag", "gold", t('countryInfo.flag_coatOfArms'), (
                        <div className='flex justify-center gap-x-4'>
                            <CountryImage src={country.flagsInfo?.png} alt={country.flagsInfo?.alt || t('countryInfo.flag')} shape="circle" />
                            {country.coatOfArms?.png &&  <CountryImage src={country.coatOfArms?.png} alt={`${country.names?.common} ${t('countryInfo.coatOfArms')}`} shape="circle" />}
                        </div>
                    ), true)}

                    {renderField("pi-sign-in", "lime", t('countryInfo.independence'), country.independent ? t('countryInfo.yes') : t('countryInfo.no'), false)}
                    {renderField("pi-car", "gray", t('countryInfo.landlocked'), country.landlocked ? t('countryInfo.yes') : t('countryInfo.no'), false)}
                    {renderField("pi-globe", "aqua", t('countryInfo.unMember'), country.unMember ? t('countryInfo.yes') : t('countryInfo.no'), true)}
                    {renderField("pi-map-marker", "maroon", t('countryInfo.borders'), country.borders?.join(", "), true)}
                    {renderField("pi-money-bill", "darkgreen", t('countryInfo.currencies'), country.currencies?.map((cur: any) => `${cur.name} (${cur.symbol})`).join(", "), true)}
                    {renderField("pi-tag", "crimson", t('countryInfo.codes'), `CCA2: ${country.codes?.cca2 || t('countryInfo.na')},
                                                                               CCA3: ${country.codes?.cca3 || t('countryInfo.na')}, 
                                                                               CCN3: ${country.codes?.ccn3 || t('countryInfo.na')}, 
                                                                               CIOC: ${country.codes?.cioc || t('countryInfo.na')}`, false)}
                    {renderField("pi-phone", "purple", t('countryInfo.callingCode'), 
                        (
                            <div>
                                {country.codes?.indic?.suffixes && country.codes?.indic?.suffixes.length > 0 && 
                                    ( country.codes?.indic?.suffixes.map( (suf, index) =>  <strong key={index}> { (country.codes?.indic?.root+suf).toUpperCase() + (country.codes?.indic?.suffixes && index <= country.codes?.indic?.suffixes.length-2 ? ',':'')} </strong> ) )
                                }
                            </div>
                        ), true)
                    }                    

                    {renderField("pi-map", "darkcyan", t('countryInfo.mapLinks'), (
                        <div className='flex gap-x-4 mx-4'>
                            {
                                country.mapInfo?.google ? 
                                <a href={country.mapInfo.google} target="_blank" rel="noopener noreferrer">
                                    {t('countryInfo.googleMaps')}
                                    <i className="pl-2 pi pi-external-link" style={{ color: 'green', fontSize: '1.5rem' }} />
                                </a>                                
                                : t('countryInfo.na')
                            }
                            { 
                                country.mapInfo?.osm ? 
                                <a href={country.mapInfo.osm} target="_blank" rel="noopener noreferrer">
                                    { t('countryInfo.openStreetMap')}
                                    <i className="pl-2 pi pi-external-link" style={{ color: 'green', fontSize: '1.5rem' }} />
                                </a>
                                : t('countryInfo.na')
                            }
                        </div>
                    ), true)}

                    {renderField("pi-clock", "darkslategray", t('countryInfo.startOfWeek'), country.startOfWeek, false)}
                    {renderField("pi-car", "darkkhaki", t('countryInfo.carInfo'), `${t('countryInfo.signs')} ${country.carInfo?.signs?.join(", ") || t('countryInfo.na')}, ${t('countryInfo.side')} ${country.carInfo?.side || t('countryInfo.na')}`, true)}
            
                </div>
        
            </Card>
        </>
    )
}