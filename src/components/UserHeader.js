import React from 'react';
import { connect } from 'react-redux';
import { fetchUser, addPoints } from '../actions/index';

class UserHeader extends React.Component {
    
    componentDidMount(){
        this.props.fetchUser();
    }
    
    renderAddPoints() {
        return (
            <div>
                <button onClick={() => {this.props.addPoints()}}>Agregar Puntos</button>
            </div>
        );
    }

    renderUser(){
        const user = this.props.user;
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
                {this.renderAddPoints()}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
    };
}

export default connect(
    mapStateToProps,
    { 
        fetchUser : fetchUser,
        addPoints : addPoints
    }
    )(UserHeader);