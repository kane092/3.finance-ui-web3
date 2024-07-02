import { useSelector } from 'react-redux';

import { RootState } from '../../../store/store';

import nftsJsonData from '../../../assets/data/nfts.json';

import type { NFTData } from '../../../types/types';

import NFT from './NFT';

let nftsData = nftsJsonData as NFTData[];

export default function BurnNFT() {
  const fieldSelected = useSelector((state: RootState) => state.global.fieldSelected);
  const nftSelected = useSelector((state: RootState) => state.navbar.rightNavbarNFTSelected);
  const maxValue = useSelector((state: RootState) => state.navbar.rightNavbarMaxValue);
  const curValue = useSelector((state: RootState) => state.navbar.rightNavbarCurValue);

  return (
    <div className='w-full'>
      <p className='RightNavbar-SubTab-Content'>Use ‘Burn’ to power down and release the underlying assets.</p>
      <p className='mb-[15px]'>You are about to Burn:</p>
      <div className='flex justify-between'>
        {
        nftsData.map((nft) => {
          return (
            <>
              {
                fieldSelected.name === nft.name + "" && 
                <NFT 
                  nft={nft} 
                  availability={2}  
                />
              }
            </>
          )
        })
        }
      </div>
      <div className='flex justify-between mt-[20px]'>
        <p>Burn output per NFT of type:</p>
        <p>{fieldSelected.name}</p>
      </div>
      <div className='flex justify-between mt-[10px]'>
        <p>Receivables: (3Fi + 3sdCRV)</p>
        <p>{fieldSelected.requirementA >= 1000 ? ( fieldSelected.requirementA / 1000 >= 1000 ? fieldSelected.requirementA / 1000 / 1000 + "M" : fieldSelected.requirementA / 1000 + "k" ) : fieldSelected.requirementA} + {fieldSelected.requirementB >= 1000 ? ( fieldSelected.requirementB / 1000 >= 1000 ?  fieldSelected.requirementB / 1000 / 1000 + "M" : fieldSelected.requirementB / 1000 + "k" ) : fieldSelected.requirementB}</p>
      </div>
      <div className='flex justify-between mt-[10px]'>
        <p>Burn limit based NFT availability:</p>
        <p className={curValue > maxValue ? 'text-red-600' : ''}>{maxValue}</p>
      </div>
    </div>
  )
}