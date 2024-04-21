import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import SearchBox from '../SearchBox/SearchBox';
import PlaceIcon from '@mui/icons-material/Place';
import { useEffect, useRef } from 'react';
import { Divider } from '@mui/material';

import classNames from 'classnames/bind';
import styles from './GoogleMap.module.scss';
const cx = classNames.bind(styles);

const PlacesAutocomplete = ({ position, setPosition }) => {
    const {
        value,
        suggestions: { status, data },
        setValue,
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            language: 'vi',
            componentRestrictions: { country: 'vi' },
        },
        debounce: 300,
    });

    const handleInput = (e) => {
        // Update the keyword of the input element
        setValue(e.target.value);
    };

    const handleSelect =
        ({ description }) =>
        () => {
            // When the user selects a place, we can replace the keyword without request data from API
            // by setting the second parameter to "false"
            console.log('description');
            setValue(description, false);
            clearSuggestions();

            // Get latitude and longitude via utility functions
            getGeocode({ address: description }).then((results) => {
                const { lat, lng } = getLatLng(results[0]);
                setPosition({ address: description, lat, lng });
            });
        };
    useEffect(() => {
        if (position) {
            setValue(position.address);
        }
    }, [position]);

    return (
        <div className={cx('autocomplete-wrapper')}>
            <SearchBox placeholder="Where are you going?" value={value} onChange={handleInput} />
            {status === 'OK' && (
                <div className={cx('suggestion-container')}>
                    <div className={cx('suggestion-wraper')}>
                        {data.map((suggestion) => {
                            const {
                                place_id,
                                structured_formatting: { main_text, secondary_text },
                            } = suggestion;

                            return (
                                <div className={cx('item-wrapper')} key={place_id} onClick={handleSelect(suggestion)}>
                                    <div className={cx('icon-place')}>
                                        <PlaceIcon />
                                    </div>
                                    <p>
                                        <strong>{main_text}</strong> <small>{secondary_text}</small>
                                    </p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PlacesAutocomplete;
