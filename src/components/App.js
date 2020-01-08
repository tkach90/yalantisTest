import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import axiosConfig from '../api/axiosConfig';
import dateToMonth from "../helpers/dateToMonth";

const MonthWrapper = styled.div`
    display: flex;
    flex-wrap: wrap;  
    
    div {
        display: flex;
        justify-content: center;
        align-items: center;    
        width: 100px;
        height: 60px;
        margin: 5px;
        border-radius: 6px;
        box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3), 
              -3px -3px 6px rgba(255, 255, 255, 0.3), 
              inset 2px 2px 5px rgba(255, 255, 255, 0.3), 
              inset -2px -2px 5px rgba(0, 0, 0, 0.3);
    }
    
    .red {
      background: red;
      color: #fff;
    }
    
    .green {
      background: green;
      color: #fff;
    }
    
    .blue {
      background: blue;
      color: #fff;
    }
    
    .gray {
      background: gray;
      color: #fff;
    }
`;


const UsersWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px auto 0;
  justify-content: center;
  width: 400px;
  padding: 3px 10px 3px;
  border-radius: 10px;
  box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.3), 
              -3px -3px 6px rgba(255, 255, 255, 0.3), 
              inset 2px 2px 5px rgba(255, 255, 255, 0.3), 
              inset -2px -2px 5px rgba(0, 0, 0, 0.3);
`;

class App extends Component {
    monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            filteredUsers: [],
        }
    }

    componentDidMount() {
        axiosConfig.get('/users' )
            .then(response => {
                this.setState({ users: response.data });
            })
            .catch((error) => {
                console.error(error);
            });
    }

    setMonth = (event) => {
        this.setState({ filteredUsers: this.state.users.filter((user) => {
                return event.target.innerText === dateToMonth(user.dob);
            })
        });

    };

    clearMonth = () => this.setState({ filteredUsers: [] });

    setColor = (month) => {
        const { users } = this.state;

        const length = users.filter((user) => {
            return month === dateToMonth(user.dob);
        }).length;

        if ( length < 3 ) {
            return 'gray';
        } else if ( length > 2 && length < 7) {
            return 'blue';
        } else if (length > 6 && length < 11) {
            return 'green';
        } else if (length > 10) {
            return 'red';
        }
    };

    render() {
        const { users } = this.state;

        return (
            <>
                <MonthWrapper>
                    {!!users.length && this.monthNames.map((month, index) =>
                        <div
                            key={index}
                            onMouseOver={this.setMonth}
                            onMouseOut={this.clearMonth}
                            className={this.setColor(month)}
                        >
                            {month}
                        </div>
                    )}
                </MonthWrapper>
                {this.state.filteredUsers && this.state.filteredUsers.map(user =>
                    <UsersWrapper key={user.id}>
                        {user.firstName}
                        {' '}
                        {user.lastName}
                        {': '}
                        {user.dob}
                    </UsersWrapper>
                )}
            </>
        );
    }
}

export default App;
