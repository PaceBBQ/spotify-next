import Header from './Header';

const Layout = ({ children }) => (
  <div>
    <Header />
    <div className="container">
      <div className="col-md-12 mt-5">
        {children}
      </div>
    </div>
  </div>
);

export default Layout;