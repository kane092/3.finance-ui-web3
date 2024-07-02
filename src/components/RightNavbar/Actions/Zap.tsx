import { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import Grid from '@mui/material/Unstable_Grid2';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';

import { RootState } from '../../../store/store';
import { updateWalletConnected, updateWalletConnectModalShow } from '../../../store/actions/globalAction';
import { updateRightNavbarAssetSelected, updateRightNavbarCurValue } from '../../../store/actions/navbarAction';

import NavbarExchange from '../../../assets/images/navbar-exchange.png';
import NumberField from '../../NumberField';

export default function Zap() {
  const dispatch: Dispatch<any> = useDispatch();
  const walletConnected = useSelector((state: RootState) => state.global.walletConnected);
  const fieldSelected = useSelector((state: RootState) => state.global.fieldSelected);
  const curValue = useSelector((state: RootState) => state.navbar.rightNavbarCurValue);
  const maxValue = useSelector((state: RootState) => state.navbar.rightNavbarMaxValue);
  const [assetSelected, setAssetSelected] = useState("None");
  const [direction, setDirection] = useState([true, true]);

  useEffect(() => {
    setAssetSelected("None");
  }, [fieldSelected]);

  const updateDirection = (index: number) => {
    let newDirection = [...direction]
    newDirection[index] = !direction[index]
    setDirection(newDirection)
  }

  const getExchangeRate = () => {
    return 2000
  }

  return (
    <>
      <p className='RightNavbar-SubTab-Content'>'Zap' is a function that allows use of assets, not directly supported by this pool, to be deposited.<br />To achieve this: assets are converted during transit into those assets that are supported.</p>
      {walletConnected === "Disconnected" &&
      <span
        className='Connect-Wallet-Button sm:static md:static lg:static xl:absolute 2xl:absolute'
        onClick={() => dispatch(updateWalletConnectModalShow(true))}
      >
        Connect Wallet
      </span>}
      {walletConnected === "Connected" &&
      <div className='w-full'>
        {/* <FormControl 
          sx={{
            m: 1,
            width: '100%',
            border: '2px solid red',
            borderRadius: '9px'
          }}
          variant="outlined"
        >
          <OutlinedInput
            id="outlined-adornment-weight"
            value="No assets found"
            sx={{
              border: 'none',
              color: 'red',
              fontSize: '18px',
              pointerEvents: 'none'
            }}
          />
        </FormControl> */}
        <FormControl
          sx={{
            m: 1,
            width: '100%',
            height: '51px',
            border: '2px solid #00FFF0',
            borderRadius: '9px',
            margin: '8px 0px 8px 0px',
          }}
        >
          <Select
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            value={assetSelected}
            sx={{
              color: '#00FFF0',
              fontSize: '18px',
              '& .MuiSvgIcon-root': {
                color: '#00FFF0'
              },
              height: '50px'
            }}
            // MenuProps={{ classes: { paper: classes.dropdownStyle } }}
            MenuProps={{
              PaperProps: {
                sx: {
                  // bgcolor: 'rgba(42, 46, 59, 0.85)',
                  bgcolor: '#2a2e3b',
                  color: 'white',
                  '& .MuiMenuItem-root': {
                    // padding: 2,
                    "&:hover": {
                      bgcolor: 'grey',
                    }
                  },
                },
              },
            }}
            onChange={(event) => {
              setAssetSelected(event.target.value)
              dispatch(updateRightNavbarAssetSelected(event.target.value))
              setDirection([true, true])
              dispatch(updateRightNavbarCurValue(0))
            }}
          >
            <MenuItem value="None">Select asset</MenuItem>
            <MenuItem value="ETH">ETH</MenuItem>
          </Select>
        </FormControl>
        {
          assetSelected === 'None' ? <p className='mb-[10px] text-right'>select asset to populate rates</p> : 
          <p className='mb-[10px] text-right'>{'...convert to '} 
            {
            // fieldSelected.type === "compoundEmissionFields" &&
              (fieldSelected.symbol ==='sdCRV' || fieldSelected.symbol ==='sdCRV3') ? 'sdCRV3' :
              fieldSelected.symbol ==='bentCVX' ? 'bentCVX3' :
              fieldSelected.symbol ==='BENT' ? 'BENT3' :
              fieldSelected.symbol
            }
          </p>
        }
        <hr className='mb-[10px]' />
        <div className='flex justify-between mb-[10px]'>
          <div>Exchange rate:</div>
          {assetSelected === "None" ?
          <div className='text-[12px] text-right flex justify-end'>
            {
              direction[0] === true ?
              `1 ${
                (fieldSelected.symbol ==='sdCRV' || fieldSelected.symbol ==='sdCRV3') ? 'sdCRV3' :
                fieldSelected.symbol ==='bentCVX' ? 'bentCVX3' :
                fieldSelected.symbol ==='BENT' ? 'BENT3' :
                fieldSelected.symbol
              } = 1.00 FRAX` :

              `1.00 FRAX = 1 ${
                (fieldSelected.symbol ==='sdCRV' || fieldSelected.symbol ==='sdCRV3') ? 'sdCRV3' :
                fieldSelected.symbol ==='bentCVX' ? 'bentCVX3' :
                fieldSelected.symbol ==='BENT' ? 'BENT3' :
                fieldSelected.symbol
              }`
            }
            <img 
              src={NavbarExchange} 
              className="exchange-icon" 
              alt='' 
              onClick={() => updateDirection(0)}
            />
          </div> :

          <div className='text-[12px] text-right flex justify-end'>
            {
              direction[0] === true ?
              `1 ${assetSelected} = 2,000.00 ${
                (fieldSelected.symbol ==='sdCRV' || fieldSelected.symbol ==='sdCRV3') ? 'sdCRV3' :
                fieldSelected.symbol ==='bentCVX' ? 'bentCVX3' :
                fieldSelected.symbol ==='BENT' ? 'BENT3' :
                fieldSelected.symbol
              }` :

              `2,000.00 ${
                (fieldSelected.symbol ==='sdCRV' || fieldSelected.symbol ==='sdCRV3') ? 'sdCRV3' :
                fieldSelected.symbol ==='bentCVX' ? 'bentCVX3' :
                fieldSelected.symbol ==='BENT' ? 'BENT3' :
                fieldSelected.symbol
              } = 1 ${assetSelected}`
            }
            <img 
              src={NavbarExchange} 
              className="exchange-icon" 
              alt='' 
              onClick={() => updateDirection(0)}
            />
          </div>}
        </div>
        
        {/* {_______________________________________________________________________} */}
        {assetSelected === "None" ?
        <div className='text-[12px] text-right flex justify-end mb-[10px]'>
          <p className='mb-[5px] text-[#63717A]'>
            {
              direction[1] === true ?
              `1 ${
                (fieldSelected.symbol ==='sdCRV' || fieldSelected.symbol ==='sdCRV3') ? 'sdCRV3' :
                fieldSelected.symbol ==='bentCVX' ? 'bentCVX3' :
                fieldSelected.symbol ==='BENT' ? 'BENT3' :
                fieldSelected.symbol
              } = 1.00 FRAX` :
              `1.00 FRAX = 1 ${
                (fieldSelected.symbol ==='sdCRV' || fieldSelected.symbol ==='sdCRV3') ? 'sdCRV3' :
                fieldSelected.symbol ==='bentCVX' ? 'bentCVX3' :
                fieldSelected.symbol ==='BENT' ? 'BENT3' :
                fieldSelected.symbol
              }`
            }
          </p>
          <img 
            src={NavbarExchange} 
            className="exchange-icon" 
            alt='' 
            onClick={() => updateDirection(1)}
          />
        </div> :

        <div className='text-[12px] text-right flex justify-end mb-[10px]'>
          <p className={curValue > 0 && curValue <= maxValue ? 'mb-[5px] text-[white]' : 'mb-[5px] text-[#63717A]'}>
            <NumberField value={direction[1] === true ? (curValue > 0 ? curValue : 1) : (curValue > 0 ? curValue * getExchangeRate() : getExchangeRate())} digit={2} />
            &nbsp;{direction[1] === true ? assetSelected : 
              (fieldSelected.symbol ==='sdCRV' || fieldSelected.symbol ==='sdCRV3') ? 'sdCRV3' :
              fieldSelected.symbol ==='bentCVX' ? 'bentCVX3' :
              fieldSelected.symbol ==='BENT' ? 'BENT3' :
              fieldSelected.symbol
            } = &nbsp;
            <NumberField value={direction[1] === true ? (curValue > 0 ? curValue * getExchangeRate() : getExchangeRate()) : (curValue > 0 ? curValue : 1)} digit={2} />
            &nbsp;{direction[1] === true ? 
              (fieldSelected.symbol ==='sdCRV' || fieldSelected.symbol ==='sdCRV3') ? 'sdCRV3' :
              fieldSelected.symbol ==='bentCVX' ? 'bentCVX3' :
              fieldSelected.symbol ==='BENT' ? 'BENT3' :
              fieldSelected.symbol
            : assetSelected}
          </p>
          <img 
            src={NavbarExchange} 
            className="exchange-icon" 
            alt='' 
            onClick={() => updateDirection(1)}
          />
        </div>}
        <hr className='mb-[10px]' />

        {assetSelected === "None" ?
        <div className='text-[#63717A]'><p className='pb-[5px]'>Waiting for asset selection...</p></div> :
        <div className='flex justify-between'>
          <div>ETH balance:</div>
          <div className={curValue > maxValue ? 'text-right text-red-600' : 'text-right'}>101.12</div>
        </div>}
      </div>}
    </>
  )
}