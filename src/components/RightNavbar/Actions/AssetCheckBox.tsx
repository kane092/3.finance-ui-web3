import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

type props = {
  label: string
  small: boolean
  asset: Asset
  checkAsset: Function
  checked: boolean
  disabled: boolean
}

export interface Asset {
  symbol: string
  amount: number
}

export default function AssetCheckBox ({
  label,
  small,
  asset,
  checkAsset,
  checked,
  disabled
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
            checkAsset(asset, event.target.checked);
          }}
          checked={checked}
          disabled={disabled}
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