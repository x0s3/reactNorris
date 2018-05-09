import React from 'react';
import {DrawerItems} from 'react-navigation';
import {Container, Content, Thumbnail, Header, Body} from 'native-base';

export const Drawer = (props) => (
    <Container>
        <Header style={{height: 100}}>
            <Body>
            <Thumbnail large source={require('../../../images/profile_chuck.jpg')}/>
            </Body>
        </Header>
        <Content style={{marginTop: 25}}>
            <DrawerItems {...props}/>
        </Content>
    </Container>
);