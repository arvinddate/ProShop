import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Card, Col, Form, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import Rating from '../Components/Rating';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import { addToCart } from '../slices/cartSlice';
import { useDispatch } from 'react-redux';
const ProductScreen = () => {
    //const [product,setProduct]=useState({});
    const { id: productId } = useParams();
    const [qty , setQty] =useState(1);
    const dispatch =useDispatch();
    const navigate =useNavigate();

    
    // useEffect(()=>{
    //     const fetchProduct= async()=>{
    //         const {data}=await axios.get(`/api/products/${productId}`);
    //         setProduct(data);


    //     }
    //     fetchProduct();

    // },[productId]);
    const {data :product,isLoading ,error}=useGetProductDetailsQuery(productId);

    const addToCartHandler =()=>{
        dispatch(addToCart({...product ,qty}));
        navigate('/cart')
    }
    return (
        <>
            <Link className='btn btn-light my-3' to='/'>Go Back</Link>
           {isLoading ? (<Loader />):error ? (<Message variant='danger'>{error?.data?.message || error.error }</Message>):(
             <Row>
             <Col md={5} >
                 <Image src={product.image} alt={product.image} fluid />
             </Col>
             <Col md={4} >
                 <ListGroup variant='flush' >
                     <ListGroup.Item>
                         <h3>{product.name}</h3>
                     </ListGroup.Item>
                     <ListGroup.Item>
                         <Rating value={product.rating} text={`${product.numReviews} reviews`} />
                     </ListGroup.Item>
                     <ListGroup.Item>
                         <p>Price: &#8377; {product.price}</p>
                     </ListGroup.Item>
                     <ListGroup.Item>
                         Description :{product.description}
                     </ListGroup.Item>
                 </ListGroup>

             </Col>
             <Col md={3} >
                 <Card >
                     <ListGroup variant='flush'>
                         <ListGroup.Item>
                             <Row>
                                 <Col>Price:</Col>
                                 <Col >
                                 <strong> <p>Price: &#8377; {product.price}</p></strong>
                                 </Col>

                             </Row>

                         </ListGroup.Item>
                         <ListGroup.Item>
                             <Row>
                                 <Col>Status:</Col>
                                 <Col >
                                 <strong>{product.countInStock>0 ? "In Stock":"Out of Stock"}</strong>
                                 </Col>

                             </Row>

                         </ListGroup.Item>
                         {product.countInStock  >0 && (
                            <ListGroup.Item>
                                <Col>Qty</Col>
                                <Col>
                                <Form.Control
                                as="select"
                                value={qty}
                                onChange={(e)=>setQty(Number(e.target.value))}
                                >
                                    {[...Array(product.countInStock).keys()].map((x)=>(<option key={x + 1} value={x + 1}> {x + 1}</option>))}
                                    </Form.Control></Col>
                            </ListGroup.Item>
                         ) }
                         <ListGroup.Item>
                             <Button  className='btn-block' type='button' disabled={product.countInStock===0}
                             onClick={ addToCartHandler}
                             >
                                 Add To Cart
                             </Button>
                         </ListGroup.Item>

                     </ListGroup>


                 </Card>

             </Col>

         </Row>
           )}
        </>
    )
}

export default ProductScreen;
