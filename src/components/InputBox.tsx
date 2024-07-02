import { useEffect, useRef, useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import { RootState } from '../store/store';
import { updateRightNavbarCurValue, updateRightNavbarMaxValue } from '../store/actions/navbarAction';

import '../assets/scss/InputWithPercentage.scss';
import classNames from 'classnames';

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

type props = {
  adornmentText: string
  validationText: string
  value? : number
  // maxValue : number
  readOnly? : boolean
}

export default function InputBox({
  adornmentText,
  validationText,
  value,
  // maxValue,
  readOnly
}: props) {
  const inputRef: any = useRef<HTMLInputElement>();
  const dispatch: Dispatch<any> = useDispatch();
  const [disabled, setDisabled] = useState(readOnly?readOnly:false);
  const fieldSelected = useSelector((state: RootState) => state.global.fieldSelected);
  const maxValue = useSelector((state: RootState) => state.navbar.rightNavbarMaxValue);
  const subTabSelected = useSelector((state: RootState) => state.navbar.rightNavbarSubTabSelected);
  const curValue = useSelector((state: RootState) => state.navbar.rightNavbarCurValue);

  const [input, setInput] = useState<number>(value?value:0);
  // const [maximumValue, setMaximumValue] = useState<number>(maxValue?maxValue:0);

  // useEffect(() => {
  //   //Disable input box
   
  // }, []);

  useEffect(()=>{
    return () => {
      //unmount
      dispatch(updateRightNavbarMaxValue(0))
    };
  },[])

  useEffect(() => {
    setInput(0);
  }, [fieldSelected, subTabSelected]);

  useEffect(() => {
    //set value in redux
    dispatch(updateRightNavbarCurValue(Number(input)))
  }, [input]);

  // useEffect(() => {
  //   //set value in redux
  //   dispatch(updateRightNavbarMaxValue(Number(maximumValue)))
  // }, [maximumValue]);

  const updateToValuePercentage = (percent: number) => {
    let inputVal = 0
    // Do not proceed when disabled
    if (!disabled) {
      inputVal = maxValue * percent / 100
      dispatch(setInput(inputVal))
    }
  }

  useEffect(() => {
    //disable mouse wheel event on input type number
    const ignoreScroll = (e:any) => {
      e.preventDefault();
    };
    inputRef.current && inputRef.current.addEventListener("wheel", ignoreScroll);
  }, [inputRef]);

  return (
    <div 
    className={classNames(
      'InputWithPercentage my-[20px]',
    )}
    >
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
              
              {adornmentText}
            </InputAdornment>
          }
          style={
            disabled ?
            textFieldStyle[2] : //disabled
            (curValue > maxValue || maxValue === 0) ? textFieldStyle[1] : //valid
            textFieldStyle[0] //invalid
          }
          sx={{
            '& .MuiInputBase-input': {
              textAlign: 'right',
            },
          }}
          ref={inputRef}
          value={input}
          onChange={(event) => {
            if (Number(event.target.value) >= 0) {
                setInput(Number(event.target.value))
            }
          }}
          readOnly={disabled}
        />
      </FormControl>

      <div className='flex justify-between mt-[10px] text-[14px]'>
        {(subTabSelected !== "NFTs" && subTabSelected !== "Merge" && subTabSelected !== "BurnNFT" && curValue <= maxValue && maxValue !== 0) &&
        <span
          className={disabled ?
          'text-[#63717A] cursor-not-allowed' :
          'text-[#00FFF0] cursor-pointer'
          }
          onClick={() => updateToValuePercentage(25)}
        >
          25%
        </span>}
        {(subTabSelected !== "NFTs" && subTabSelected !== "Merge" && subTabSelected !== "BurnNFT" && curValue <= maxValue && maxValue !== 0) &&
          <span
            className={disabled ?
            'text-[#63717A] cursor-not-allowed' :
            'text-[#00FFF0] cursor-pointer'
            }
            onClick={() => updateToValuePercentage(50)}
          >
            50%
          </span>
        }
        {(subTabSelected !== "NFTs" && subTabSelected !== "Merge" && subTabSelected !== "BurnNFT" && curValue <= maxValue && maxValue !== 0) &&
          <span
            className={disabled ?
            'text-[#63717A] cursor-not-allowed' :
            'text-[#00FFF0] cursor-pointer'
            }
            onClick={() => updateToValuePercentage(75)}
          >
            75%
          </span>
        }
        {(curValue > maxValue || maxValue === 0) &&
          <span className='text-[#FF0000]'>{validationText}</span>
        }
        {((subTabSelected === "NFTs" || subTabSelected === "Merge" || subTabSelected === "BurnNFT") && curValue <= maxValue && maxValue !== 0) &&
          <span className='text-[#FF0000]'></span>
        }
        <span
          className={
          disabled ?
          'text-[#63717A] cursor-not-allowed' :
          (curValue >= maxValue) ? 'text-[#C3D6E2] cursor-pointer' : 'text-[#00FFF0] cursor-pointer'}
          onClick={() => updateToValuePercentage(100)}
        >
            MAX
          </span>
      </div>
    </div>
  )
}