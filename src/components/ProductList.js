import React from 'react';

const ProductList = (props) => {
    
    const renderList = () => { 
        return props.products.map(product => {
            return(
                <li key={product._id} style={{'border' : '2px solid red', 'display':'inline-block', 'width' : '20%'}}>
                    <h3>{product.name}</h3>
                    <p>{product.cost} | {product.category}</p>
                    <img src={product.img.url} alt={product.name} />
                    {props.user.points >= product.cost ? <button onClick={() => {props.redeem(product)}}>Redeem</button> : `Te Faltan ${product.cost - props.user.points} Monedas`}
                </li>
            );
        });
    }

    return (
        <div>
            <h2>Products:</h2>
            <ul>
                {renderList()}
            </ul>

        </div>
    );
}

export default ProductList;