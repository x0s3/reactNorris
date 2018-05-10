import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Card, CardItem, Text} from 'native-base';

export const CardNorris = ({text, nav, idStore, fromSet, eliminate}) => (
    <TouchableOpacity
        onPress={() => nav.navigate('Joke', {text, idStore, fromSet})}
        onLongPress={() => {
            if (eliminate !== null) {
                let joke = {value: text, id: idStore};
                eliminate({joke});
            }
        }}
    >
        <Card>
            <CardItem>
                <Text>
                    {text}
                </Text>
            </CardItem>
        </Card>
    </TouchableOpacity>
);