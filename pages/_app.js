import { ThemeProvider } from 'next-themes';

import Navbar from '../components/navbar/Navbar';
import UserProvider from '../providers/UserProvider';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider enableSystem={true}>
      <UserProvider>
        <Navbar />
        <Component {...pageProps} />
      </UserProvider>
    </ThemeProvider>
  );
}

export default MyApp;
