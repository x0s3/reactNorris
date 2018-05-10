import React from 'react';
import {Header, Button, Title, Body, Left, Icon} from 'native-base';

export const ConstHeader = ({navigate, text, fromSet}) => <Header>
    <Left>
        <Button
            onPress={() => navigate(fromSet ? 'User' : 'Home')}
            transparent>
            <Icon name='arrow-back'/>
        </Button>
    </Left>
    <Body>
    <Title>{text}</Title>
    </Body>
</Header>;