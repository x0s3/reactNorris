import React, {Component} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {Container, View, Icon} from 'native-base';
import PropTypes from 'prop-types';
import {List} from '../../const/FlatList';
import {getJokes} from '../../reducers/jokes';

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
            this.props.getJokes();
    }

    render() {
        const {navigation, jokes, getJokes} = this.props;
        return (
            <Container>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity style={{marginTop: 50, paddingBottom: 5}}
                                      onPress={() => navigation.openDrawer()}>
                        <Image source={require('../../../images/norris_icon.png')}/>
                    </TouchableOpacity>
                    {
                        jokes.fetched_jokes.length > 0 ?
                            <List
                                data={jokes.fetched_jokes}
                                moreJokes={getJokes}
                                nav={navigation}
                            /> : null
                    }
                </View>
            </Container>
        )
    }
}

Home.propTypes = {
    jokes: PropTypes.object.isRequired,
    getJokes: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    getJokes
};

const mapStateToProps = (state) => ({
    jokes: state.jokes
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);