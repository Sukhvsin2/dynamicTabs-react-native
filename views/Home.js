import React from 'react'
import { Text, View } from 'react-native'
import DynamicTab from './DynamicTab'

const images = {
    man:
        'https://images.pexels.com/photos/3147528/pexels-photo-3147528.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    women:
        'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    kids:
        'https://images.pexels.com/photos/5080167/pexels-photo-5080167.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    skullcandy:
        'https://images.pexels.com/photos/5602879/pexels-photo-5602879.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
    help:
        'https://images.pexels.com/photos/2552130/pexels-photo-2552130.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
};

export default function Home() {
    return (
        <View>
            <DynamicTab images={images}>
                <View style={{paddingHorizontal: 25}}>
                    <Text style={{color: 'red'}}>This is Screen 1 of Dashboards</Text>
                </View>
                <View style={{paddingHorizontal: 25}}>
                    <Text style={{color: 'red'}}>This is Screen 2 of Dashboards</Text>
                </View>
                <View style={{paddingHorizontal: 25}}>
                    <Text style={{color: 'red'}}>This is Screen 3 of Dashboards</Text>
                </View>
            </DynamicTab>
        </View>
    )
}
