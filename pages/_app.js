import Navbar from '../components/navbar/Navbar';
import '../styles/globals.css';
import { ThemeProvider } from 'next-themes';

function MyApp({ Component, pageProps }) {

  return (
    <ThemeProvider enableColorScheme={false}>
      <Navbar />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
