import React, { useContext, useEffect } from 'react';
import { ShopContext } from '../Context/ShopContext';
import { useParams } from 'react-router-dom';
import Breadcrum from '../Components/Breadcrum/Breadcrum';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay';
import DescriptionBox from '../Components/DescriptionBox/DescriptionBox';
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts';

function Product(props) {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();
  const product = all_product.find((e) => e.id === Number(productId)) || {};

  // Prevent browser reload can't get product -> set a random product
  if (!product || Object.keys(product).length === 0) {
    Object.assign(product, {
      id: 5,
      name: '',
      image: '',
      image_public_id: '',
      category: 'naruto',
      new_price: 69000,
      old_price: 79000,
    });
  }

  return (
    <div className="product">
      <Breadcrum product={product} />
      <ProductDisplay product={product} />
      <DescriptionBox product={product} />
      <RelatedProducts product={product} />
    </div>
  );
}

export default Product;
