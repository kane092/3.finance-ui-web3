import { useSelector } from 'react-redux';

import { RootState } from '../../../store/store';

import SubTab from "./SubTab";

export default function SubTabs() {
  const subTabSelected = useSelector((state: RootState) => state.navbar.rightNavbarSubTabSelected);
  const fieldSelected = useSelector((state: RootState) => state.global.fieldSelected)


  return (
    <div className={'RightNavbar-SubTabs relative'}>
      {(subTabSelected === "Mint" || subTabSelected === "Burn") &&
      <>
        <SubTab subTabType='Mint' subTabLabel='Mint 3Fi' id="Mint" />
        <SubTab subTabType='Burn' subTabLabel='Burn 3Fi' id="Burn" />
        {/* <SubTab subTabType='NFTs' subTabLabel='Mint 3Fi-NFTs' id="NFTs" /> */}
      </>}
      {
        subTabSelected === "NFTs" && <SubTab subTabType='NFTs' subTabLabel='Mint 3Fi-NFTs' id="NFTs" />
      }
      {(subTabSelected === "Zap" || subTabSelected === "Deposit" || subTabSelected === "Withdraw") &&
      <>
      {/* Todo: enable and show inactive subtabs */}
        <SubTab subTabType='Zap' subTabLabel='Zap' id="Zap" disabled={true}/>
        <SubTab subTabType='Deposit' subTabLabel='Deposit' id="Deposit" />
        <SubTab subTabType='Withdraw' subTabLabel='Withdraw' id="Withdraw" />
      </>}
      {(subTabSelected === "Help" || subTabSelected === "Currency" || subTabSelected === "Signals") &&
      <>
        <SubTab subTabType='Help' subTabLabel='Help' id="Help" />
        <SubTab subTabType='Currency' subTabLabel='Currency' id="Currency" />
        <SubTab subTabType='Signals' subTabLabel='Signals' id="Signals" />
      </>}
      {(subTabSelected === "Merge" || subTabSelected === "BurnNFT") &&
      <>
        <SubTab subTabType='Merge' subTabLabel='Merge' id="Merge" />
        <SubTab subTabType='BurnNFT' subTabLabel='Burn' id="BurnNFT" />
      </>}
      {(subTabSelected === "Harvest" || subTabSelected === "Claim") &&
      <>
        <SubTab 
         subTabType='Harvest'
         subTabLabel='Harvest' 
         id="Harvest"
        //  hidden={fieldSelected.name==='CVX'?true:false}
        disabled={fieldSelected.name==='CVX'?true:false}
          />
        <SubTab subTabType='Claim' subTabLabel={fieldSelected.name === 'CVX' ? "Liquid Claim" : 'Claim'} id="Claim" />
      </>}
      {(subTabSelected === "Distribute" || subTabSelected === "Manage" || subTabSelected === "ClaimNFT") &&
      <>
        <SubTab subTabType='Distribute' subTabLabel='Distribute' id="Distribute" />
        <SubTab subTabType='Manage' subTabLabel='Manage' id="Manage" />
        <SubTab subTabType='ClaimNFT' subTabLabel='ClaimNFT' id="ClaimNFT" />
      </>}
    </div>
  )
}