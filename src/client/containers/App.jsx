import * as React from 'react';
import { useRouter } from 'next/router'
import { extendTheme, styled } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/nextjs';

import Navigation from '../components/Navigation.jsx';

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

import Incomes from './Pages/Incomes/Incomes';
import Payments from './Pages/Payments/Payments';
import Royalties from './Pages/Royalties/Royalties';
import Reports from './Pages/Reports/Reports';


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
        
      case '/incomes':
        obj = { page: <Incomes /> };
        break;

      case '/payments':
        obj = { page: <Payments /> };
        break;
      
      /* case '/royalties':
        obj = { page: <Royalties /> };
        break; */

      /* case '/reports':
        obj = { page: <Reports /> };
        break; */
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
      navigation={Navigation(session?.user?.role)}
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
