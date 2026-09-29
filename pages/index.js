import Layout from '../components/Layout';
import Link from 'next/link';

const Index = () => (
  <Layout>
    <div className="row mt-5 justify-content-center">
      <h1>Welcome to NEXTIFY!</h1>
    </div>
    <div className="row mt-5 justify-content-center">
      <div className="col-md-4 text-center">
        <img 
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_Green.png" 
          className="img-fluid" 
          alt="Spotify Logo"
          width="300" 
          height="224" 
        />
      </div>
      <div className="col-md-4 text-center">
        <img 
          src="https://cdn.worldvectorlogo.com/logos/next-js.svg" 
          className="img-fluid" 
          alt="Next.js Logo"
          width="300" 
          height="224" 
        />
      </div>
      <div className="col-md-4 text-center">
        <img 
          src="https://reactjs.org/logo-og.png" 
          className="img-fluid" 
          alt="React Logo"
          width="300" 
          height="224" 
        />
      </div>
    </div>
    <div className="row mt-5 justify-content-center">
      <h3 className="text-center">Built with the Spotify Web API, React, and Next.js for server-side rendering!</h3>
    </div>
    <div className="row mt-5 justify-content-center">
      <Link href="/spotify" className="btn btn-success btn-lg">
        Enter
      </Link>
    </div>
  </Layout>
);

export default Index;