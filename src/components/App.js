import React, { Component } from 'react';

import axios from 'axios';
import dateToMonth from "../helpers/dateToMonth";

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
        axios.get(`https://yalantis-react-school.herokuapp.com/api/task0/users`)
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
                <div>
                    {!!users.length && this.monthNames.map(month =>
                        <div
                            onMouseOver={this.setMonth}
                            onMouseOut={this.clearMonth}
                            className={this.setColor(month)}
                        >
                            {month}
                        </div>
                    )}
                </div>
                {this.state.filteredUsers && this.state.filteredUsers.map(user =>
                    <div key={user.id}>
                        {user.firstName}
                        {' '}
                        {user.lastName}
                        {': '}
                        {user.dob}
                    </div>
                )}
            </>
        );
    }
}

export default App;
