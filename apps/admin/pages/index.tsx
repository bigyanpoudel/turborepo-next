import { Login } from "../components/molecules";
import PrivateRoute from "../utils/withPrivateRoute";
const Index = () => {
  return (
    <div>
      <Login />
    </div>
  );
};

export default PrivateRoute(Index);
