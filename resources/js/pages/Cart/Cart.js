import React from 'react'
import { Button } from 'react-bootstrap'
import Table from "react-bootstrap/Table"
import "./Cart.css"

function Cart({cartItems}) {
  return (
    <div className='container'>
        <h1 className='fw-bold d-inline'>Your cart:{cartItems.length === 0 && <div>No items in card</div> }</h1>

        <hr className="mt-10 mb-5"></hr>

        <div className='row'>
          <div className='col-md-8'>
            <Table striped bordered hover>
                <thead>
                  <tr>
                    <th scope='col' colSpan={1}>Product</th>
                    <th scope='col'></th>
                    <th scope='col'></th>
                    <th scope='col'>Price</th>
                    <th scope='col'>Quantity</th>
                    <th scope='col'>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td colSpan={3}>Book Img</td>
                    
                    <td>$29,99</td>
                    <td>2</td>
                    <td>$59.98</td>
                  </tr>
                 
                </tbody>
            </Table>
          </div>
          <div className='col-md-4'>
            <Table striped bordered hover>
                  <thead className='text-center'>
                    <tr>
                      <th scope='col' >Cart Totals</th>
                      
                    </tr>
                  </thead>
                  <tbody className='text-center'>
                    <tr>
                      <h2>Cart total</h2>
                     <Button className="btn-order">Place Order</Button>
                    </tr>
                  
                  </tbody>
            </Table>
          </div>
        </div>
    </div>
  )
}

export default Cart