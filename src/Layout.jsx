import Header from './Header';
import { Outlet } from 'react-router';

export default function Layout(){
    return(
    <>
        <Header />
        <main>
            <Outlet />

        </main>
        <footer>
            <p>Designed By Zainab Dar</p>
        </footer>
     </>
    );
}