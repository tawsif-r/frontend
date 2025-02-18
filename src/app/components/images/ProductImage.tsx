import React from 'react';

type ProductImageProps = {
    imageUrl: string;
};

const ProductImage: React.FC<ProductImageProps> = ({ imageUrl }) => {
    return <img src={imageUrl} alt="Product" style={{ width: '50px', height: '50px' }} />;
};

export default ProductImage;