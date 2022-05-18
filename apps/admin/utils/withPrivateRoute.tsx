import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "ui";

const PrivateRoute = (AuthComponent: any) => {
  function PrivateComponent({ children }: any) {
    const { authenticated, loading, user, claims } = useContext(AuthContext);
    const Router = useRouter();
    useEffect(() => {
      const { pathname } = Router;
      if (!loading) {
        if (authenticated !== null && !authenticated && !claims?.isAdmin) {
          Router.push("/");
          return;
        }

        if (authenticated && claims?.isAdmin && pathname == "/") {
          Router.push("/dashboard");
        }
      }
    }, [authenticated, loading, user]);

    if (loading) {
      return <div>Loading...</div>;
    }

    return <>{authenticated && <> {children} </>} </>;
  }
  return class Higher extends React.Component {
    render() {
      return (
        <PrivateComponent>
          <AuthComponent {...this.props} />
        </PrivateComponent>
      );
    }
  };
};

export default PrivateRoute;
