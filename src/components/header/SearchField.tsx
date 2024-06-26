import React, { useEffect, useMemo, useState } from "react";
import { Box, TextField, Autocomplete, IconButton, Stack } from "@mui/material";
import { Search } from "../../assets/icons/index"; // Assuming you have imported the Search icon

// Assuming you have appropriate custom hooks for API calls and debouncing
import useCallAPI from "@/hooks/useCallAPI";
import useDebounce from "@/hooks/useDebounce";
import { ENDPOINTS } from "@/utils/constants";
import { navigate } from "gatsby";
import useShowToaster from "@/hooks/useShowToaster";

interface Option {
  name: string;
  friendlypagename: string;
}

function SearchField() {
  const searchParams = useMemo(() => new URLSearchParams(window.location.search), [window.location.search]);
  const { apiCallFunction } = useCallAPI();
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const { showToaster } = useShowToaster()

  useEffect(() => {
    if (searchParams.has("keyword")) {
      setInputValue(searchParams.get("keyword")!);
    }
  }, [searchParams])

  const debouncedInputValue = useDebounce(inputValue, 500);

  const fetchOptions = async () => {
    try {
      const response = await apiCallFunction(ENDPOINTS.autoSearch + debouncedInputValue, "POST");
      setOptions(() => response?.data);
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  useEffect(() => {
    if (debouncedInputValue) {
      fetchOptions();
    } else {
      setOptions(() => []); // Clear options when input value is empty
    }
  }, [debouncedInputValue]);

  useEffect(() => {
    return () => {
      setOptions([]);
    }
  }, []);

  const handleKeyPress = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (inputValue !== "") {
      const key = Date.now()
      navigate(`/category/search/?keyword=${inputValue}`, { state: key,replace:true });
    }
    else {
      showToaster({ message: "Please enter some search keyword.", severity: "info" })
    }
  }

  return (
    <Autocomplete
      className="SearchField"
      options={options}
      color="primary"
      getOptionLabel={(option: Option) => option.name}
      inputValue={inputValue}
      renderOption={(props, option: Option) => (
        <Box component="li" sx={{ "& > img": { mr: 2, flexShrink: 0 } }} {...props} onClick={() => {
          const key = Date.now()
          navigate(`/product-details/${option?.friendlypagename}`, { state: key })
        }}>
          {/* Uncomment below if you have an image associated with each option */}
          {/* <img
            loading="lazy"
            width="20"
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            alt=""
          /> */}
          {option?.name}
        </Box>
      )}
      renderInput={(params) => (
        <Stack className="Wrapper">
          <TextField
            {...params}
            variant="filled"
            type="search"
            placeholder="Search Product"
            value={inputValue}
            onChange={(e) => {
                setInputValue(e.target.value)
                setOptions([])
            }}
            inputProps={{
              ...params.inputProps,
            }}
            onKeyDown={handleKeyPress}
          />
          <IconButton color="secondary" aria-label='SearchButton' className="SearchButton" onClick={handleSearch} >
            <Search fontSize="small" />
          </IconButton>
        </Stack>
      )}
    />
  );
}

export default SearchField;
