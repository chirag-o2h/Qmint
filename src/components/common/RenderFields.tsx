import React, { useEffect, useState } from 'react'
import { Box, FormControl, Select, RadioGroup, FormControlLabel, FormLabel, Radio, FormHelperText, Checkbox, FormGroup, Switch, TextField, IconButton, InputAdornment, Button, Stack, Autocomplete } from '@mui/material'
import { Controller, get } from 'react-hook-form'
import classNames from 'classnames'
import PhoneInput from 'react-phone-input-2'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// Hooks
import { useToggle } from '../../hooks'

// Type
import type { MenuProps, FormControlLabelProps } from '@mui/material'
import type { RenderFieldType, FieldOption } from '../../types/renderFields'
import type { UseFormRegister, FieldError } from 'react-hook-form/dist/types'

// Assets
import {
  EyeOnIcon,
  EyeOffIcon,
} from '../../assets/icons/index'
import { clear } from 'console'
import { DateRangePicker } from '@adobe/react-spectrum'
import { CalendarDate } from '@internationalized/date'
import { THEME_TYPE } from '@/axiosfolder'

interface RenderFieldProps {
  type?: RenderFieldType
  error?: FieldError | boolean
  register?: UseFormRegister<any>
  placeholder?: string
  label?: string | React.ReactElement
  variant?: 'standard' | 'outlined' | 'filled'
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
  value?: string
  onChange?: (value?: any) => void
  id?: string
  className?: string
  name: string
  defaultValue?: string | number
  options?: FieldOption[]
  autocompleteOptions?: {
    id: number,
    name: string
  }[]
  setAutoCompleteValue?: any
  multiline?: boolean
  readOnly?: boolean
  rows?: number
  control?: any
  setPhoneNumberValue?: any
  dateRangeValue?: {
    start: CalendarDate,
    end: CalendarDate
  } | null,
  setDateRangeValue?: React.Dispatch<React.SetStateAction<{
    start: CalendarDate;
    end: CalendarDate;
  } | null>>,
  dateRangeError?: string | null,
  autoComplete?: string
  uploadFileHandler?: any
  disabled?: boolean,
  setSelectedFile?: any,
  clearErrors?: any,
  setError?: any,
  getValues?: any,
  margin?: 'dense' | 'normal' | 'none'
  row?: boolean
  fullWidth?: boolean
  icon?: React.ReactNode
  checkedIcon?: React.ReactNode
  endAdornment?: React.JSX.Element
  onBlur?: () => void
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
  MenuProps?: Partial<MenuProps>
  children?: any
  labelPlacement?: FormControlLabelProps['labelPlacement'],
  setValue?: any,
  required?: boolean,
  alreadySelectedFilters?: string[],
  alloweTheDotIntertion?: boolean
  inputProps?:any
}

