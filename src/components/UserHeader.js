import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions/index';

class UserHeader extends React.Component {
    
    componentDidMount(){
        this.props.fetchUser();
    }
    
    renderUser(){
        const user = this.props.user[0];
        //console.log(user);
        return (
            <div>
                {user.name}
                <br />
                {user.points}
            </div>
        );
    }

    render(){    
        if(this.props.user.length === 0){
            return null;
        }
        
        return(
            <div>
                {this.renderUser()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
}

export default connect(
    mapStateToProps,
    { fetchUser : fetchUser}
    )(UserHeader);