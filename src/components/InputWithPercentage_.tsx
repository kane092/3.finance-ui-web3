import { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import { RootState } from '../store/store';
import { updateRightNavbarCurValue } from '../store/actions/navbarAction';

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
}

export default function InputWithPercentage({
  adornmentText,
  validationText
}: props) {
  const dispatch: Dispatch<any> = useDispatch();
  const [curValue, setCurValue] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const fieldSelected = useSelector((state: RootState) => state.global.fieldSelected);
  const cValue = useSelector((state: RootState) => state.navbar.rightNavbarCurValue);
  const maxValue = useSelector((state: RootState) => state.navbar.rightNavbarMaxValue);
  const subTabSelected = useSelector((state: RootState) => state.navbar.rightNavbarSubTabSelected);
  const assetSelected = useSelector((state: RootState) => state.navbar.rightNavbarAssetSelected);
  const depositValue = useSelector((state: RootState) => state.navbar.rightNavbarDepositValue);

  useEffect(() => {
    //Disable input box
    if(subTabSelected==="Deposit"){
      depositValue.forEach((value)=>{
        if(value===0){
          setDisabled(true)
          return
        }
      })
    }else if(subTabSelected === "Zap"){
      assetSelected === "None" ? setDisabled(true) : setDisabled(false) 
    }
    else if(subTabSelected === "Withdraw"){
      assetSelected === "None" ? setDisabled(true) : setDisabled(false) 
    }
    else{
      setDisabled(false);
    }
    // setDisabled((assetSelected === "None" && subTabSelected === "Zap") || (subTabSelected === "Deposit" && depositValue[0] === 0 && depositValue[1] === 0 && depositValue[2] === 0 && depositValue[3] === 0));
  }, [assetSelected, subTabSelected, depositValue,cValue]);

  useEffect(() => {
    setCurValue(0.00);
  }, [fieldSelected, subTabSelected]);

  useEffect(() => {
    setCurValue(cValue);
  }, [cValue]);

  const updateToValuePercentage = (value: number) => {
    let inputVal = 0
    // Do not proceed when disabled
    if (!disabled) {
      // if (subTabSelected === "NFTs") inputVal = Math.floor(maxValue * value / 100) 
      inputVal = maxValue * value / 100
      setCurValue(inputVal)
      dispatch(updateRightNavbarCurValue(inputVal))
    }
  }

  return (
    <div className={classNames(
      'InputWithPercentage my-[20px]',
      assetSelected === 'None' && subTabSelected !== 'Zap' ? 'hidden' : ''
    )}>
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
          style={disabled ?
            textFieldStyle[2] :
            (curValue > maxValue || maxValue === 0) ? textFieldStyle[1] : textFieldStyle[0]
          }
          sx={{
            '& .MuiInputBase-input': {
              textAlign: 'right',
            },
          }}
          // value={curValue >= 0 ? (subTabSelected === "NFTs" || subTabSelected === "Merge" || subTabSelected === "BurnNFT" ? Math.floor(curValue) : curValue) : 0} //Todo:commented
          value={curValue}
          onChange={(event) => {
            if (Number(event.target.value) >= 0) {
              // if (subTabSelected === "NFTs" || subTabSelected === "Merge" || subTabSelected === "BurnNFT") {
              //   setCurValue(Math.floor(Number(event.target.value)))
              //   dispatch(updateRightNavbarCurValue(Math.floor(Number(event.target.value))))
              // } 
              // else {
                setCurValue(Number(event.target.value))
                dispatch(updateRightNavbarCurValue(Number(event.target.value)))
              // }
            }
          }}
          readOnly={disabled}
        />
      </FormControl>

      {/* Todo */}
      {/* <div className='flex justify-between mt-[10px] text-[14px]'>
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
      </div> */}
    </div>
  )
}