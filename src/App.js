import Navbar from "./User/Navbar/Navbar";
import "./App.css";
import SRoutes from "./Book/SRoutes";

import HomePage from "./Home/HomePage";

const App=()=>

{
  return(<>
    <div className='app'>
  <Navbar/>
 
  <SRoutes/>
  </div>
  </>)
  
  

}
export default App;