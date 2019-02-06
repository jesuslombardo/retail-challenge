import React from 'react';

import UserHeader from './UserHeader';
import SortProduct from './SortProduct';

class App extends React.Component {
    render(){
        return (
            <div>
                <UserHeader />
                <SortProduct perPage={16}/>
                
            </div>
        );
    }
}

export default App;