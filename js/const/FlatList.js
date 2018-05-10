import React from 'react';
import {FlatList} from 'react-native';
import {CardNorris} from './CardText';

export const List = ({data, moreJokes = null, nav, fromSet = false, eliminate = null}) => {
    const _keyExtractor = (item, index) => item.id;

    const _renderItem = ({item}) => (
        <CardNorris
            eliminate={eliminate}
            nav={nav}
            fromSet={fromSet}
            key={item.id}
            text={item.value}
            idStore={item.id}
        />
    );

    if (moreJokes !== null) {
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
    } else {
        return (
            <FlatList
                data={data}
                keyExtractor={_keyExtractor}
                renderItem={_renderItem}
            />
        );
    }
};