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
      name: 'Bộ sưu tập lót ly Naruto Shippuden Shinobi Bonds (Kỉ niệm 20 năm ra mắt)',
      image:
        'https://res.cloudinary.com/dgkcaez4q/image/upload/v1705914934/fam_store/bidlmdxm82xpwqiavw2g.jpg',
      image_public_id: 'fam_store/bidlmdxm82xpwqiavw2g',
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
