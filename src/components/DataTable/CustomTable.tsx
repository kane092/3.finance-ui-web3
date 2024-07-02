import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import CustomTableRow from "./CustomTableRow";
import ArrowRight from "../../assets/images/arrow-right.png";
import classNames from "classnames";
import {colDefType,RowDataType} from '../../types/types'

type tablePropsType = { rowData?: RowDataType[] | any[]; colDefs?: colDefType[], title?:string,onRowClicked?:any }

function CustomTable(props: tablePropsType) {
  const {rowData,colDefs,title} = props
  const [rows, setRows] = useState<any>([]);
  const [coldefs, setColdefs] = useState<any>([]);
  useEffect(() => {
    setRows(rowData);

    setColdefs(colDefs);
  }, []);

  return (
    <>
      {
        title && (
          <Grid xs={12} className="w-full text-[20px] my-2">
            <span className="leading-[28px]">{title}</span>
          </Grid>
        )
      }
      {rows.map((value: any, index: number) => {
        return (
          <>
            <CustomTableRow
              rowIndex={index}
              rowData={value}
              onRowClicked={props.onRowClicked}
            >
              <div className="grid grid-cols-12 w-full">
                <div className="col-span-11">
                  <div className="flex">
                    {coldefs.map((col: any, index: number) => {
                        const indexValue = value[col?.dataIndex]
                        let isRender = false
                        let Rendrer = null
                        if(col.rendrer){
                          Rendrer = col.rendrer
                          isRender = true
                        }
                        // console.log("type:", typeof(Rendrer))
                      return (
                        <>
                          {/* render content using cell renderer */}
                          <div
                            className="grid-cell mx-2 py-1 "
                            style={{
                              width: `${100 / coldefs.length}%`,
                            }}
                            >
                            {isRender?<Rendrer params={{data:{...value},coldef:col}}/>:<p>{indexValue}</p>}
                            {/* {col.rendrer({ data: { ...value }, coldef: col })} */}
                          </div>
                          {index !== coldefs.length - 1 && (
                            <div
                              className="wp-x h-12 border-r border-transparent"
                              style={{ content: "", background: "#63717A" }}
                            ></div>
                          )}
                        </>
                      );
                    })}
                  </div>
                </div>
                <div className="col-span-1">
                  <div className="flex md:min-w-full items-center justify-center h-full">
                    <h6 className="hidden md:block text-[14px] text-[#00FFFF] leading-[21px] h-[20px]">
                      More
                    </h6>
                    <img
                      className="w-[14px] h-[12px] ml-[6px]"
                      src={ArrowRight}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </CustomTableRow>
          </>
        );
      })}
    </>
  );
}

export default CustomTable;
