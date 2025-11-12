import Header from './Header';
import { Outlet } from 'react-router';

export default function Layout(){
    return(
        <div className="App">
            <Header />
            <Outlet />
            <footer>
                <p>Designed By Zainab Dar</p>
            </footer>
        </div>
    );
}