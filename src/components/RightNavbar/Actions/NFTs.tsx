import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../../store/store';
import { updateWalletConnected, updateWalletConnectModalShow } from '../../../store/actions/globalAction';

import nftsJsonData from '../../../assets/data/nfts.json';

import { getFieldLP } from '../../../utils/utils';

import type { NFTData } from '../../../types/types';

import NFT from './NFT';
import NumberField from '../../NumberField';

let nftsData = nftsJsonData as NFTData[];

export default function NFTs() {
  const dispatch: Dispatch<any> = useDispatch();
  const walletConnected = useSelector((state: RootState) => state.global.walletConnected);
  const fieldData = useSelector((state: RootState) => state.global.fieldData);
  const fiTVL = getFieldLP(fieldData, 0);
  const curveTVL = getFieldLP(fieldData, 1);
  const nftSelected = useSelector((state: RootState) => state.navbar.rightNavbarNFTSelected);
  const maxValue = useSelector((state: RootState) => state.navbar.rightNavbarMaxValue);
  const curValue = useSelector((state: RootState) => state.navbar.rightNavbarCurValue);

  return (
    <>
      <p className='RightNavbar-SubTab-Content mb-[20px]'>Use 3Fi tokens and Curve C.D.P positions to mint 3Fi NFTs. 3Fi NFTs simplify harvest activity, gain access to communal harvest incentives and receive a share of protocol revenue.</p>
      {walletConnected === "Disconnected" &&
      <span
        className='Connect-Wallet-Button sm:static md:static lg:static xl:absolute 2xl:absolute'
        onClick={() => dispatch(updateWalletConnectModalShow(true))}
      >
        Connect Wallet
      </span>}
      {walletConnected === "Connected" &&
      <div className='w-full'>
        <div className='flex justify-between mb-[5px]'>
          <div>Available 3Fi: (A)</div>
          <div className={fiTVL ? (fiTVL < nftSelected.requirementA ? 'text-right text-red-600' : 'text-right') : 'text-right text-red-600'}>{fiTVL ? <NumberField value={fiTVL} digit={2} /> : "No balance"}</div>
        </div>
        <hr className='mb-[5px]' />
        <div className='flex justify-between mb-[5px]'>
          <div>Available 3sdCRV: (B)</div>
          <div className={curveTVL ? (curveTVL < nftSelected.requirementB ? 'text-right text-red-600' : 'text-right') : 'text-right text-red-600'}>{curveTVL ? <NumberField value={curveTVL} digit={2} /> : "No balance"}</div>
        </div>
        <hr className='mb-[5px]' />
        <p className='mb-[20px]'>Select an NFT of interest:</p>
        <div className='flex justify-between mb-[5px]'>
        {
          nftsData.map((nft) => {
            return (
              <NFT 
                nft={nft} 
                availability={fiTVL >= nft.requirementA && curveTVL >= nft.requirementB ? 1 : 0}
              />
            )
          })
        }
        </div>
        <div className='flex justify-between mb-[5px]'>
          <div>Mint requirement: (A+B) </div>
          <div className={(fiTVL && curveTVL && !maxValue) ? 'text-right text-red-600' : 'text-right'}>{nftSelected.requirementA >= 1000 ? ( nftSelected.requirementA / 1000 >= 1000 ? nftSelected.requirementA / 1000 / 1000 + "M" : nftSelected.requirementA / 1000 + "k" ) : nftSelected.requirementA} + {nftSelected.requirementB >= 1000 ? ( nftSelected.requirementB / 1000 >= 1000 ?  nftSelected.requirementB / 1000 / 1000 + "M" : nftSelected.requirementB / 1000 + "k" ) : nftSelected.requirementB}</div>
        </div>
        <div className='flex justify-between mb-[5px]'>
          <div>Mint limit based on selected NFT:</div>
          <div className={(maxValue == 0 || curValue > maxValue) ? 'text-right text-red-600' : 'text-right'}>{maxValue}</div>
        </div>
      </div>}
    </>
  )
}