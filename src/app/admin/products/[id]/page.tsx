'use client'
import { Product } from '../../../types/product';
import React, { useEffect,useState } from 'react'
import { useParams } from 'next/navigation'
import { getProduct } from '@/app/services/productService'

export default function products(){
    const params = useParams()
    const product_id = Number(params.id)
    const [productData,setProduct] = useState<Product | null>(null)
    useEffect(()=>{
        const loadProduct = async () =>{
            const productData = await getProduct(product_id);
            setProduct(productData);
        }
        loadProduct()
    },[product_id]);

    return (
        <ul>
            {<>
                <h1>{productData?.id}</h1>
                <h1>{productData?.title}</h1>
                <h1>{productData?.image}</h1>
            </>
                
            }

        </ul>
    );
}

