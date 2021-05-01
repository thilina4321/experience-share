import Desktop from "./desktop";
import MainHeader from "./main-header";

const Layout = (props) => {
  return (
    <div>
      <MainHeader />
      <Desktop />
      {props.children}
    </div>
  );
};

export default Layout;
