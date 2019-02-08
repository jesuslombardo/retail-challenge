import React from 'react';
import ProductList from './ProductList';
import { connect } from 'react-redux';
import { fetchProducts, getLowerProducts, getHighestProducts, nextPage, prevPage, setRedeem } from '../actions';

class SortProduct extends React.Component {

    componentDidMount(){
        this.props.fetchProducts(this.props.perPage);
    }  

    renderNavigationButtons(){
        const buttons = [];
        
        if(this.props.products.currentPage > 0){
            buttons.push(<button key="b" onClick={this.props.prevPage}>>Prev Page</button>);
        }

        if(this.props.products.numPages > this.props.products.currentPage + 1){
            buttons.push(<button key="a" onClick={this.props.nextPage}>>Next Page</button>);
        }

        return(
            <div>
                {buttons}
            </div>
        );
    }

    redeem = (product) => {
        this.props.setRedeem(product);
    }

    render(){
        if(Object.keys(this.props.products).length === 0){
            return null;
        }

        const pageProducts = this.props.products.paginatedProducts[this.props.products.currentPage]

        return(
            <div>
                <hr/>
                    <button onClick={() => {this.props.fetchProducts(this.props.perPage)}}>Recientes</button>
                    <button onClick={this.props.getLowerProducts}>>Lowest Price</button>
                    <button onClick={this.props.getHighestProducts}>>Highest Price</button>
                    {this.renderNavigationButtons()}
                    <ProductList products={pageProducts} redeem={this.redeem} user={this.props.user}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        products : state.products,
        user : state.user
    };
}

export default connect(
    mapStateToProps,
    { 
        fetchProducts : fetchProducts,
        getLowerProducts: getLowerProducts,
        getHighestProducts: getHighestProducts,
        nextPage : nextPage,
        prevPage: prevPage,
        setRedeem: setRedeem
    }
    )(SortProduct);