import FooterLogo from '../../assets/images/navbar-logo.png';
import ArrowUp from '../../assets/images/arrow-up.png';
import ArrowRight from '../../assets/images/arrow-right.png';
import AuditedBy from '../../assets/images/audited-by.png';
import Zokyo from '../../assets/images/zokyo.png';
import FooterTwitter from '../../assets/images/footer-twitter.png';
import FooterDiscord from '../../assets/images/footer-discord.png';
import FooterTelegram from '../../assets/images/footer-telegram.png';
import FooterMedium from '../../assets/images/footer-medium.png';

export default function Footer() {
  return (
    <div className="fixed bottom-[0px] bg-[url('./assets/images/footer.png')] w-full pt-[50px] pb-[30px] pl-[40px]">
      <div className='flex justify-between mb-[20px]'>
        <p className='flex items-center w-full text-[24px] leading-[31px] font-medium'>
          <img src={FooterLogo} alt='' className='mr-[5px]' />
          Finance
        </p>
        <a href='/'>
          <p className='flex items-center mr-[200px] text-[14px] leading-[21px] text-[#00FFFF]'>
            Audit
            <img src={ArrowRight} alt='' className='ml-[5px]' />
          </p>
        </a>
        <img src={ArrowUp} alt='' className='w-[19px] h-[22px] mr-[25px]' />
      </div>
      <div className='pr-[70px] pl-[30px]'>
        <div className='flex justify-between mb-[30px]'>
          <p className='text-[16px] leading-[21px] text-[#FFFFFF]/[0.8]'>
            A growth protocol on a mission to fuel<br />wealth sovereignty in DeFi.
          </p>
          <a href='/'>
            <p className='flex items-center mr-[160px] text-[14px] leading-[21px] text-[#00FFFF]'>
              Documentation
              <img src={ArrowRight} alt='' className='ml-[5px]' />
            </p>
          </a>
        </div>
        <div>
          <p className='mb-[20px] text-[16px] leading-[21px]'>Community:</p>
          <div className='flex'>
            <a href='/'>
              <img src={FooterTwitter} alt='' className='mr-[10px]' />
            </a>
            <a href='/'>
              <img src={FooterDiscord} alt='' className='mr-[10px]' />
            </a>
            <a href='/'>
              <img src={FooterTelegram} alt='' className='mr-[10px]' />
            </a>
            <a href='/'>
              <img src={FooterMedium} alt='' className='mr-[10px]' />
            </a>
          </div>
        </div>
        <hr className='my-[10px] border-[#696D78] opacity-50' />
        <div className='flex justify-between items-end'>
          <p className='text-[12px] leading-[15px] text-[#FFFFFF]/[0.8] w-full'>Copyright © 3.finance 2022. All rights reserved.  |   Private Policy</p>
          <div className='mr-[30px]'>
            <p className='text-[8px] uppercase'>Audited by:</p>
            <img src={AuditedBy} alt='' />
          </div>
          <img src={Zokyo} alt='' />
        </div>
      </div>
    </div>
  )
}