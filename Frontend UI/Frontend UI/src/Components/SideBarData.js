import React from 'react';
import { Dashboard } from '@material-ui/icons';
import { Notifications } from '@material-ui/icons';
import { Info } from '@material-ui/icons';
import ArticleIcon from '@mui/icons-material/Article';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';

export const SideBarData = [
    {
        title: "Dashboard",
        icon: <Dashboard />,
        link: "/"
    },
    {
        title: "Option Chain",
        icon: <RequestQuoteIcon />,
        link: "/optionchain"
    },
    {
        title: "Market News",
        icon: <ArticleIcon />,
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
    }
]