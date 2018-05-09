import React from 'react';
import {FlatList} from 'react-native';
import {CardNorris} from './CardText';

export const List = ({data, moreJokes, nav}) => {
    const _keyExtractor = (item, index) => item.id;

    const _renderItem = ({item}) => (
        <CardNorris nav={nav} key={item.id} text={item.value}/>
    );

    return (
        <FlatList
            data={data}
            keyExtractor={_keyExtractor}
            renderItem={_renderItem}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
                moreJokes();
            }}
        />
    );
};