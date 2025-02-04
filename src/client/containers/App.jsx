import * as React from 'react';
import { useRouter } from 'next/router'
import { extendTheme, styled } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/nextjs';


import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import ArticleIcon from '@mui/icons-material/Article';
import LayersIcon from '@mui/icons-material/Layers';
import GroupIcon from '@mui/icons-material/Group';
import HeadsetMicIcon from '@mui/icons-material/HeadsetMic';
import AudiotrackIcon from '@mui/icons-material/Audiotrack';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PaymentIcon from '@mui/icons-material/Payment';
import PianoIcon from '@mui/icons-material/Piano';
import PriceChangeIcon from '@mui/icons-material/PriceChange';


import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';

// pages
import Dashboard from './Pages/Dashboard';
import Users from './Pages/Users/Users';
import Contractors from './Pages/Contractors/Contractors';
import Licensors from './Pages/Licensors/Licensors';
import Tracks from './Pages/Tracks/Tracks';
import Contracts from './Pages/Contracts/Contracts';



const NAVIGATION = [
  {
    segment: 'contracts',
    title: 'Договоры',
    icon: <ArticleIcon />,
  },
  {
    kind: 'header',
    title: 'Справочник',
  },

  {
    segment: 'contractors',
    title: 'Исполнителя',
    icon: <HeadsetMicIcon />,
  },
  {
    segment: 'tracks',
    title: 'Треки',
    icon: <AudiotrackIcon />,
  },
  {
    segment: 'licensors',
    title: 'Лицензиары',
    icon: <LocalPoliceIcon />,
  },
  {
    segment: 'incomes',
    title: 'Доходы',
    icon: <MonetizationOnIcon />,
  },
  {
    segment: 'payments',
    title: 'Выплаты',
    icon: <PaymentIcon />,
  },
  
  {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Административные',
  },
  {
    segment: 'users',
    title: 'Пользователи',
    icon: <GroupIcon />,
  },
  {
    segment: 'royalties',
    title: 'Расчёт роялти',
    icon: <PianoIcon />,
  },
  {
    segment: 'reports',
    title: 'Денежный отчет',
    icon: <PriceChangeIcon />,
  },

  /* {
    segment: 'reports',
    title: 'Reports',
    icon: <BarChartIcon />,
    children: [
      {
        segment: 'sales',
        
        title: 'Sales',
        icon: <DescriptionIcon />,
      },
      {
        segment: 'traffic',
        title: 'Traffic',
        icon: <DescriptionIcon />,
      },
    ],
  }, */
];

const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function useDemoRouter(initialPath) {
  const [pathname, setPathname] = React.useState(initialPath);

  const router = React.useMemo(() => {
    return {
      pathname: pathname,
      searchParams: new URLSearchParams(),
      navigate: (path) => setPathname(String(path)),
    };
  }, [pathname]);

  return router;
}


export default function App() {
  const router = useRouter()
  const demoRouter = useDemoRouter('/contracts');
  
  const [session, setSession] = React.useState(null);

  React.useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user'));

    const lsUser = {
      name: localUser.name,
      role: localUser.role,
      email: localUser.email,
      // image: 'https://avatars.githubusercontent.com/u/19550456',
    };

    setSession({ user: lsUser });
  }, [])

  const renderSwitchPages = (param) => {
    let obj = { page: <Dashboard /> };

    switch (param) {
      case '/contracts':
        obj = { page: <Contracts /> };
        break;
      case '/users':
        obj = { page: <Users /> };
        break;
      case '/contractors':
        obj = { page: <Contractors /> };
        break;
      case '/licensors':
        obj = { page: <Licensors /> };
        break;
      case '/tracks':
        obj = { page: <Tracks /> };
        break;
        
        /*
        incomes
        payments
        royalties
        reports
        */
    }

    return obj;
  };


  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession(null);
      },
      signOut: () => {
        setSession(null);
        router.push('/');
      },
    };
  }, []);

  return (
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={NAVIGATION}
      router={demoRouter}
      theme={demoTheme}
      branding={{
        logo: <img src="https://mui.com/static/logo.png" alt="MUI logo" />,
        title: 'RCSG',
      }}
    >
      <DashboardLayout>
        <PageContainer>
          <Grid container spacing={1}>
            {renderSwitchPages(demoRouter.pathname).page}
          </Grid>
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
