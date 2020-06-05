import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from './Layout';
import { getCart } from "./cartHelpers";
import Card from './Card';
import Checkout from './Checkout';

const Cart = () => {
    const [items, setItems] = useState([]);
    const [run, setRun] = useState(false);

    useEffect(() => {
        setItems(getCart());
    }, [run]);

    const showItems = items => {
        return (
            <div>
                <h3 className="mainText font-weight-bold text-center">YOU CART HAS {`${items.length}`} ITEMS</h3>
                <hr />
                {items.map((product, i) => (
                    <Card
                        key={i}
                        product={product}
                        showAddToCartButton={false}
                        cartUpdate={true}
                        showRemoveProductButton={true}
                        setRun={setRun}
                        run={run}
                    />
                ))}
            </div>
        );
    };

    const noItemsMessage = () => (
        <h2>
            Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link>
        </h2>
    );

    return (
        <Layout
            title="Shopping Cart"
            description="Manage your cart items. Add remove checkout or continue shopping."
            className="container"
        >
            <div className="row">
                <div className="col-6">{items.length > 0 ? showItems(items) : noItemsMessage()}</div>

                <div className="col-6">
                    <h3 className="mb-3 mainText font-weight-bold text-center">YOUR CART</h3>
                    <hr />
                    <Checkout products={items}  />
                    {/* setRun={setRun} run={run}  */}
                </div>
            </div>
        </Layout>
    );
};

export default Cart;