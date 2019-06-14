import {CardElement, injectStripe, Elements, StripeProvider} from 'react-stripe-elements';
import React, {Component} from 'react';
import { stripeKey } from '../helpers';
/*global Stripe*/

class StripePay extends Component{

    componentDidMount(){
        let stripe = Stripe(stripeKey());
        let elements = stripe.elements();

        // Custom styling can be passed to options when creating an Element.
        // (Note that this demo uses a wider set of styles than the guide below.)
        let style = {
          base: {
            color: '#32325d',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
              color: '#aab7c4'
            }
          },
          invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
          }
        };
        
        // Create an instance of the card Element.
        let card = elements.create('card', {style: style});
        
        // Add an instance of the card Element into the `card-element` <div>.
        card.mount('#card-element');
        
        // Handle real-time validation errors from the card Element.
        card.addEventListener('change', function(event) {
          let displayError = document.getElementById('card-errors');
          if (event.error) {
            displayError.textContent = event.error.message;
          } else {
            displayError.textContent = '';
          }
        });
        
        // Handle form submission.
        let that = this;
        let form = document.getElementById('payment-form');
        form.addEventListener('submit', function(event) {
          event.preventDefault();
        
          stripe.createToken(card).then(function(result) {
            if (result.error) {
              // Inform the user if there was an error.
              let errorElement = document.getElementById('card-errors');
              errorElement.textContent = result.error.message;
            } else {
              // Send the token to your server.
              that.stripeTokenHandler(result.token);
            }
          });
        });
    }

    stripeTokenHandler = (token) => {
        this.props.onSuccess(token);
    }

    render(){
        return (
            <div className="card card-01 bd-side-bottom">
                <div className="card-body no-border product-ples">
                    <div className="checkout-xp">
                        <div className="steps-dp">
                            <div className="str-line">
                                <div className="ln active"></div>
                                <div className="ln active"></div>
                                <div className="ln"></div>
                            </div>
                            <div className="str-circ">
                                <div className="ln"></div>
                                <div className="ln"></div>
                                <div className="ln"></div>
                                <div className="ln"></div>
                            </div>
                            <div className="str-label">
                                <div className="ln active">Delivery</div>
                                <div className="ln">Confirmation</div>
                                <div className="ln">Payment</div>
                                <div className="ln">Finish</div>
                            </div>
                        </div>
                        <div className="space-average-h"></div>
                        <div className="space-average-h"></div>
                        <div className="form-gl">
                            <form action="/charge" method="post" id="payment-form">
                                <div className="form-row">
                                    <label>
                                    Credit or debit card
                                    </label>
                                    <div id="card-element">
                                    </div>

                                    <div id="card-errors" className="alert alert-danger" role="alert"></div>
                                </div>

                                <button type="submit" className="btn btn-danger btn-gr btn-pink-red">Submit Payment</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="card-footer">
                    <div className="flex flex-space-btw padding-cs-43">
                    </div>
                </div>
            </div>
        );
    }
}

export default StripePay;