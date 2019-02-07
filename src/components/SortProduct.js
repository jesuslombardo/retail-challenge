import React from 'react';
import ProductList from './ProductList';
import { connect } from 'react-redux';
import { fetchProducts, getLowerProducts, getHighestProducts } from '../actions';

class SortProduct extends React.Component {

    componentDidMount(){
        this.props.fetchProducts();
    }  

    nextPage = () => {
        this.setState({'currentPage' : this.state.currentPage + 1});
    }

    previousPage = () => {
        this.setState({'currentPage' : this.state.currentPage - 1});
    }

    

    

    showNavigationButtons = (fragmentedProducts) => {
        //console.log(fragmentedProducts)
        const pages = fragmentedProducts.length - 1 ; //resto la página actual
        
        let buttons = [];

        if(pages > this.state.currentPage){
            buttons = [...buttons, <button onClick={this.nextPage} key="next">Next</button>];
        }
        
        if(pages <= this.state.currentPage){
            buttons =  [...buttons, <button onClick={this.previousPage} key="previous">Previous</button>];
        }

        return (
            <div>
                {buttons}
            </div>
        );
    }
    
    render(){

        if(Object.keys(this.props.products).length === 0){
            console.log("Loading products..");
            return null;
        }

        const currentPage = 0;
        const pageProducts = this.props.products.paginatedProducts[currentPage]
        
        
        return(
            <div>
                <hr/>
                    {/*this.showNavigationButtons(fragmentedProducts)*/}
                    <button onClick={this.props.fetchProducts}>Recientes</button>
                    <button onClick={this.props.getLowerProducts}>>Lowest Price</button>
                    <button onClick={this.props.getHighestProducts}>>Highest Price</button>
                    <ProductList products={pageProducts} currentPage={0} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        products : state.products
    };
}

export default connect(
    mapStateToProps,
    { 
        fetchProducts : fetchProducts,
        getLowerProducts: getLowerProducts,
        getHighestProducts: getHighestProducts,
    }
    )(SortProduct);