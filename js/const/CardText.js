import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Card, CardItem, Text} from 'native-base';

export const CardNorris = ({text, nav}) => (
    <TouchableOpacity onPress={() => nav.navigate('Joke', {text})}>
        <Card>
            <CardItem>
                <Text>
                    {text}
                </Text>
            </CardItem>
        </Card>
    </TouchableOpacity>
);