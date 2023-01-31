import axios from 'axios';
import React, { useEffect } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { filterCategoryThunk } from '../store/slices/products.slice';

const ProductCard = ({ product }) => {
    const navigate = useNavigate();
    
    return (
        <Card className='card' style={{backgroundColor: "white", width: '16rem', height: '21rem' }} onClick={() => navigate(`/products/${product.id}`)} >
            <Card.Img style={{ width: '90%' }} className='img_card' variant="top" src={product.images?.[0].url} />
            <Card.Body>
                <Card.Title style={{fontSize: "1.1rem"}}>{product.title.slice(0, 49)}</Card.Title>
                <Card.Text>
                    {product.price}
                </Card.Text>
                <Button variant="primary">Go somewhere</Button>
            </Card.Body>
        </Card>
    );
};

export default ProductCard;