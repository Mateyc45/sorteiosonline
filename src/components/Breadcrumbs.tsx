import { Link, useLocation } from 'react-router-dom';

function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

    if (location.pathname === '/') {
        return null;
    }

    return (
        <div className="breadcrumbs-container">
            <nav className="text-sm color-gray-500">
            <Link to="/">Início</Link>
            {pathnames.map((value, index) => {
                const to = `/${pathnames.slice(0, index + 1).join('/')}`;
                const isLast = index === pathnames.length - 1;
                return isLast ? (
                <span key={to}> / {decodeURIComponent(value)}</span>
                ) : (
                <span key={to}>
                    {' / '}
                    <Link to={to}>{decodeURIComponent(value)}</Link>
                </span>
                );
            })}
            </nav>
        </div>
    );
    }

export default Breadcrumbs;