import React from 'react';
import { Home } from '@material-ui/icons';
import { Dashboard } from '@material-ui/icons';
import { Notifications } from '@material-ui/icons';
import { Info } from '@material-ui/icons';
import { Settings } from '@material-ui/icons';

export const SideBarData = [
    {
        title: "Dashboard",
        icon: <Dashboard />,
        link: "/"
    },
    {
        title: "Option Chain",
        icon: <Home />,
        link: "/optionchain"
    },
    {
        title: "Market News",
        icon: <Home />,
        link: "/marketnews"
    },
    {
        title: "Notifications",
        icon: <Notifications />,
        link: "/notifications"
    },
    {
        title: "About Us",
        icon: <Info />,
        link: "/aboutus"
    },
    {
        title: "Settings",
        icon: <Settings />,
        link: "/settings"
    }
]