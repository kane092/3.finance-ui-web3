import { cellRendererPropsType } from "../../types/types";
import Grid from "@mui/material/Unstable_Grid2";
import QuestionIcon from "../../assets/images/Question.png";

export const SampleRendrer = ({
  params,
}: cellRendererPropsType): JSX.Element => {
  // these renderors will be passed to column definations of table
  //data will be accessed from params
  return (
    <>
      <div className="flex justify-between">
        <span>{params.coldef.colHeader}:</span>
        <span>{params.data.value}</span>
      </div>
    </>
  );
};

export const DetailsRendrer = ({
  params,
}: cellRendererPropsType): JSX.Element => {
  // these renderors will be passed to column definations of table
  //data will be accessed from params
  return (
    <>
      <div className="flex justify-between h-full">
        <div className="">
          <div className="Field-APR-Left hidden md:block">
            <p className="duration-300">APR %</p>
            <span className="Field-APR-Hover flex text-[#C3D6E2] text-[12px] leading-[15px]">
              Emissions:
            </span>
          </div>
        </div>
        <div>
          <div className="mr-[0px] md:mr-[10px] 2xl:mr-[40px] 3xl:mr-[50px] flex flex-col items-end">
            <span className="duration-300">128.86</span>
            <div className="Field-APR-Hover hidden md:flex">
              <img src="" className="ml-[2px]" alt="..." />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const MessageRendrer = ({
  params,
}: cellRendererPropsType): JSX.Element => {
  // these renderors will be passed to column definations of table
  //data will be accessed from params
  return (
    <>
      <div className="flex justify-center">
        <div className="hidden md:block">
          <div className="duration-300 flex flex-row items-center bg-[#d9d9d91a] py-[6px] pl-[10px] pr-[12px] rounded-[21px]">
            <img
              className="w-[16px] h-[16px] mr-[8px]"
              src={QuestionIcon}
              alt=""
            />
            <span className="text-[10px] font-normal leading-[12px]">
              DEPOSIT BALANCE TO GAIN 3.FINANCE BENEFITS AND PROTOCOL UTILITY.
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export const ImageRendrer = ({
  params,
}: cellRendererPropsType): JSX.Element => {
  // these renderors will be passed to column definations of table
  //data will be accessed from params
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            alt=""
            src="./images/token-sdk.png"
            className="w-[40px] md:w-[46px] h-[40px] md:h-[46px] mr-[10px]"
          />
          <img
            alt=""
            src="./images/token-wrapper-crv.png"
            className="second-img"
            />
            <p>{params.data.name} {params.data.isNFT && <span>&times;{params.data.depositsLP}</span>}</p>
            
        </div>
        <div className="hidden xl:block mr-[10px] 2xl:mr-[10px] 3xl:mr-[10px] flex flex-col items-end">
          <img
            alt=""
            src="./images/token-wrapper-crv.png"
            className="img-gray"
          />
        </div>
        
      </div>
    </>
  );
};
