import Navbar from '../components/navbar/Navbar';
import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';
import UserProvider from '../providers/UserProvider';

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider enableColorScheme={false}>
      <UserProvider>
        <Navbar />
        <Component {...pageProps} />
      </UserProvider>
    </ThemeProvider>
  );
}

export default MyApp;
