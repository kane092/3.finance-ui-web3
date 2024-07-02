import { useSelector } from 'react-redux';

import { RootState } from '../../../store/store';

import nftsJsonData from '../../../assets/data/nfts.json';

import type { NFTData } from '../../../types/types';

import NFT from './NFT';

let nftsData = nftsJsonData as NFTData[];

export default function Merge() {
  const fieldSelected = useSelector((state: RootState) => state.global.fieldSelected);
  const rightNavbarNFTSelected = useSelector((state: RootState) => state.navbar.rightNavbarNFTSelected);
  const maxValue = useSelector((state: RootState) => state.navbar.rightNavbarMaxValue);
  const curValue = useSelector((state: RootState) => state.navbar.rightNavbarCurValue);

  return (
    <>
      <p className='RightNavbar-SubTab-Content'>Use ‘Merge’ to power up your NFT’s and release the artwork of the NFT being merged.</p>
      <p className='w-full'>Select an NFT to set requirements:</p>
      <div className='flex justify-between w-full mt-[10px]'>
        {
        nftsData.map((nft) => {
          return (
            <NFT 
              nft={nft} 
              availability={Math.floor(fieldSelected.depositsLP / (nft.requirementA / fieldSelected.requirementA)) > 0 ? 1 : 0}
            />
          )
        })
        }
      </div>
      <div className='flex justify-between w-full mt-[10px]'>
        <p>Requirement for {fieldSelected.name} to: {rightNavbarNFTSelected.name}</p>
        <p>{rightNavbarNFTSelected.requirementA / fieldSelected.requirementA >= 1000 ? rightNavbarNFTSelected.requirementA / fieldSelected.requirementA / 1000 + 'k' : rightNavbarNFTSelected.requirementA / fieldSelected.requirementA} = 1</p>
      </div>
      <div className='flex justify-between w-full mt-[10px] mb-[10px]'>
        <p>Mint limit based on selected NFT availability:</p>
        <p className={(maxValue && curValue <= maxValue) ? '' : 'text-red-600'}>{maxValue}</p>
      </div>
      {!maxValue &&
      <p className='text-red-600 w-full'>Insufficiant balances to mint by merger:</p>}
    </>
  )
}