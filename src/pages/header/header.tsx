import { Link } from 'react-router-dom';
import './header.scss'

function Header() {





    return (
        <header className={'header-container'}>

            <h1>Portal</h1>


            <nav>
                <Link to='/home'>Home</Link> |
                <Link to='/dashboard'>Dashboard</Link> |
                <Link to='/upload'>Upload</Link>
            </nav>
        </header>)
}

export default Header;
