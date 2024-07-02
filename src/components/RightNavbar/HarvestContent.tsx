import { useState } from "react";
import {useDispatch, useSelector } from "react-redux";
import { Dispatch } from "redux";
import { RootState } from "../../store/store";
import NumberField from "../NumberField";
import NavbarExchange from '../../assets/images/navbar-exchange.png';

const HarvestContent = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const fieldSelected = useSelector((state: RootState) => state.global.fieldSelected);
  const globalSignalSaved = useSelector((state: RootState) => state.global.signalSaved);
  const fieldSignalSelected = fieldSelected.signalSelected;
  const signalSelected = fieldSignalSelected ? fieldSignalSelected : globalSignalSaved;
  const [direction, setDirection] = useState([true, true, true]);

  const updateDirection = (index: number) => {
    let newDirection = [...direction]
    newDirection[index] = !direction[index]
    setDirection(newDirection)
  }

  return (
    <>
    <hr className='my-[10px]' />
    <div className='flex justify-between mb-[10px]'>
      <p>Emissions earned: ({fieldSelected.tokens ? fieldSelected.tokens[0] : ''})</p>
      <p>{fieldSelected.emissionsCollected}</p>
    </div>
    <div className='flex justify-between'>
      {(fieldSelected.name === 'Curve' || fieldSelected.name === 'Convex' || fieldSelected.name === 'Bent') &&
      <p>Emissions earned: (USD)</p>}
      {fieldSelected.name !== 'Curve' && fieldSelected.name !== 'Convex' && fieldSelected.name !== 'Bent' &&
      <p>
        {(signalSelected === 'Curve' || signalSelected === 'CRV wallet') &&
        'Emissions earned: (CRV)'}
        {signalSelected === 'Convex' &&
        'Emissions earned: (CVX)'}
        {signalSelected === 'Bent' &&
        'Emissions earned: (BENT)'}
      </p>}
      {(fieldSelected.name === 'Curve' || fieldSelected.name === 'Convex' || fieldSelected.name === 'Bent') &&
      <p>1,234,567,890.00</p>}
      {fieldSelected.name !== 'Curve' && fieldSelected.name !== 'Convex' && fieldSelected.name !== 'Bent' &&
      <p>1,234,567,890.00</p>}
    </div>
    <hr className='my-[10px]' />
    <div className='flex justify-between'>
      <p>Exchange rate:</p>
      <div>
        {fieldSelected.name !== 'Curve' && fieldSelected.name !== 'Convex' && fieldSelected.name !== 'Bent' &&
        <p className='flex justify-end mb-[10px]'>
          {(signalSelected === 'Curve' || signalSelected === 'CRV wallet') &&
          (
            direction[0] === true ?
            <>
              1.00 {fieldSelected.tokens ? fieldSelected.tokens[0] : ''} = {fieldSelected.emissionRateWithCRV} CRV 
            </> :
            <>
              1.00 CRV = <NumberField value={1/fieldSelected.emissionRateWithCRV} digit={2} /> {fieldSelected.tokens ? fieldSelected.tokens[0] : ''}
            </>
          )}
          {signalSelected === 'Convex' &&
          (
            direction[0] === true ?
            <>
              1.00 {fieldSelected.tokens ? fieldSelected.tokens[0] : ''} = {fieldSelected.emissionRateWithCVX} CVX 
            </> :
            <>
              1.00 CVX = <NumberField value={1/fieldSelected.emissionRateWithCVX} digit={2} /> {fieldSelected.tokens ? fieldSelected.tokens[0] : ''}
            </>
          )}
          {signalSelected === 'Bent' &&
          (
            direction[0] === true ?
            <>
              1.00 {fieldSelected.tokens ? fieldSelected.tokens[0] : ''} = {fieldSelected.emissionRateWithBENT} BENT 
            </> :
            <>
              1.00 BENT = <NumberField value={1/fieldSelected.emissionRateWithBENT} digit={2} /> {fieldSelected.tokens ? fieldSelected.tokens[0] : ''}
            </>
          )}
          <img src={NavbarExchange} className='exchange-icon' alt='' onClick={() => updateDirection(0)} />
        </p>
        }
        <p className='flex justify-end mb-[10px]'>
          {(fieldSelected.name === 'Curve' || (fieldSelected.name !== 'Curve' && fieldSelected.name !== 'Convex' && fieldSelected.name !== 'Bent' && (signalSelected === 'Curve' || signalSelected === 'CRV wallet'))) &&
          (
            direction[1] === true ?
            <>
              1.00 CRV = 1.00 sdCRV
            </> :
            <>
              1.00 sdCRV = 1.00 CRV
            </>
          )}
          {(fieldSelected.name === 'Convex' || (fieldSelected.name !== 'Curve' && fieldSelected.name !== 'Convex' && fieldSelected.name !== 'Bent' && signalSelected === 'Convex')) &&
          (
            direction[1] === true ?
            <>
              1.00 CVX = 1.00 vlBCVX
            </> :
            <>
              1.00 vlBCVX = 1.00 CVX
            </>
          )}
          {(fieldSelected.name === 'Bent' || (fieldSelected.name !== 'Curve' && fieldSelected.name !== 'Convex' && fieldSelected.name !== 'Bent' && signalSelected === 'Bent')) &&
          (
            direction[1] === true ?
            <>
              1.00 BENT = 1.00 vlBENT
            </> :
            <>
              1.00 vlBENT = 1.00 BENT
            </>
          )}
          <img src={NavbarExchange} className='exchange-icon' alt='' onClick={() => updateDirection(1)} />
        </p>
        <p className='flex justify-end'>
          {(fieldSelected.name === 'Curve' || (fieldSelected.name !== 'Curve' && fieldSelected.name !== 'Convex' && fieldSelected.name !== 'Bent' && (signalSelected === 'Curve' || signalSelected === 'CRV wallet'))) &&
          (
            direction[2] === true ?
            <>
              1.00 sdCRV = 1.00 3sdCRV
            </> :
            <>
              1.00 3sdCRV = 1.00 sdCRV
            </>
          )}
          {(fieldSelected.name === 'Convex' || (fieldSelected.name !== 'Curve' && fieldSelected.name !== 'Convex' && fieldSelected.name !== 'Bent' && signalSelected === 'Convex')) &&
          (
            direction[2] === true ?
            <>
              1.00 vlBCVX = 1.00 3vlBCVX
            </> :
            <>
              1.00 3vlBCVX = 1.00 vlBCVX
            </>
          )}
          {(fieldSelected.name === 'Bent' || (fieldSelected.name !== 'Curve' && fieldSelected.name !== 'Convex' && fieldSelected.name !== 'Bent' && signalSelected === 'Bent')) &&
          (
            direction[2] === true ?
            <>
              1.00 vlBENT = 1.00 3vlBENT
            </> :
            <>
              1.00 3vlBENT = 1.00 vlBENT
            </>
          )}
          <img src={NavbarExchange} className='exchange-icon' alt='' onClick={() => updateDirection(2)} />
        </p>
      </div>
    </div>
    <hr className='my-[10px]' />
    </>
  )
}

export default HarvestContent

