import Head from 'next/head';
import Link from 'next/link';

const Header = () => (
  <div>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
      <title>Nextify - Spotify Client</title>
    </Head>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand">
          NEXTIFY
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/spotify" className="nav-link">
                Spotify
              </Link>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link" 
                href="https://nextjs.org/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                NextJS
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
);

export default Header;