const RenderFields: React.FC<RenderFieldProps> = ({
  type,
  error,
  register = () => { },
  placeholder,
  label,
  name,
  getValues,
  variant = 'filled',
  color = 'primary',
  children,
  value,
  onChange,
  id,
  className,
  options,
  defaultValue,
  multiline,
  clearErrors,
  disabled,
  uploadFileHandler,
  autoComplete = 'on',
  margin = 'dense',
  fullWidth = true,
  row,
  readOnly,
  setError,
  dateRangeValue,
  // dateRangeError,
  setDateRangeValue,
  setPhoneNumberValue,
  setValue,
  onBlur,
  setAutoCompleteValue,
  onKeyDown,
  MenuProps,
  icon,
  checkedIcon,
  endAdornment,
  setSelectedFile,
  control,
  autocompleteOptions,
  labelPlacement,
  required,
  alreadySelectedFilters,
  alloweTheDotIntertion =false,
  inputProps,
  ...otherProps
}) => {
  const [passwordVisibility, togglePasswordVisibility] = useToggle(false)

  useEffect(() => {
    if (setValue)
      setValue(name, value)
  }, [value])
  if (name === "State")
    // console.log("🚀 ~ useEffect ~ value:", value)

  useEffect(() => {
    // Find the react-tel-input div and add the class conditionally
    const telInput = document.querySelector('.react-tel-input');
    if (telInput && THEME_TYPE === "1") {
      telInput.classList.add('BmkPhoneInput');
    }
  }, []);
  useEffect(() => {
    // Find the react-tel-input div and add the class conditionally
    const telInput = document.querySelector('.react-tel-input');
    if (telInput && THEME_TYPE === "0") {
      telInput.classList.add('QmintPhoneInput');
    }
  }, []);

  let fieldType = null
  switch (type) {
    case 'select':
      fieldType = (
        <FormControl
          fullWidth={fullWidth}
          margin={margin}
          color={color}
          {...(error ? { error: true } : {})}
        >
          {label && <FormLabel htmlFor={name}>{label}{required && " *"}</FormLabel>}
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <Select
                inputProps={{ id: name }}
                error={!!error}
                disabled={disabled}
                defaultValue={defaultValue}
                variant={variant}
                MenuProps={MenuProps}
                displayEmpty
                sx={
                  field.value === 'none' || field.value === ''
                    ? {
                      color: "#1d21296b",
                    }
                    : {
                      color: "#1D2129",
                    }
                }
                {...register(name)}
                {...otherProps}
                value={(getValues && getValues(name)) ?? value}
                onChange={(e) => {
                  if (setValue) {
                    setValue(name, e.target.value)
                  }
                  if (onChange) {
                    onChange(e.target.value)
                  }
                  if (clearErrors && getValues && getValues(name) !== "none") {
                    clearErrors(name)
                  }
                }
                }
              >
                {children}
              </Select>
            )}
          />
        </FormControl>
      );
      break;

    case 'radio':
      if (!options) return null
      fieldType = (
        <FormControl margin={margin} fullWidth={fullWidth}>
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <RadioGroup row={row} >
                {options.map((radioOption) => (
                  <FormControlLabel
                    key={radioOption.id}
                    value={radioOption.value}
                    disabled={radioOption.disabled}
                    control={
                      <Radio
                        icon={icon}
                        checkedIcon={checkedIcon}
                        disabled={disabled}
                        {...otherProps}
                        onChange={(e) => {
                          setValue(name, e.target.value)
                          if (onChange) {
                            onChange()
                          }
                        }}
                        checked={field.value === radioOption.value}
                      />
                    }
                    label={radioOption.label}
                    labelPlacement={labelPlacement}
                    {...register(name)}
                  />
                ))}
              </RadioGroup>
            )}
          />
        </FormControl>
      )
      break

    case 'checkbox':
      fieldType = (
        <FormControl margin={margin} {...(error ? { error: true } : {})}>
          {(label && options) && <FormLabel htmlFor={name}>{label}</FormLabel>}
          <FormGroup row={row}>
            {options ? (
              options.map((checkboxOption) => (
                <FormControlLabel
                  key={checkboxOption.id}
                  control={
                    <Checkbox
                      onChange={(e) => {
                        setValue(name, {
                          ...getValues(name), // Preserve existing values
                          [checkboxOption.value]: e.target.checked // Update specific value
                        });
                        if (onChange) {
                          onChange(); // Trigger onChange if provided
                        }
                      }}
                      checked={alreadySelectedFilters?.includes(checkboxOption.value) || !!getValues(name)?.[checkboxOption.value]}
                      icon={icon}
                      checkedIcon={checkedIcon}
                    />
                  }
                  label={checkboxOption.label}
                  disabled={checkboxOption.disabled}
                  slotProps={{ typography: { variant: THEME_TYPE === "1" ? "body1" : "body2" } }}
                />
              ))
            ) : (
              <FormControlLabel
                control={<Checkbox />}
                label={label}
                {...register(name)}
              />
            )}
          </FormGroup>
        </FormControl>
      );
      break;

      case 'checkbox2':
        fieldType = (
          <FormControl margin={margin} {...(error ? { error: true } : {})}>
            {(label && options) && <FormLabel htmlFor={name}>{label}</FormLabel>}
            <FormGroup row={row}>
              {options ? (
                options.map((checkboxOption) => (
                  <FormControlLabel
                    key={checkboxOption.id}
                    control={
                      <Checkbox
                        onChange={(e) => {
                          // setValue(name, {
                          //   ...getValues(name), // Preserve existing values
                          //   [checkboxOption.value]: e.target.checked // Update specific value
                          // });
                          if (onChange) {
                            onChange(checkboxOption.value); // Trigger onChange if provided
                          }
                        }}
                        // checked={alreadySelectedFilters?.includes(checkboxOption.value) || !!getValues(name)?.[checkboxOption.value]}
                        icon={icon}
                        checkedIcon={checkedIcon}
                      />
                    }
                    label={checkboxOption.label}
                    disabled={checkboxOption.disabled}
                    slotProps={{ typography: { variant: THEME_TYPE === "1" ? "body1" : "body2" } }}
                  />
                ))
              ) : (
                <FormControlLabel
                  control={<Checkbox />}
                  label={label}
                  {...register(name)}
                />
              )}
            </FormGroup>
          </FormControl>
        );
        break;
  
    case 'switch':
      fieldType = (
        <FormControl margin={margin} {...(error ? { error: true } : {})}>
          <FormControlLabel
            control={
              <Switch {...register(name)} disabled={disabled} {...otherProps} />
            }
            label={label}
          />
        </FormControl>
      )
      break

    case 'password':
      fieldType = (
        <FormControl
          fullWidth={fullWidth}
          margin={margin}
          {...(error ? { error: true } : {})}
        >
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
          <TextField
            id={name}
            fullWidth={fullWidth}
            type={passwordVisibility ? 'text' : 'password'}
            placeholder={placeholder}
            error={!!error}
            autoComplete={autoComplete}
            variant={variant}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={togglePasswordVisibility}>
                    {passwordVisibility ? (
                      <EyeOffIcon />
                    ) : (
                      <EyeOnIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            onChange={(e) => {
              if (onChange) {
                onChange(e)
              }
            }}
            {...register(name)}
            {...otherProps}
          />
        </FormControl>
      )
      break

    case "phoneInput":
      fieldType = (
        <FormControl
          fullWidth={fullWidth}
          margin={margin}
          {...(error ? { error: true } : {})}
        >
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
          <Controller
            name={name}
            control={control}
            defaultValue=""
            rules={{ required: 'Phone number is required' }}
            render={({ field }) => (
              <PhoneInput
                country="au"
                onChange={(value, country) => {
                  // field.onChange(value)
                  setPhoneNumberValue({
                    value,
                    country
                  })
                  setValue(name, value)
                }}
                value={value}
                onBlur={field.onBlur}
                preferredCountries={['au']}
                // {...field}
                inputClass={classNames("form-control", { "error": !!error })}
                disabled={disabled}
              />
            )}
            {...register(name)}
            {...otherProps}
          />
        </FormControl>
      )
      break

    case "autocomplete":
      fieldType = (
        <FormControl
          fullWidth={fullWidth}
          margin={margin}
          {...(error ? { error: true } : {})}
        >
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <Autocomplete
                disablePortal
                options={autocompleteOptions ?? []}
                getOptionLabel={(option: any) => {
                  if (typeof option === 'string') {
                    return option;
                  }
                  return option?.name;
                }}
                renderInput={(params) => <TextField placeholder="Enter state *" {...params} error={!!error} />}
                fullWidth
                onChange={(_, value) => {
                  if (!value) {
                    return;
                  }
                  if (typeof value === 'string') {
                    setValue('State', value);
                  } else {
                    setValue('State', value?.name);
                  }
                }}
                inputValue={value}
                onInputChange={(event, newInputValue) => {
                  setValue('State', newInputValue);
                  setAutoCompleteValue(newInputValue)
                  if (newInputValue !== "") {
                    clearErrors(name)
                  }
                  else if (setError) {
                    setError(name, { type: "required", message: "State is a required field" })
                  }
                }}
                freeSolo />)}
            {...register(name)}
            {...otherProps}
          />
        </FormControl>
      )
      break

    case 'file':
      fieldType = (
        <FormControl
          fullWidth={fullWidth}
          margin={margin}
          {...(error ? { error: true } : {})}
        >
          {label && <FormLabel htmlFor={name}>{label}{required && " *"}</FormLabel>}
          <Stack className="FileUploadWrapper" sx={{
            position: 'relative',
            alignItems: 'center',
          }}>
            <TextField
              type="file"
              id={name}
              fullWidth={fullWidth}
              error={!!error}
              placeholder={placeholder}
              multiline={multiline}
              value={value}
              autoComplete={autoComplete}
              defaultValue={defaultValue}
              disabled={disabled}
              variant={variant}
              onKeyDown={onKeyDown}
              sx={{
                '& .MuiInputBase-input': {
                  height: '100%',
                },
              }}
              InputProps={{ readOnly, onBlur, endAdornment, }}
              {...register(name)}
              {...otherProps}
              onChange={(e: any) => {
                if (setSelectedFile) setSelectedFile(e.target?.files[0])
              }}
            />
            <Button className='UploadButton' variant="contained" size="large" sx={{
              position: 'absolute',
              right: 0,
              top: 0,
              height: '100%',
            }} onClick={uploadFileHandler}>Upload</Button>
          </Stack>
        </FormControl>
      )
      break

    case 'number':
      fieldType = (
        <FormControl
          fullWidth={fullWidth}
          margin={margin}
          {...(error ? { error: true } : {})}
        >
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
          <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({ field: { } }) => (
              <TextField
                id={name}
                type="number"
                inputProps={{ step: "any" }}
                fullWidth={fullWidth}
                error={!!error}
                placeholder={placeholder}
                defaultValue={defaultValue}
                disabled={disabled}
                autoComplete={autoComplete}
                variant={variant}
                InputProps={{ endAdornment }}
                onChange={(event) => {
                  // console.log("swdesfrgtfhy")
                  const numberRegex = /^-?\d*\.?\d*$/
                  if (!numberRegex.test(event.target.value)) {
                    return
                  }
                  if (onChange) {
                    // console.log("swdesfrgtfhy")
                    onChange(event)
                  }
                }}
                onKeyDown={(e) => {
                  ['e', 'E', '+', '-',!alloweTheDotIntertion && '.'].includes(e.key) &&
                    e.preventDefault()
                }}
                value={value}
                {...register(name)}
                {...otherProps}
              />
            )}
          />

        </FormControl>
      )
      break

    case "dateRange":
      fieldType = (
        <FormControl
          fullWidth={fullWidth}
          margin={margin}
          {...(error ? { error: true } : {})}
        >
          {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
          <DateRangePicker
            label="Date range"
            value={dateRangeValue}
            onChange={
              (value) => {
                if (setDateRangeValue) {
                  setDateRangeValue(value)
                }
                if (setValue) {
                  setValue(name, value)
                }
                if (clearErrors) {
                  clearErrors(name)
                }
              }
            }
            maxVisibleMonths={2}
            pageBehavior="single"
            UNSAFE_className="DateRangePicker"
            validationState={error ? "invalid" : undefined}
          />
        </FormControl>
      )
      break


    default:
      fieldType = (
        <FormControl
          fullWidth={fullWidth}
          margin={margin}
          {...(error ? { error: true } : {})}
        >
          {label && <FormLabel htmlFor={name}>{label}{required && " *"}</FormLabel>}
          <TextField
            id={name}
            fullWidth={fullWidth}
            error={!!error}
            placeholder={placeholder}
            multiline={multiline}
            value={value}
            autoComplete={autoComplete}
            defaultValue={defaultValue}
            disabled={disabled}
            variant={variant}
            onKeyDown={onKeyDown}
            // label={label}
            InputProps={{ readOnly, onBlur, endAdornment }}
            onChange={onChange}
            {...register(name)}
            {...otherProps}
          />
        </FormControl>
      )
  }

  return (
    <Box
      className={classNames(
        'InputRow',
        className,
        { DatePicker: type === 'date' },
        { Slider: type === 'slider' }
      )}
    >
      {fieldType}
      {error && typeof error === 'object' && (
        <FormHelperText className={error && 'Mui-error'}>
          {error.message}
        </FormHelperText>
      )}
    </Box>
  )
}

export default RenderFields
