import Toggle2Button from '../../ToggleButton/Toggle2Button';

import '../../../assets/scss/Currency.scss';

export default function Help() {

  return (
    <>
      <p className='RightNavbar-SubTab-Content'>How would you like to value your portfolio?<br /><br />FRAX is our stable of choice and reflects the USD value of your portfolio. CRV is our base currency of choice and represents our main collateral on 3.Finance.</p>
      <p className='text-[18px]'>Reflect as:</p>
      <Toggle2Button
        label1="FRAX"
        label2="CRV"
      />
    </>
  )
}