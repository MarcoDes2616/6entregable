import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
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
    const [quanty, setQuanty] = useState(1)
    const [imgSelected, setImgSelected] = useState({})

    useEffect(() => {
        dispatch(setLoading(true))
        axios.get(`https://e-commerce-api-v2.academlo.tech/api/v1/products/${id}`)
            .then((res) => {
                setProductSelected(res.data);
                dispatch(filterCategoryThunk(res.data.categoryId))
            })
            .finally(() => dispatch(setLoading(false)))
    }, [id])

    const getImg = () => {
        if(imgSelected.url){
            // setImg(productSelected.images.indexOf(imgSelected))
            return imgSelected.url
        } else {
            return productSelected.images?.[img].url
        }
    }
    
    return (
        <div className='produc_detail'>
            <h2>{productSelected.title}</h2>
            <div className='details'>
                <div className='details__img'>
                    {img > 0 &&
                        <i className='bx bxs-left-arrow-circle bx-lg' onClick={() => setImg(img - 1)}></i>}
                    {img < productSelected.images?.length - 1 &&
                        <i className='bx bxs-right-arrow-circle bx-lg' onClick={() => setImg(img + 1)}></i>}
                    <img className='img_selected' src={getImg()} alt="" />
                    <div className='preview'>
                        {productSelected.images?.map(image => (
                            <div className='img_preview'
                                style={{ borderColor: productSelected.images[img] === image ? "salmon" : "white" }}
                                key={image.id} onClick={() => setImgSelected(image)}>
                                <img src={image?.url} alt="" />
                            </div>
                        ))
                        }
                    </div>
                </div>
                <div className='description'>
                    <h4>{productSelected.brand}</h4>
                    <p>{productSelected.description}</p>
                    <div className='quanty_price'>
                        <div className='price'>
                            <p>Precio</p>
                            <h5>{productSelected.price}</h5>
                        </div>
                        <div className='quanty'>
                            <p>Cantidad</p>
                            <div className='quanty_controler'>
                                <Button disabled={quanty < 2} variant="success" onClick={() => setQuanty(quanty - 1)}>-</Button>
                                <p>{quanty}</p>
                                <Button variant="success" onClick={() => setQuanty(quanty + 1)}>+</Button>
                            </div>
                        </div>
                    </div>
                    <Button variant="primary">Agregar al Carrito</Button>
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