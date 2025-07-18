
import{Routes,Route} from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import './shop.styles.scss';
import Category from '../category/category.componenet';


const Shop=()=>{
  
    return(
       <Routes>
        <Route index element={<CategoriesPreview/>}/>
          <Route  path= ":category"  element={<Category/>}/>
       </Routes>
     
    );
};
export default Shop;