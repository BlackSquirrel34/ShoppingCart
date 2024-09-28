import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';


// const dispatch = useDispatch();
// Todo: integrate Redux
// Dispatch the updateQuantity action to update the quantity of the cart item.
//dispatch(updateQuantity());
// Dispatch the addItem action to add the item from the cart.
//dispatch(addItem());
// Dispatch the removeItem action to remove the item from the cart.
//dispatch(removeItem());


const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
      let total = 0; // Use 'let' to allow reassignment
  // You can iterate through the item array, 
  // find the quantity of each item using the item.quantity property 
        cart.forEach(item => {
    const quantity = item.quantity; 
    const sum = quantity * parseFloat(item.cost.replace('$', '')); // Convert to float
    total += sum; 
  });
  return total; 
  };


  const handleContinueShopping = (e) => {
    // Users should be able to return to the plant listing page to continue shopping while 
    // on the shopping cart page. So, in the handleContinueShopping() function call the function 
    // passed from the parent component.
    onContinueShopping(e);
  };



  const handleIncrement = (item) => {
    // you need to dispatch the updateQuantity() reducer in the CartSlice.jsx file.
    //  In the function argument, add one to the item.quantity value
    const newQuantity = item.quantity + 1; // Add 1 to the current quantity
    dispatch(updateQuantity({ name: item.name, quantity: newQuantity })); // Dispatch the update 
  };

  const handleDecrement = (item) => {
    // dispatch the updateQuantity() reducer in the CartSlice.jsx file. 
    // In the function argument, subtract one from the item.quantity value
    const newQuantity = item.quantity - 1; 
    dispatch(updateQuantity({ name: item.name, quantity: newQuantity }));

    // for the handleDecrement() you will need an if-else to handle the case if 
    // the number of items gets decremented to 0. In that case, you will 
    // need to dispatch the removeItem() method.
      if (newQuantity <= 0) {
      dispatch(removeItem(item));
      }
  };

  const handleRemove = (item) => {
    // you need to dispatch the removeItem() method.
    dispatch(removeItem(item));
  };

  const handleCheckoutShopping = (e) => {
  alert('Functionality to be added for future reference');
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    // Calculate the total cost of the number of plants of a particular type 
    // by multiplying the unit cost of a plant by 
    // the number of that type of plant in the cart.
    const sum = item.quantity * item.cost;
    return sum;
  };


  // Event handlers

  // event handler for incrementing
 // handleIncrement(item)
  // event handler for decrementing
 // handleDecrement(item)


  // When the user changes the number of a plant type in the cart, the following data needs updated: 
  // the cart icon, the number of that plant type, the subtotal, and the total cost.

  // Implement an event handler to remove the item from the cart.
  //handleRemove(item)


  // total quantity counter
  // Maintain a variable dedicated to counting the total number of items added to the cart.
  // Update this variable as the user adds or removes plants from the cart.
  // Display the total quantity on the cart icon in the navbar.
 // calculateTotalAmount()


  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'>Sum: ${calculateTotalAmount()}</div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


