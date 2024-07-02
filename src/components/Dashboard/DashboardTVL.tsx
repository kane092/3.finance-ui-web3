import { useSelector } from 'react-redux';

import classNames from 'classnames';

import { RootState } from '../../store/store';

import Grid from '@mui/material/Unstable_Grid2';

import '../../assets/scss/Content.scss';

import TVLWidget from './TVLWidget';
import NFTWidget from './NFTWidget';

export default function DashboardTVL() {
    const leftNavbarShow = useSelector((state: RootState) => state.navbar.leftNavbarShow);

    return (
        <Grid xs={12} md={12} container className=
            {classNames(
                'flex flex-col md:flex-row',
                leftNavbarShow === "Opened" ? "justify-start" : "justify-start"
            )}
        >
            <TVLWidget />
            <NFTWidget />
        </Grid>
    )
}