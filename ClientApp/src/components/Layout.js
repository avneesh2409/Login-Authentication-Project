import React from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export const Layout = ({ children, isLoggedIn }) => {

    return (
        <div>
            <NavMenu access_token={isLoggedIn} />
        <Container>
          {children}
        </Container>
      </div>
    );
}
