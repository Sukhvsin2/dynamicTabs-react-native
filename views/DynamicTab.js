import React, { useCallback, useRef } from 'react'
import { View, Text, StyleSheet, Dimensions, Animated, Image, TouchableNativeFeedback } from 'react-native'

export default function DynamicTab({images, top=100, textColor='white', sliderColor='white', fontSize=84, children}) {

    console.log('screen1', children);
    const { width, height } = Dimensions.get('screen');

    const data = Object.keys(images).map((i, index) => ({
        key: i,
        index,
        title: i,
        image: images[i],
        ref: React.createRef()
    }));

    const Tab = React.forwardRef(({item, onItemPress}, ref) => {
        return (
            <TouchableNativeFeedback onPress={onItemPress}>
                <View ref={ref}>
                    <Text style={{color: textColor, fontSize: fontSize / data.length, fontWeight: 'bold', textTransform: 'uppercase'}}>{ item.title }</Text>
                </View>
            </TouchableNativeFeedback>
        )
    })

    const Indicator = ({ measures, scrollX }) => {
        const inputRange = data.map((_, i) => i * width);
        const IndicatorWidth = scrollX.interpolate({
            inputRange,
            outputRange: measures.map(measure => measure.width)
        })
        const translateX = scrollX.interpolate({
            inputRange,
            outputRange: measures.map(measure => measure.x)
        })
        return <Animated.View
            style={{
                position: 'absolute', bottom: -10, left: 0, height: 3, width: IndicatorWidth, transform: [{
                translateX
            }], backgroundColor: sliderColor}}
        />
    }

    const Tabs = ({ data, scrollX, onItemPress }) => {

        const [measures, setMeasures] = React.useState([]);

        const containerRef = useRef();
        React.useEffect(() => {
                const m = [];
                data.forEach(item => {
                    item.ref.current.measureLayout(containerRef.current, (x, y, width, height) => {
                        m.push({
                            x,
                            y,
                            width,
                            height
                        });
                        if (m.length === data.length) {
                            setMeasures(m);
                        }
                    });
                })
            }, []
        )
    return <View style={{position: 'absolute', top, width}}>
        <View ref={containerRef} style={{justifyContent: 'space-evenly', alignItems: 'center', flex: 1, flexDirection: 'row'}}>
            {data.map((item, index) => {
                return <Tab key={item.key} item={item} ref={item.ref} onItemPress={ () => onItemPress(index) }/>
            })}
        </View>
        { measures.length > 0 && <Indicator measures={measures} scrollX={scrollX} />}
    </View>
}



    const scrollX = useRef(new Animated.Value(0)).current;
    const ref = useRef();
    const onItemPress = useCallback(itemIndex => {
        ref?.current?.scrollToOffset({
            offset: itemIndex * width
        })
    })

    return (
        <View>
            <Animated.FlatList
                ref={ref}
                horizontal
                pagingEnabled
                bounces
                data={data}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                keyExtractor={item => item.key}
                renderItem={({ item }) => {
                    return <View style={{width, height}}>
                        <Image source={{ uri: item.image }} style={{flex: 1, resizeMode: 'cover'}} />
                        <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.3)' }]}>
                            <View style={{marginTop: top+50}}>
                                {children.length > 0 ? children[item.index] : children}
                            </View>
                        </View>
                    </View>
                }}
            />
            <Tabs scrollX={scrollX} data={data} onItemPress={onItemPress} />
        </View>
    )
}
