import React from 'react';
import _ from 'lodash';
import ProductList from './ProductList';
import { connect } from 'react-redux';
import { fetchProducts } from '../actions';

class SortProduct extends React.Component {
    state = {'currentPage' : 0, 'sorting' : null, products : []};

    componentDidMount(){
        this.props.fetchProducts();
    }  

    nextPage = () => {
        this.setState({'currentPage' : this.state.currentPage + 1});
    }

    previousPage = () => {
        this.setState({'currentPage' : this.state.currentPage - 1});
    }

    lowerPrice = () => {
        return _.orderBy(this.props.products, ['cost'],['asc']);
    }

    highest = () => {
        return _.orderBy(this.props.products, ['cost'],['desc']);
    }

    paginate(elements, perPage){
        const paginatedElements = [];
        const totalElements = elements.length;
        const cuts = Math.ceil(totalElements / perPage);

        for(let i = 0; i < cuts; i++){
            paginatedElements.push(elements.slice(i*perPage,(i+1)*perPage));
        }
        return paginatedElements;
        //this.setState({'products': paginatedElements});
    }

    checkSort = () => {
        switch(this.state.sorting){
            case 'lower':
                console.log("Ordering by Lower");
                return this.lowerPrice();
            case 'highest':
                console.log("Ordering by Highest");
                return this.highest();
            default:
                console.log("Ordering by Recent");
                return this.props.products;
        }
    }

    showNavigationButtons = (fragmentedProducts) => {
        //console.log(fragmentedProducts)
        const pages = fragmentedProducts.length - 1 ; //resto la página actual
        
        let buttons = [
            <button key="recent" onClick={() => {this.setState({'currentPage' : 0, 'sorting' : "recent"})}}>Recientes</button>,
            <button key="lower" onClick={() => {this.setState({'currentPage' : 0, 'sorting' : "lower"})}}>>Lowest Price</button>,
            <button key="highest" onClick={() => {this.setState({'currentPage' : 0, 'sorting' : "highest"})}}>>Highest Price</button>
        ];

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

        if(this.props.products.length === 0){
            console.log("Loading products..");
            return null;
        }
        
        const products = this.checkSort(); //devuelve los elementos ordenados por el sortBy
        
        const fragmentedProducts = this.paginate(products, this.props.perPage); //los splicea para mostrar en paginas
        
        return(

            
            <div>
                <h2>Navigation:</h2>
                {this.showNavigationButtons(fragmentedProducts)}
                <ProductList products={fragmentedProducts} currentPage={this.state.currentPage} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { products : state.products};
}

export default connect(
    mapStateToProps,
    { fetchProducts : fetchProducts}
    )(SortProduct);