'use client'

import React, { useEffect,useState } from 'react'
import { useParams } from 'next/navigation'
import { getProduct } from '@/app/services/productService'
import UpdateProductForm from '@/app/components/forms/ProductUpdateform';

export default function products(){
    const params = useParams()
    const product_id = Number(params.id)
    const [product,setProduct] = useState<any | null>(null)
    const [loading, setLoading]= useState<boolean>(true)

    useEffect(()=>{
        const loadProduct = async () =>{
            try{
                const productData = await getProduct(product_id);
                setProduct(productData);
            }catch (err:any){
                console.error(err.message)
            }finally{
                setLoading(false);
            }
            
        }
        loadProduct()
    },[product_id]);
    console.log(product)
    if (loading) return <p>Loading...</p>;
    if (!product) return <p>Product not found</p>;

    return (
        <div>
            <UpdateProductForm initialProduct={product}/>
        </div>
    );
}