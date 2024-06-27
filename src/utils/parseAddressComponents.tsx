export interface AddressComponents {
    country: string;
    state: string;
    address: string;
    city: string;
    address2: string;
    place_id?: string
}

import { GOOGLE_MAPS_API_KEY } from '@/components/common/GoogleMaps';
// export function parseAddressComponents(data: any): AddressComponents {
//     // const terms = data.description.split(',');
//     // let country = '';
//     // let state = '';
//     // let address = '';

//     // if (terms.length === 1) {
//     //     country = terms[0];
//     // } else if (terms.length >= 2) {
//     //     state = terms[terms.length - 2];
//     //     country = terms[terms.length - 1];

//     //     for (let i = 0; i < terms.length - 2; i++) {
//     //         address += terms[i];
//     //         if (i < terms.length - 3) {
//     //             address += ', ';
//     //         }
//     //     }
//     // }
//     const x = data.terms?.slice(0, - 3)
//     return {
//         country: data.terms?.at(-1)?.value,
//         state: data.terms?.at(-2)?.value,
//         city: data.terms?.at(-3)?.value,
//         address: x.splice(0, 2).reduce((i: { value: any; }, j: any, index: any) => {
//             return (i + "" + j.value + (x.length - 1 === index ? '' : ', '))
//         }, ''),
//         address2: x.reduce((i: { value: any; }, j: any, index: any) => {
//             return (i + "" + j.value + (x.length - 1 === index ? '' : ', '))
//         }, ''),
//         place_id: data?.place_id
//     };
// }

import axios from 'axios';

export async function parseAddressComponents(data: any): Promise<AddressComponents> {
    // console.log("🚀 ~ parseAddressComponents ~ data:", data)
    const x = data.terms?.slice(0, -3);
    const parsedAddress = {
        country: data.terms?.at(-1)?.value,
        state: data.terms?.at(-2)?.value,
        city: data.terms?.at(-3)?.value,
        address: x.splice(0, 2).reduce((i: { value: any; }, j: any, index: any) => {
            return (i + "" + j.value + (x.length - 1 === index ? '' : ', '));
        }, ''),
        address2: x.reduce((i: { value: any; }, j: any, index: any) => {
            return (i + "" + j.value + (x.length - 1 === index ? '' : ', '));
        }, ''),
        place_id: data?.place_id,
        stateFullName: null
    };

    // Fetch the full state name if necessary
    if (parsedAddress.state) {
        try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${parsedAddress.state}&key=${GOOGLE_MAPS_API_KEY}`);
            const stateFullName = response.data.results[0].address_components.find((component: any) => component.types.includes('administrative_area_level_1'))?.long_name;
            parsedAddress.stateFullName = stateFullName || parsedAddress.state;
        } catch (error) {
            console.error('Error fetching full state name:', error);
            parsedAddress.stateFullName = parsedAddress.state;
        }
    }

    return parsedAddress;
}

export const parsePostalCode = (data: any) => {
    const addressComponents = data?.results[0]?.address_components;
    let postalCode;

    if (!addressComponents) return;

    Object.keys(addressComponents).map((key: any) => {
        if (addressComponents[key]?.types[0] === "postal_code") {
            postalCode = addressComponents[key]?.short_name;
        }
    })

    return postalCode;
}