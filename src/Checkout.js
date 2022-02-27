import React, { useState, useEffect } from 'react'
import styles from './Checkout.module.css';
import { LoadingIcon } from './Icons';
import { getProducts } from './dataService';

// You are provided with an incomplete <Checkout /> component.
// You are not allowed to add any additional HTML elements.
// You are not allowed to use refs.

// Once the <Checkout /> component is mounted, load the products using the getProducts function. Done
// Once all the data is successfully loaded, hide the loading icon. Done
// Render each product object as a <Product/> component, passing in the necessary props. Done
// Implement the following functionality:
//  - The add and remove buttons should adjust the ordered quantity of each product
//  - The add and remove buttons should be enabled/disabled to ensure that the ordered quantity can’t be negative and can’t exceed the available count for that product.
//  - The total shown for each product should be calculated based on the ordered quantity and the price
//  - The total in the order summary should be calculated
//  - For orders over $1000, apply a 10% discount to the order. Display the discount text only if a discount has been applied.
//  - The total should reflect any discount that has been applied
//  - All dollar amounts should be displayed to 2 decimal places
// You can view how the completed functionality should look at: https://drive.google.com/file/d/1o2Rz5HBOPOEp9DlvE9FWnLJoW9KUp5-C/view?usp=sharing



const Product = () => {
  const [plus, setPlus] = useState(0)
  const [mul, setMul] = useState(0)
  // const []
  const [loading, setLoading] = useState(false)
  const [product, setProduct] = useState([])


  useEffect(() => {
    getProducts().then((response) => {
      setLoading(true)
      setProduct(response)
    }, (err) => {
      setLoading(true)
      console.log(err)
    }
    )
  }, [])

  if (!loading) {
    return (
      <div>
        <LoadingIcon />
      </div>
    )
  } else {
    return (
      <>
        {
          product.map(data => {
            const { id, name, availableCount, price, orderedQuantity, total } = data;

            return (
              <tr key={id}>
                <td >{id}</td>
                <td>{name}</td>
                <td>{availableCount}</td>
                <td>${price}</td>
                <td>{orderedQuantity} {plus}</td>
                <td>${total} {mul}</td>
                <td>
                  <button className={styles.actionButton} onClick={() => setPlus(plus + 1) * setMul(mul)}>+</button>
                  <button className={styles.actionButton} onClick={() => {}}>-</button>
                </td>
              </tr>
            )
          })
        }
      </>
    )
  }
}


const Checkout = () => {

  return (
    <div>
      <header className={styles.header}>
        <h1>Electro World</h1>
      </header>

      <main>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Product ID</th>
              <th>Product Name</th>
              <th># Available</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* Products should be rendered here */}
            <Product />
          </tbody>
        </table>
        <h2>Order summary</h2>
        <p>Discount: $ </p>
        <p>Total: $ </p>
      </main>
    </div>
  );
};

export default Checkout;