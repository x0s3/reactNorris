import React, {Component} from 'react';
import {Image} from 'react-native';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
    Container,
    Content,
    Text,
    Icon,
    Form,
    Item,
    Input,
    Button,
    H2,
    View
} from 'native-base';
import OrientationLoadingOverlay from 'react-native-orientation-loading-overlay';
import Toast from 'react-native-easy-toast';
import {deleteJoke} from '../../reducers/jokes/';
import {updateUserInfo, generateFakeInfo} from '../../reducers/user/';
import {ConstHeader} from '../../const/ConstHeader';
import {List} from '../../const/FlatList';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.user.user.name,
            email: this.props.user.user.email,
            phone: this.props.user.user.phone,
            location: this.props.user.user.location,
            disabled: false,
        }
    }

    static navigationOptions = {
        drawerIcon: (
            <Icon name='person'/>
        ),
    };

    componentDidMount() {
        if (!this.props.user.generated) {
            this.props.generateFakeInfo();
        }
    }

    componentWillReceiveProps(nextProps, nextState) {
        this.setState({
            name: nextProps.user.user.name,
            email: nextProps.user.user.email,
            phone: nextProps.user.user.phone,
            location: nextProps.user.user.location,
        });
    }

    _submitInfo = () => {
        const {name, email, phone, location} = this.state;
        this.setState({disabled: true});
        let user = {name, email, phone, location};
        this.props.updateUserInfo(user);
        this.refs.toast.show('Info updated correctly!', 500);
        setTimeout(() => {
            this.setState({disabled: false});
        }, 1500)
    };

    render() {
        const {name, email, phone, location, disabled} = this.state;
        const {generated} = this.props.user;
        return (
            <Container>
                <ConstHeader navigate={this.props.navigation.navigate} text={'User Settings'}/>
                <Content>
                    <Form>
                        <Item>
                            <Icon name={'contact'}/>
                            <Input
                                placeholder={'Username'}
                                onChangeText={(name) => this.setState({name})}
                                value={name}
                            />
                        </Item>
                        <Item>
                            <Icon name={'mail'}/>
                            <Input
                                placeholder={'Email'}
                                onChangeText={(email) => this.setState({email})}
                                value={email}
                            />
                        </Item>
                        <Item>
                            <Icon name={'call'}/>
                            <Input
                                placeholder={'Phone number'}
                                onChangeText={(phone) => this.setState({phone})}
                                value={phone}
                            />
                        </Item>
                        <Item last>
                            <Icon name={'compass'}/>
                            <Input
                                placeholder={'Location'}
                                onChangeText={(location) => this.setState({location})}
                                value={location}
                                onSubmitEditing={this._submitInfo}
                            />
                        </Item>
                        <Button
                            full
                            disabled={disabled}
                            onPress={this._submitInfo}>
                            <Text>Save info</Text>
                        </Button>
                    </Form>
                    {
                        this.props.saved_jokes.length > 0 ?
                            <View>
                                <H2>Your favourites jokes:</H2>
                                <List
                                    data={this.props.saved_jokes}
                                    nav={this.props.navigation}
                                    fromSet={true}
                                    eliminate={this.props.deleteJoke}
                                />
                            </View> :
                            <Image
                                resizeMode={'contain'}
                                style={{height: 300}}
                                source={require('../../../images/no_joke_yet.jpg')}
                            />
                    }

                </Content>
                <OrientationLoadingOverlay
                    visible={!generated}
                    color={'white'}
                    indicatorSize={'large'}
                    messageFontSize={24}
                    message={'Generating first data... 😀😀😀'}
                />
                <Toast opacity={0.8} ref='toast'/>
            </Container>
        )
    }
}

User.propTypes = {
    updateUserInfo: PropTypes.func.isRequired,
    saved_jokes: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    deleteJoke: PropTypes.func.isRequired,
    generateFakeInfo: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired
};

const mapDispatchToProps = {
    updateUserInfo,
    deleteJoke,
    generateFakeInfo
};

const mapStateToProps = (state) => ({
    saved_jokes: state.jokes.saved_jokes,
    user: state.user
});

export default connect(mapStateToProps, mapDispatchToProps)(User);