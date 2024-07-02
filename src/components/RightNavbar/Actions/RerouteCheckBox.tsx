import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

type props = {
  label: string
  small: boolean
  setRerouteChecked: Function
  checked: boolean
}

export default function RerouteCheckBox ({
  label,
  small,
  setRerouteChecked,
  checked
}: props) {

  return (
    <FormControlLabel
      control={
        <Checkbox
          size={small ? "small" : "medium"}
          sx={{
            '& .MuiButtonBase-root': {
              padding: '5px !important'
            },
            color: '#00FFF0',
            '&.Mui-checked': {
              color: '#00FFF0',
            },
            '&.Mui-disabled': {
              color: '#C3D6E233',
            },
          }}
          onChange={(event) => {
            setRerouteChecked(event.target.checked);
          }}
          checked={checked}
        />
      }
      label={label}
      sx={
      small ?
      {
        '& .MuiTypography-root': {
          fontSize: '12px',
          color: 'white !important',
        }
      } :
      {
        '& .MuiTypography-root': {
          fontSize: '14px',
          lineHeight: '18px',
          color: 'white !important',
        }
      }}
    />
  )
}