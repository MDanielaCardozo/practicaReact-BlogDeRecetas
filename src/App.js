import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/common/Footer";
import Menu from "./components/common/Menu";
import DetalleReceta from "./components/views/DetalleReceta";
import Error404 from "./components/views/Error404";
import Home from "./components/views/Home";
import AdministrarRecetas from "./components/views/receta/AdministrarRecetas";
import CrearReceta from "./components/views/receta/CrearReceta";
import EditarReceta from "./components/views/receta/EditarReceta";
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/views/Home.css'

function App() {
  return (
    <div>
      <BrowserRouter>
          <Menu></Menu>
          <Routes>
            <Route exact path='/' element={<Home></Home>}></Route>
            <Route exact path='/administrar' element={<AdministrarRecetas></AdministrarRecetas>}></Route>
            <Route exact path='/administrar/receta/crear' element={<CrearReceta></CrearReceta>}></Route>
            <Route exact path='/administrar/receta/editar/:id' element={<EditarReceta></EditarReceta>}></Route>
            <Route exact path='/administrar/receta/detalle/:id' element={<DetalleReceta></DetalleReceta>}></Route>
            <Route path="*" element={<Error404></Error404>}></Route>
          </Routes>
          <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
