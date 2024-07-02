import { useSelector } from 'react-redux';

import Grid from '@mui/material/Unstable_Grid2';

import classNames from 'classnames';

import { RootState } from '../store/store';

type props = {
  showLiquidDeposits: boolean
  setShowLiquidDeposits: (showLiquidDeposits: boolean) => void,
  showFilters:boolean,
  setShowFilters: any,
  filterQuery?:string,
  setFilterQuery?:any,
  disabled : boolean
}

export default function MorePools({
  showLiquidDeposits,
  setShowLiquidDeposits,
  showFilters,
  setShowFilters,
  filterQuery,
  setFilterQuery,
  disabled,
}: props) {
  const leftNavbarShow = useSelector((state: RootState) => state.navbar.leftNavbarShow);
  const walletConnected = useSelector((state: RootState) => state.global.walletConnected);

  return (
    <Grid
      container
      spacing={2}
      xs={12}
      className={classNames(
        'bg-[#22262F] Field-More border-[1px] border-[#2A2E3B]/[0.85] text-[16px] xl:text-[18px]',
        disabled ? "grayscale cursor-not-allowed" : ""
      )}
      onClick={() => {
        if(!disabled){
          setShowLiquidDeposits(!showLiquidDeposits)
          setShowFilters(!showFilters)
        }
      }}
    >
      <Grid xs={7}>More pools coming soon</Grid>
      <Grid xs={5} className='relative flex justify-end'>
        {walletConnected === "Disconnected" &&
        <>
          <span className='ml-[5px] hidden xl:block'>APR</span>
          <span
            className={classNames(
              'text-right w-full hidden md:block',
              showLiquidDeposits ? 'px-[15px] 2xl:px-[55px] 3xl:px-[65px]' : 'pl-[10px] 2xl:pl-[40px] 3xl:pl-[50px] 2xl:pr-[30px] 3xl:pr-[45px]'
            )}
          >
            17.12 to 228.86 %
          </span>
        </>}
        <div className={classNames(
          showLiquidDeposits ? 'text-[#00FFFF] w-[65px] min-w-[65px] text-end text-[14px]' : 'text-[#00FFFF] min-w-[90px] w-[90px] text-end text-[14px]',
        )}>
          {showLiquidDeposits ? "Hide All" : "Show All"}
        </div>
      </Grid>
    </Grid>
  )
}