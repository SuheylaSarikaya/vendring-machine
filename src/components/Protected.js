import { Navigate } from "react-router-dom";
import VendingMachineSupplier from './VendingMachineSupplier';


const Protected = ({ state }) => {
  console.log(state);
  if (!state) {
    return <Navigate to="/loginAdmin" replace />;
  }else{ 
    return <Navigate to="/adminPage" replace />&&<VendingMachineSupplier></VendingMachineSupplier>
  }
};
export default Protected;