import * as React from 'react';
import { useRouter } from 'next/router'
import { extendTheme, styled } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import DescriptionIcon from '@mui/icons-material/Description';
import LayersIcon from '@mui/icons-material/Layers';
// import { AppProvider } from '@toolpad/core/AppProvider';
import { AppProvider } from '@toolpad/core/nextjs';

import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import Grid from '@mui/material/Grid2';
import Button from '@mui/material/Button';

// pages
import Dashboard from './Pages/Dashboard';
import Users from './Pages/Users/Users';
import Orders from './Pages/Orders';



const NAVIGATION = [
  {
    kind: 'header',
    title: 'Справочник',
  },
  {
    segment: 'dashboard',
    title: 'Dashboard',
    icon: <DashboardIcon />,
  },
  {
    segment: 'users',
    title: 'Users',
    icon: <ShoppingCartIcon />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
  /* {
    kind: 'divider',
  },
  {
    kind: 'header',
    title: 'Расчеты',
  },
  {
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
  },
  {
    segment: 'integrations',
    title: 'Integrations',
    icon: <LayersIcon />,
  },
  {
    segment: 'page-2',
    title: 'Page 2',
    icon: <LayersIcon />,
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
  const demoRouter = useDemoRouter('/dashboard');
  
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
      case '/dashboard':
        obj = { page: <Dashboard /> };
        break;
      case '/users':
        obj = { page: <Users /> };
        break;
      case '/users':
        obj = { page: <UserId /> };
        break;
      case '/orders':
        obj = { page: <Orders /> };
        break;
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
