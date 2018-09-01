import React from 'react';
import { FlatList } from 'react-native';
import Spinner from 'react-native-spinkit';
import { CardNorris } from './CardText';

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

    const _renderFooter = () => (
        <Spinner style={{ alignSelf: 'center' }} isVisible={true} type={'Pulse'} size={100}/>
    )

    if (moreJokes !== null) {
        return (
            <FlatList
                data={data}
                keyExtractor={_keyExtractor}
                removeClippedSubviews={true}
                ListFooterComponent={_renderFooter}
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