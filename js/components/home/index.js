import React, { Component } from 'react';
import { Image, TouchableOpacity, Platform } from 'react-native';
import { connect } from 'react-redux';
import { Container, View, Icon } from 'native-base';
import Spinner from 'react-native-spinkit';
import PropTypes from 'prop-types';
import { List } from '../../const/FlatList';
import { getJokes, getGolangJokes } from '../../reducers/jokes';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        drawerIcon: (
            <Icon name='home'/>
        ),
    };

    componentDidMount() {
        if (!this.props.jokes.first_fetch)
            Platform.OS === 'android' ? this.props.getGolangJokes() : this.props.getJokes();
    }

    render() {
        const { navigation, jokes, getJokes, getGolangJokes } = this.props;
        return (
            <Container>
                {
                    /*
                        <Text style={{
                    alignSelf: 'center',
                    fontWeight: 'bold',
                    fontSize: 50
                }}>Jokes lenght: {jokes.fetched_jokes.length}</Text>   
                    */
                }
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <TouchableOpacity style={{ marginTop: 50, paddingBottom: 5 }}
                                      onPress={() => navigation.openDrawer()}>
                        <Image source={require('../../../images/norris_icon.png')}/>
                    </TouchableOpacity>
                    {
                        jokes.fetched_jokes.length > 0 ?
                            <List
                                data={jokes.fetched_jokes}
                                moreJokes={Platform.OS === 'android' ? getGolangJokes : getJokes}
                                nav={navigation}
                            /> : 
                            <Spinner style={{ alignSelf: 'center' }} isVisible={true} type={'Pulse'} size={100}/>
                    }
                </View>
            </Container>
        )
    }
}

Home.propTypes = {
    jokes: PropTypes.object.isRequired,
    getJokes: PropTypes.func.isRequired,
    getGolangJokes: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    getJokes,
    getGolangJokes
};

const mapStateToProps = (state) => ({
    jokes: state.jokes
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);