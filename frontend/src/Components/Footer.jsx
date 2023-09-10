import React from 'react'
import { Col, Container } from 'react-bootstrap';
const currentYear= new Date().getFullYear;
const Footer = () => {
  return (
    <footer>
        <Container>
            <Col className='text-center py-3'>
                <p>ProShop &copy; {currentYear} </p>
            </Col>

        </Container>
    </footer>

  );
}

export default Footer