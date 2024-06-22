import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import parse from 'autosuggest-highlight/parse';
import { debounce } from '@mui/material/utils';
import { parseAddressComponents, parsePostalCode } from '@/utils/parseAddressComponents';
import useCallAPI from '@/hooks/useCallAPI';
import { ArrowDown } from '@/assets/icons';

// This key was created specifically for the demo in mui.com.
// You need to create a new one for your application.
export const GOOGLE_MAPS_API_KEY = 'AIzaSyCEM4lp3kIZg6B4PM1doznnMrDNVHRJcNg';

function loadScript(src: string, position: HTMLElement | null, id: string) {
  if (!position) {
    return;
  }

  const script = document.createElement('script');
  script.setAttribute('async', '');
  script.setAttribute('id', id);
  script.src = src;
  position.appendChild(script);
}

const autocompleteService = { current: null };

interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}
interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}
interface PlaceType {
  description: string;
  structured_formatting: StructuredFormatting;
}

export default function GoogleMaps({ setParsedAddress }: { setParsedAddress: any }) {
  const [value, setValue] = React.useState<PlaceType | null>(null);
  const [inputValue, setInputValue] = React.useState('');
  const { apiCallFunction } = useCallAPI()
  const [options, setOptions] = React.useState<readonly PlaceType[]>([]);
  const loaded = React.useRef(false);

  if (typeof window !== 'undefined' && !loaded.current) {
    if (!document.querySelector('#google-maps')) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`,
        document.querySelector('head'),
        'google-maps',
      );
    }

    loaded.current = true;
  }

  const fetch = React.useMemo(
    () =>
      debounce(
        (
          request: { input: string },
          callback: (results?: readonly PlaceType[]) => void,
        ) => {
          (autocompleteService.current as any).getPlacePredictions(
            request,
            callback,
          );
        },
        400,
      ),
    [],
  );

  React.useEffect(() => {
    const fetchParsedAddress = async () => {
      if (value) {
        const parsedAddress = await parseAddressComponents(value);

        const apiCalling = async () => {
          const getPostalCode = async () => {
            const response = await apiCallFunction(`https://maps.googleapis.com/maps/api/geocode/json?place_id=${parsedAddress?.place_id}&key=${GOOGLE_MAPS_API_KEY}`, 'GET', null, null, true);
            return parsePostalCode(response);
          };

          let postalCode;
          if (parsedAddress?.place_id) {
            postalCode = await getPostalCode();
            setParsedAddress({
              country: parsedAddress?.country,
              state: parsedAddress?.stateFullName || parsedAddress?.state, // Use full name if available
              address: parsedAddress?.address.replace(/,/g, ''),
              city: parsedAddress?.city,
              address2: parsedAddress?.address2.replace(/,/g, ''),
              postalCode: postalCode,
            });
          } else {
            setParsedAddress({
              country: parsedAddress?.country,
              state: parsedAddress?.stateFullName || parsedAddress?.state, // Use full name if available
              address: parsedAddress?.address.replace(/,/g, ''),
              city: parsedAddress?.city,
              address2: parsedAddress?.address2.replace(/,/g, ''),
            });
          }
        };

        apiCalling();
      }
    };

    fetchParsedAddress();
  }, [value])

  React.useEffect(() => {
    let active = true;

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (
        window as any
      ).google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }

    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: readonly PlaceType[]) => {
      if (active) {
        let newOptions: readonly PlaceType[] = [];

        if (value) {
          newOptions = [value];
        }

        if (results) {
          newOptions = [...newOptions, ...results];
        }

        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Autocomplete
      getOptionLabel={(option) =>
        typeof option === 'string' ? option : option.description
      }
      filterOptions={(x) => x}
      options={options}
      fullWidth
      autoComplete
      includeInputInList
      filterSelectedOptions
      popupIcon={<ArrowDown />}
      value={value}
      noOptionsText="No locations"
      onChange={(event: any, newValue: PlaceType | null) => {
        setOptions(newValue ? [newValue, ...options] : options);
        setValue(newValue);
      }}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      renderInput={(params) => (
        <TextField
          placeholder="Search your address on Google"
          {...params}
          fullWidth
        />
      )}
      renderOption={(props, option) => {
        const matches =
          option.structured_formatting.main_text_matched_substrings || [];

        const parts = parse(
          option.structured_formatting.main_text,
          matches.map((match: any) => [match.offset, match.offset + match.length]),
        );

        return (
          <li {...props}>
            <Grid container alignItems="center">
              {/* <Grid item sx={{ display: 'flex', width: 44 }}>
                <LocationOnIcon sx={{ color: 'text.secondary' }} />
              </Grid> */}
              <Grid item sx={{ width: 'calc(100% - 44px)', wordWrap: 'break-word' }}>
                {parts.map((part, index) => (
                  <Box
                    key={index}
                    component="span"
                    sx={{ fontWeight: part.highlight ? 'bold' : 'regular' }}
                  >
                    {part.text}
                  </Box>
                ))}
                <Typography variant="body2" color="text.secondary">
                  {option.structured_formatting.secondary_text}
                </Typography>
              </Grid>
            </Grid>
          </li>
        );
      }}
    />
  );
}
