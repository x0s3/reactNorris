import React, {Component} from 'react';
import {Image} from 'react-native';
import {Container, Header, Left, Body, Button, Icon, Title, Text} from 'native-base';

export default class Joke extends Component {
    render() {
        const {navigation} = this.props;
        const text = navigation.getParam('text', 'No joke sorry :(');
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => navigation.navigate('Home')}>
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>Chuck Norris</Title>
                    </Body>
                </Header>
                <Image style={{height: 200}} source={require('../../../images/joke_view.png')}/>
                <Text>
                    {text}
                </Text>
                <Icon name={'add-circle'}/>
            </Container>
        )
    }
}