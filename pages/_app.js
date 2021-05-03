import "../styles/globals.css";
import Layout from "../components/layout/layout";

import store from "../store/index";
import { Provider } from "react-redux";
import {Provider as NextProvider} from 'next-auth/client'

function MyApp({ Component, pageProps }) {
  
  return (
    
    <NextProvider session={pageProps.session}>
    <Provider store={store}>
      {" "}
      <Layout>
        {" "}
        <Component {...pageProps} />{" "}
      </Layout>{" "}
    </Provider>
    </NextProvider>
  );
}



export default MyApp;
