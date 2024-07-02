import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';

import classNames from 'classnames';

import { RootState } from '../../../store/store';
import { updateRightNavbarNFTSelected } from '../../../store/actions/navbarAction';

import NavbarRedDot from '../../../assets/images/navbar-red-dot.png'
import NavbarGreenDot from '../../../assets/images/navbar-green-dot.png'
import NavbarWhiteDot from '../../../assets/images/navbar-white-dot.png'

import { NFTData } from "../../../types/types";

type props = {
  nft: NFTData
  availability: Number
}

export default function NFT({
  nft,
  availability=0
}: props) {
  const dispatch: Dispatch<any> = useDispatch();
  const nftSelected = useSelector((state: RootState) => state.navbar.rightNavbarNFTSelected);
  const fieldSelected = useSelector((state: RootState) => state.global.fieldSelected);
  const subTabSelected = useSelector((state: RootState) => state.navbar.rightNavbarSubTabSelected);
  // 0 for disabled, 1 for selected, 2 for none
  const status = nft.name === fieldSelected.name && subTabSelected === "Merge" ? 0 : (nft.name === nftSelected.name || (nft.name === fieldSelected.name && subTabSelected === "BurnNFT") ? 1 : 2);

  return (
    <div className='flex flex-col cursor-pointer' onClick={() => {
      // Do not select when status is disabled
      if (status === 0) return;

      dispatch(updateRightNavbarNFTSelected(nft));
    }}>
      <img
        alt=''
        src={nft.symbol}
        className={classNames(
          'w-[40px] md:w-[30px] xl:w-[35px] 2xl:w-[40px] h-[40px] md:h-[30px] xl:h-[35px] 2xl:h-[40px] nft rounded-full',
          status === 1 ? 'border-[2px] border-[white] rounded-full' : '',
          status === 2 ? 'border-[2px] border-[#00FFF0] rounded-full' : '',
        )}
      />
      <div className='flex justify-center'>
        {status !== 0 &&
          // availability 0: impossible, 1: available, 2: definitely
          <img alt='' src={availability !== 0 ? (availability === 1 ? NavbarGreenDot : NavbarWhiteDot) : NavbarRedDot} className='w-[2px] h-[2px] text-center mt-[5px]' />
        }
        {status === 0 &&
          <img alt='' src='' className='w-[2px] h-[2px] text-center mt-[5px]' />
        }
      </div>
      <span
        className={
          status === 2 ?
          'text-[8px] text-[#00FFF0] text-center uppercase' :
          'text-[8px] text-white text-center uppercase'
        }
      >
        {nft.name}
      </span>
      {status === 0 &&
      <span
        className='text-[8px] text-white text-center uppercase'
      >
        {fieldSelected.fieldLP}
      </span>}
    </div>
  )
}