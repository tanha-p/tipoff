import React from 'react';

import { 
    Container, 
    Icon,
    Content,
    Columns,
    Column,
    Footer
 } from 'bloomer';

 import './AppFooter.css';

const AppFooter = () => {
    return (<Footer id='footer'>
                <Container>
                    <Content>
                        <Columns>
                            <Column hasTextColor="black">
                                <p>
                                    Made with<Icon hasTextColor="danger" className="fas fa-heart"></Icon> 
                                    by <a href="https://github.com/tanha-p" target="_new">
                                    <Icon className="fab fa-github"></Icon> tanha-p</a> and these <a href="https://stackshare.io/tipoff/tipoff" target="_new">awesome techs</a>
                                </p>
                            </Column>
                        </Columns>
                    </Content>
                </Container>
            </Footer>);
}

export default AppFooter;