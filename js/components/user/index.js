import React, {Component} from 'react';
import {Container, Content, Text, Icon} from 'native-base';

export default class User extends Component {
    static navigationOptions = {
        drawerIcon: (
            <Icon name='person'/>
        ),
    };

    render() {
        return (
            <Container>
                <Content>
                    <Text>Hi User!</Text>
                </Content>
            </Container>
        )
    }
}