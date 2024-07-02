import { useEffect, useRef, useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import { RootState } from '../store/store';
import { updateRightNavbarCurValue, updateRightNavbarMaxValue } from '../store/actions/navbarAction';

import '../assets/scss/InputWithPercentage.scss';

const textFieldStyle:React.CSSProperties[] = [
  { // Validated
    width: "100%",
    height: "50px",
    border: "2px solid #61F8EF",
    borderRadius: '9px',
    color: 'white',
    fontSize: '27px',
    textAlign: 'right',
  },
  { // Not Validated
    width: "100%",
    height: "50px",
    border: "2px solid #61F8EF",
    borderRadius: '9px',
    color: 'red',
    fontSize: '27px',
    textAlign: 'right',
  },
  { // Disabled
    width: "100%",
    height: "50px",
    border: "2px solid #63717A",
    borderRadius: '9px',
    color: '#63717A',
    fontSize: '27px',
    textAlign: 'right',
  }
]

interface Asset {
  symbol: string
  amount: number
}

type props = {
  asset: Asset | undefined
  disabled: boolean
  value: number
  setValue: Function
}

export default function InputWithPercentage({
  asset,
  disabled,
  value,
  setValue
}: props) {

  const fieldSelected = useSelector((state: RootState) => state.global.fieldSelected);
  const subTabSelected = useSelector((state: RootState) => state.navbar.rightNavbarSubTabSelected);
  const maxValue = useSelector((state: RootState) => state.navbar.rightNavbarMaxValue);
  const curValue = useSelector((state: RootState) => state.navbar.rightNavbarCurValue);
  const inputRef: any = useRef<HTMLInputElement>();
  const dispatch: Dispatch<any> = useDispatch();


  useEffect(() => {
    //disable mouse wheel event on input type number
    const ignoreScroll = (e:any) => {
      e.preventDefault();
    };
    inputRef.current && inputRef.current.addEventListener("wheel", ignoreScroll);
  }, [inputRef]);

  useEffect(()=>{
    // setValue(0)
    return () => {
      //unmount
      dispatch(updateRightNavbarMaxValue(0))
    };
  },[])

  useEffect(() => {
    setValue(0);
  }, [fieldSelected, subTabSelected]);

  function changePercentage (percent: number) {
    // if (asset && value <= asset?.amount && asset?.amount !== 0) setValue(asset.amount * percent / 100)
    setValue(maxValue * percent / 100)
  }

  return (
    <div className='my-[20px]'>
      <FormControl variant="outlined">
        <OutlinedInput
          id="outlined-adornment-weight"
          type="number"
          startAdornment={
            <InputAdornment
              position="start"
              sx={disabled ?
              {
                '& .MuiTypography-root': {
                  color: '#63717A !important',
                  fontSize: '18px',
                },
              }:
              {
                '& .MuiTypography-root': {
                  color: 'white !important',
                  fontSize: '18px',
                },
              }}
            >
              
              {asset === undefined ? "No asset selected" : asset.symbol}
            </InputAdornment>
          }
          style={disabled ?
            textFieldStyle[2] :
            (curValue > maxValue || maxValue === 0) ? textFieldStyle[1] :
            textFieldStyle[0]
          }
          sx={{
            '& .MuiInputBase-input': {
              textAlign: 'right',
            },
          }}
          ref={inputRef}
          value={value >= 0 ? value : 0}
          onChange={(event) => {
            setValue(Number(event.target.value))
          }}
          readOnly={disabled}
        />
      </FormControl>
      {/* Todo: */}
      <div className='flex justify-between mt-[10px] text-[14px]'>
        {!(curValue > maxValue || maxValue === 0) &&
        <>
          <span
            className={disabled ?
            'text-[#63717A] cursor-not-allowed' :
            'text-[#00FFF0] cursor-pointer'
            }
            onClick={() => changePercentage(25)}
          >
            25%
          </span>
          <span
            className={disabled ?
            'text-[#63717A] cursor-not-allowed' :
            'text-[#00FFF0] cursor-pointer'
            }
            onClick={() => changePercentage(50)}
          >
            50%
          </span>
          
          <span
            className={disabled ?
            'text-[#63717A] cursor-not-allowed' :
            'text-[#00FFF0] cursor-pointer'
            }
            onClick={() => changePercentage(75)}
          >
            75%
          </span>
        </>
        }
        {(!disabled && (curValue > maxValue || maxValue === 0)) &&
        <span className='text-[#FF0000]'>You have exceeded your availability limit.</span>}
        <span
          className={
          disabled ?
          'text-[#63717A] cursor-not-allowed' :
          (asset && value >= asset?.amount) ? 'text-[#C3D6E2] cursor-pointer' : 'text-[#00FFF0] cursor-pointer'}
          onClick={() => changePercentage(100)}
        >
            MAX
        </span>
      </div>
    </div>
  )
}