import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Image} from "../../network/images";
import { UPDATE_CART_ITEM, DELETE_CART_ITEM } from '../../network/cart';
import { ROUTE_CHECKOUT } from '../../routes/routes';

export default class CartModal extends Component{
    state = {
        cartItems:[]
    };

    componentDidMount(){
        let {cartItems} = this.props;
        cartItems = cartItems || [];
        this.setState({cartItems});
    }

    componentWillReceiveProps({cartItems}){
        cartItems = cartItems || [];
        this.setState({cartItems});
    }

    updateCartItem = (quantity, item_id, i, prev)=>{
        UPDATE_CART_ITEM({item_id}, {quantity}, (err, res)=>{
            if(err){
                this.changeInputValue(prev, i);
                alert("Unable to update item. check connection");
                return;
            }
            
        });
    };


    deleteCartItem = (item_id)=>{
        DELETE_CART_ITEM({item_id}, {}, (err, res)=>{
            if(err){
                alert("Unable to delete item. check connection");
                return;
            }
            let {cartItems} = this.state;
            let cartItems2 = [];
            
            cartItems.forEach((cartItem, i)=>{
                if(cartItem.item_id != item_id)
                    cartItems2.push(cartItem);
            });

            this.setState({
                cartItems: cartItems2
            });
        });
    };

    changeInputValue = (e, i)=>{
        let val;
        if(typeof e !== 'number'){
            e.preventDefault();
            val = e.target.value;
        }else{
            val = e;
        }
        val = parseInt(val);
        if(isNaN(val)) val = 0;
        
        let cartItems =this.state.cartItems;
        let cartItem  = cartItems[i];
        this.updateCartItem(val, cartItem.item_id, i, cartItem.quantity);
        cartItem.quantity = val;
        cartItem.newId = Math.random();
        cartItems[i] = cartItem;
        this.setState({cartItems});

    };

    incrementQuantity = (e, i)=>{
        e.preventDefault();
        let cartItems =this.state.cartItems;
        let cartItem  = cartItems[i];
        
        this.updateCartItem((cartItem.quantity+1), cartItem.item_id, i, cartItem.quantity);
        ++cartItem.quantity;
        cartItem.newId = Math.random();
        cartItems[i] = cartItem;
        if(cartItem.quantity > 1)
            this.setState({cartItems});
    }

    decrementQuantity = (e, i)=>{
        e.preventDefault();
        let cartItems =this.state.cartItems;
        let cartItem  = cartItems[i];
        if(cartItem.quantity > 1){
            this.updateCartItem((cartItem.quantity-1), cartItem.item_id, i, cartItem.quantity);
            --cartItem.quantity;
        }
        cartItem.newId = Math.random();
        cartItems[i] = cartItem;
        this.setState({cartItems});
    }

    renderEachCartItem = (item, i)=>{
        console.log(item);
        return (
            <tr key={"Items"+item.item_id+(item.newId || '')}>
                <td>
                    <img className="img-tmb" src={Image(item.image)} />
                </td>
                <td>
                    <div className="it-sdm2-f">
                        <div className="e-its">{item.name}</div>
                        {/* <div className="e-its2">Men BK3569</div> */}
                        <div className="e-its3 pointer" onClick={()=>this.deleteCartItem(item.item_id)}><i className="fa fa-close font font-weight-light font-pink"></i> remove</div>
                    </div>
                </td>
                <td className="vertical-middle">
                    <div className="it-sdm2-f">
                    {
                        item.attributes.split(' ').map((attr, i)=>{
                            return (
                                <div className="e-its2 text-center" key={i+attr}>{attr}</div>
                            );
                        })
                    }
                    </div>
                </td>
                <td className="vertical-middle">
                    <div className="it-sdm2-fx">
                        <div className="e-its pointer" onClick={(e)=>this.decrementQuantity(e, i)}><i className="fa fa-minus"></i></div>
                        <div className="e-its2"><input onInput={(e)=>this.changeInputValue(e, i)} defaultValue={item.quantity} /></div>
                        <div className="e-its pointer" onClick={(e)=>this.incrementQuantity(e, i)}><i className="fa fa-plus"></i></div>
                    </div>
                </td>
                <td className="vertical-middle">
                    <div className="bt40s">£3.99</div>
                </td>
            </tr>
        );
    };

    renderCartItems = ()=>{
        return (
            <div className="table-responsive">
                <table className="table table-borderless tbl-md-hg7">
                    <thead>
                    <tr>
                        <td>Item</td>
                        <td></td>
                        <td>Size</td>
                        <td>Quantity</td>
                        <td>Price</td>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.cartItems.map((item, i)=>{
                        return this.renderEachCartItem(item, i);
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
    
    render(){
        return (
            <div className="modal" id="myModal">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">

                        <div className="modal-header">
                            <h4 className="modal-title">{this.state.cartItems.length} Items in your cart</h4>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                        </div>

                        <div className="modal-body">
                            {this.renderCartItems()}
                        </div>

                        <div className="modal-footer flex-space-btw">
                            <button type="button" className="btn btn-danger btn-gr btn-white no-border" data-dismiss="modal">Back to shop</button>
                            <Link to={ROUTE_CHECKOUT} disabled={this.state.cartItems.length === 0} type="button" className="btn btn-danger btn-gr btn-pink-red">Checkout</Link>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}