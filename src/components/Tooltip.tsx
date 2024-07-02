import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} arrow classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.white,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
      boxShadow: '0px 4px 4px 0px #00000040',
      // padding: '8px 8px 8px 8px',
      fontWeight: 'bold',
      width: '180px',
      
    },
  }));

  export default BootstrapTooltip