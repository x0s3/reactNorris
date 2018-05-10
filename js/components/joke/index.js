import React, {Component} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Toast from 'react-native-easy-toast';
import {Container, Content, Icon, Text, Card, CardItem, H2, View} from 'native-base';
import {saveJoke} from '../../reducers/jokes';
import {ConstHeader} from '../../const/ConstHeader';


class Joke extends Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            text: this.props.navigation.getParam('text', 'No joke sorry :('),
            idStore: this.props.navigation.getParam('idStore', Math.random()),
            fromSettings: this.props.navigation.getParam('fromSet', false),
        };
        this._disableButton = this._disableButton.bind(this);
        this._findJokeInStore = this._findJokeInStore.bind(this);
    }

    _disableButton() {
        this.setState({disabled: !this.state.disabled});
    }

    _addJokeToStore = () => {
        let joke = {value: this.state.text, id: this.state.idStore};
        this.props.saveJoke({joke});
        this.refs.toast.show('Added correctly!', 500);
        this.setState({disabled: true});
    };

    _findJokeInStore(joke) {
        return joke.idStore === this.state.idStore;
    }

    componentDidMount() {
        const found = this.props.saved_jokes.findIndex(this._findJokeInStore);
        if (found > -1) {
            this.setState({disabled: true});
        }
    }

    render() {
        const {text, disabled, fromSettings} = this.state;
        const {navigation} = this.props;
        return (
            <Container>
                <Content>
                    <ConstHeader fromSet={fromSettings} navigate={navigation.navigate} text={'Chuck Norris'}/>
                    <Image style={{height: 260, width: 200, alignSelf: 'center'}}
                           source={require('../../../images/chuck-norris-sticker.png')}/>
                    <Card>
                        <CardItem>
                            <Text>
                                {text}
                            </Text>
                        </CardItem>
                    </Card>
                    {
                        fromSettings ? null :
                            <View>
                                <TouchableOpacity
                                    style={{marginLeft: 10}}
                                    disabled={disabled}
                                    onPress={this._addJokeToStore}
                                >
                                    <Icon name={'add-circle'}/>
                                </TouchableOpacity>
                                {
                                    disabled ?
                                        <H2 style={{alignSelf: 'center'}}>This joke is already in your store</H2> : null
                                }
                            </View>
                    }
                </Content>
                <Toast opacity={0.8} ref='toast'/>
            </Container>
        )
    }
}

Joke.propTypes = {
    navigation: PropTypes.object.isRequired,
    saveJoke: PropTypes.func.isRequired,
    saved_jokes: PropTypes.array.isRequired,
};

const mapDispatchToProps = {
    saveJoke: ({joke}) => saveJoke({joke})
};

const mapStateToProps = (state) => ({
    saved_jokes: state.jokes.saved_jokes
});

export default connect(mapStateToProps, mapDispatchToProps)(Joke);