import { styled } from '@mui/material/styles';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: 'rgba(0, 0, 0, 0.87)',
    boxShadow: theme.shadows[1],
    fontSize: 11,
    padding: 10
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.white,
  },
}));

type props = {
    title: string | React.ReactNode
}

export default function CustomizedTooltips({
    title
  }: props) {
  return (
    <LightTooltip title={title} placement="right" arrow>
        <InfoIcon sx={{ color: '#fff', fontSize: 12 }} className="align-top" />
    </LightTooltip>
  );
}