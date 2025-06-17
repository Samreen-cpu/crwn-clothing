import './category.styles.scss';
import { useParams } from 'react-router-dom';
import { Fragment, useContext,useEffect,useState } from 'react';
import { CategoriesContext } from '../../context/categories.context';
import Productcard from '../../components/product-card/product-card.component';
const Category=()=>{
     const {category}=useParams();
     const {categoriesMap}= useContext(CategoriesContext);
     const [products,setproducts]=useState(categoriesMap[category]);

     useEffect(()=>{
        setproducts(categoriesMap[category]);
     },[category,categoriesMap])

     return(
        <Fragment>
              <h2 className='category-title'>{category.toUpperCase()}</h2>
              <div className='category-container'>
            {products &&
                products.map((product)=>(
                <Productcard key={product.id} product={product}/>)
            )}
        </div>

        </Fragment>
     
     );
};

export default Category;