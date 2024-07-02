import LogoLP from '../assets/images/logo-lp.png';

export default function ComingSoon() {
  return (
    <div className='flex flex-col items-center justify-center mb-[100px]'>
      <img src={LogoLP} className='w-[169px] mb-[20px]' alt='' />
      <p className='mb-[20px] text-[90px] leading-[114px] tracking-[.02em] text-shadow-landing-page'>A growth protocol</p>
      <p className='text-[27px] leading-[34px] text-shadow-landing-page'>Fueling wealth sovereignty in DeFi</p>
      <p className='absolute bottom-[150px] text-shadow-coming-soon'>Coming Soon</p>
    </div>
  )
}