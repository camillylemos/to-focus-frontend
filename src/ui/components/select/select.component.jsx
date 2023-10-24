/* eslint-disable react/jsx-pascal-case */
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as _Select,
} from '@mui/material'

const Select = ({ formData, handleChange }) => {
  return (
    <FormControl sx={{ m: 1, margin: 0 }}>
      <InputLabel>{formData.label}</InputLabel>
      <_Select {...formData} onChange={handleChange}>
        {formData.options.map(({ value, name }) => (
          <MenuItem key={value} value={value}>
            {name}
          </MenuItem>
        ))}
      </_Select>
    </FormControl>
  )
}

export { Select }
