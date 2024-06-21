import {Component} from 'react'
import './index.css'
import CartContext from '../../context/CartContext'

const paymentOptionsList = [
  {
    id: 'CARD',
    displayText: 'Card',
    isDisabled: true,
  },
  {
    id: 'NET BANKING',
    displayText: 'Net Banking',
    isDisabled: true,
  },
  {
    id: 'UPI',
    displayText: 'UPI',
    isDisabled: true,
  },
  {
    id: 'WALLET',
    displayText: 'Wallet',
    isDisabled: true,
  },
  {
    id: 'CASH ON DELIVERY',
    displayText: 'Cash on Delivery',
    isDisabled: false,
  },
]

class Payment extends Component {
  state = {
    paymentMethod: '',
    isOrderPlaced: false,
  }

  updatePaymentMethod = event => {
    this.setState({paymentMethod: event.target.id})
  }

  onPlaceOrder = () => {
    this.setState({isOrderPlaced: true})
  }

  getTotalPrice = cartList =>
    cartList.reduce((acc, item) => acc + item.quantity * item.price, 0)

  renderPaymentMethodsInput = () => (
    <ul className="payment-method-inputs">
      {paymentOptionsList.map(eachMethod => (
        <li key={eachMethod.id} className="payment-method-input-container">
          <input
            className="payment-method-input"
            id={eachMethod.id}
            type="radio"
            name="paymentMethod"
            disabled={eachMethod.isDisabled}
            onChange={this.updatePaymentMethod}
          />
          <label
            className={`payment-method-label ${
              eachMethod.isDisabled ? 'disabled-label' : ''
            }`}
            htmlFor={eachMethod.id}
          >
            {eachMethod.displayText}
          </label>
        </li>
      ))}
    </ul>
  )

  renderPaymentDetails = () => (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        const {paymentMethod} = this.state
        return (
          <>
            <h1 className="payments-heading">Payment Details</h1>
            <p className="payments-sub-heading">Payment Method</p>
            {this.renderPaymentMethodsInput()}
            <div className="order-details">
              <p className="payments-sub-heading">Order details:</p>
              <p>Quantity: {cartList.length}</p>
              <p>Total Price: Rs {this.getTotalPrice(cartList)}/-</p>
            </div>
            <button
              disabled={paymentMethod !== 'CASH ON DELIVERY'}
              type="button"
              className="confirm-order-button"
              onClick={this.onPlaceOrder}
            >
              Confirm Order
            </button>
          </>
        )
      }}
    </CartContext.Consumer>
  )

  render() {
    const {isOrderPlaced} = this.state
    return (
      <div className="payments-container">
        {isOrderPlaced ? (
          <p className="success-message">
            Your order has been placed successfully
          </p>
        ) : (
          this.renderPaymentDetails()
        )}
      </div>
    )
  }
}

export default Payment
