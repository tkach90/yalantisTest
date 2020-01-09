import React, { Component } from 'react';

import ServiceXHR from '../helpers/ServiceXHR';
import dateToMonth from "../helpers/dateToMonth";
import { UsersWrapper, MonthWrapper } from './styles';

class App extends Component {
    monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            filteredUsers: [],
            hovered: false,
        }
    }

    componentDidMount() {
        ServiceXHR.get('/users')
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
        ,  hovered: true});
    };

    clearMonth = () => { this.setState({ filteredUsers: [], hovered: false }) };

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
        const { users, filteredUsers } = this.state;
        const { hovered } = this.state;
        const style = hovered ? { display: "none"} : {};
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
                {!!users && users.map(user =>
                    <UsersWrapper
                        key={user.id}
                        style={style}
                    >
                        {user.firstName}
                        {' '}
                        {user.lastName}
                        {': '}
                        {user.dob}
                    </UsersWrapper>
                )}
                {!!filteredUsers && filteredUsers.map(user =>
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
