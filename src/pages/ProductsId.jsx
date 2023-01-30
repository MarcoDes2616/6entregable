import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { setLoading } from '../store/slices/loading.slice';
import { filterCategoryThunk } from '../store/slices/products.slice';


const ProductsId = () => {
    const { id } = useParams();
    const [productSelected, setProductSelected] = useState({})
    const loading = useSelector(state => state.loading)
    const dispatch = useDispatch();
    const productsSuggestions = useSelector(state => state.products)
    const navigate = useNavigate();
    const [img, setImg] = useState(0)

    console.log(productSelected);
    useEffect(() => {
        dispatch(setLoading(true))
        axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
            .then((res) => {
                setProductSelected(res.data);
                dispatch(filterCategoryThunk(res.data.categoryId))
            })
            .finally(() => dispatch(setLoading(false)))
    }, [id])

    return (
        <div className='produc_detail'>
            <h2>{productSelected.title}</h2>
            <div className='details'>
                <div className='details__img'>
                    {img > 0 &&
                        <i className='bx bxs-left-arrow-circle bx-lg' onClick={() => setImg(img - 1)}></i>}
                    {img < productSelected.images?.length - 1 &&
                        <i className='bx bxs-right-arrow-circle bx-lg' onClick={() => setImg(img + 1)}></i>}
                    <img className='img_selected' src={productSelected.images?.[img].url} alt="" />
                    <div className='preview'>
                        {productSelected.images?.map( image => (
                            <img src={image?.url} alt="" key={image.id}/>
                        ))
                        }
                    </div>
                </div>
                <div className='description'>
                    <h4>{productSelected.brand}</h4>
                    <p>{productSelected.description}</p>
                </div>
            </div>
            <div className='product_sugestions'>
                <h2>Tambien te puede interesar:</h2>
                {productsSuggestions.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default ProductsId;