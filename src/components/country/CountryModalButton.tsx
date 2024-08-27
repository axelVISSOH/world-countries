import { Dialog } from 'primereact/dialog';
import { ICountryModalButtonProps } from '../../interfaces/interfaces';
import { useScreenLayout } from '../../hooks/windowWidth';

import { ScreenEnum } from "../../enums/screen";
import CountryCard from './CountryCard';

const CountryModalButton: React.FC<ICountryModalButtonProps> = ( {country, open, onClose} ) => {
        
    const dialogHeader = (
        <div className="text-center">
            <h3>{country.names?.common}</h3>
        </div>
    );


    const screenLayout = useScreenLayout();
    let  style; 

    switch (screenLayout) {
        case ScreenEnum.L:
            style = { width: '70vw', height: '80vh' }
            break;
            case ScreenEnum.M:
                style = { width: '60vw', height: '70vh' }
                break;
            case ScreenEnum.S:
                style = { width: '70vw', height: '60vh' }
                break;
            case ScreenEnum.XS:
                style = { width: '70vw', height: '50vh' }
                break;
        default:
            style = { width: '70vw', height: '50vh' }
            break;
    }

    return (
        <div>
            <Dialog 
                header={dialogHeader}
                visible={open}
                style={style}
                onHide={onClose}
                modal
                draggable={true}
                resizable={true}>

                <CountryCard country={country} />
                
            </Dialog>
        </div>
    );
};

export default CountryModalButton;
