import Tab from '@mui/material/Tab/Tab';
import Tabs from '@mui/material/Tabs/Tabs';
import Tooltip from '@mui/material/Tooltip/Tooltip';
import React from 'react';
import '../../assets/scss/Toggle3Button.scss';

export default function Toggle3Button() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };
  
  return (
    <Tabs className="switch_3 my-[32px]"
      value={value}
      onChange={handleChange}
      indicatorColor="secondary"
      textColor="inherit"
      variant="fullWidth"
      aria-label="full width tabs example"
    >
      <Tab label="Individual" />
      <Tooltip title="Coming Soon" placement="top"><Tab label="Community" /></Tooltip>
      <Tooltip title="Coming Soon" placement="top"><Tab label="NFT Holders" /></Tooltip>
    </Tabs>
  )
}