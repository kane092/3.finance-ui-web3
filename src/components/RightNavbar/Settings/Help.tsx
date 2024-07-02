import Toggle2Button from '../../ToggleButton/Toggle2Button';

import '../../../assets/scss/Help.scss';

export default function Help() {
  return (
    <>
      <p className='RightNavbar-SubTab-Content'>
        The 'Help' feature adds descriptions like this to this location in all drawers. Turn 'Help' off to hide these descriptions.
      </p>
      <p className='text-[18px]'>
        Tips and Descriptions
      </p>
      <Toggle2Button
        label1="Show"
        label2="Hide"
      />
    </>
  )
}