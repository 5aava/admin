import { useState, useEffect } from 'react'
import privateFetcher from '../modules/privateFetcher';
import Loader from '../components/Loader';
import Drawer from './Drawer';
 

export default function App(props) {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    const url = props.api;
    privateFetcher(url, {})
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <Loader open={true} />
  if (!data) return <>Not data</>


  return (
    <>
      <Loader open={false} />
      {/* <Header /> */}
      <Drawer />
      {/* <Footer /> */}

                  {/* <Button
              variant="contained"
              color="primary"
              onClick={() => demoRouter.navigate('/dashboard')} 
            >
              dashboard
            </Button> */}
    </>
  );
}
