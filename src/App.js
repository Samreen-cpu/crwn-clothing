import { Routes,Route } from "react-router-dom";
import Navigation from "./routers/navigation/navigation.component"
import Home from "./routers/home/home.component";
import Authentication from "./routers/authentication/authentication.component";
const Shop=()=>{
  return <h1>I am the shop section</h1>
}

const App=()=>{
  return(
  <Routes>
    <Route path='/' element={<Navigation/>}>

     <Route index element={<Home/>}/>
     <Route path='shop' element={<Shop/>}/>
      <Route path='auth' element={<Authentication/>}/>
    </Route>
  </Routes>
  );
};
export default App;
