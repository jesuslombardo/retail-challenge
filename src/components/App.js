import React from 'react';

import UserHeader from './UserHeader';
import ProductList from './ProductList';

class App extends React.Component {
    render(){
        return (
            <div>
                <UserHeader />
                <ProductList perPage={16} />
            </div>
        );
    }
}

export default App;