import React, {useState, useEffect, useRef} from 'react';
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    Dimensions,
    TouchableOpacity,
    Image,
    FlatList,
    Animated
} from 'react-native';
import Slider from '@react-native-community/slider';
import Ionicons from 'react-native-vector-icons/Ionicons';
import songs from '../../model/data.js';
const {width, height} = Dimensions.get('window');

const MusicPLayer = () => {

    const scrollX = useRef(new Animated.Value(0)).current;
    const [songIndex, setSongIndex] = useState(0);
    const songSlider =  useRef(null);

    useEffect(()=>{
        scrollX.addListener(({value})=>{
            //console.log('Scroll X ', scrollX);
            //console.log('Device Width ', width);
            const index = Math.round(value/width);
            setSongIndex(index);
            //console.log('Index: ', index);
        });
        //Remove any listener from our useEffect
        return () => {
            scrollX.removeAllListeners();
        }
    }, []);

    const skipToNext = () => {
        songSlider.current.scrollToOffset({
            offset: (songIndex + 1) * width,
        });
    }


    const skipToPrevious = () => {
        songSlider.current.scrollToOffset({
            offset: (songIndex - 1) * width,
        });
    }


    const renderSongs = ({index, item}) => {
        return (
            <Animated.View style={{
                width: width,
                justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: 'black'
                }}>
                <View style={styles.artworkWrapper}>
                    <Image 
                    style={styles.artworkImages} 
                    source={item.image}
                    />
                </View>
            </Animated.View>
        );
    }
    return(
        <SafeAreaView style={styles.container}>
        <View style={styles.mainContainer}>
            <View style={{width: width}}>
                <Animated.FlatList
                    ref={songSlider}
                    data={songs}
                    renderItem={renderSongs}
                    keyExtractor={(item) => item.id}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={16}
                    onScroll={Animated.event(
                        [{nativeEvent: {
                            contentOffset: {x: scrollX}
                        }}],
                        {useNativeDriver: true}
                    )}
                />
            </View>
            <View>
                {/*Song Title */}
                <Text style={styles.title}>{songs[songIndex].title}</Text>
                {/*Song Artist */}
                <Text style={styles.artist}>{songs[songIndex].artist}</Text>
            </View>
            <View>
                <Slider
                style={styles.progressContainer}
                value={20}
                minimumValue={0}
                maximumValue={100}
                thumbTintColor='#FFD369'
                minimumTrackTintColor='#FFD369'
                maximumTrackTintColor='orange'
                onSlidingComplete={()=>{}}
                />
                <View style={styles.progressLabelContainer}>
                        <Text style={styles.progressLabelText}>0.00</Text>
                        <Text style={styles.progressLabelText}>3.55</Text>
                </View>
            </View>
            <View style={styles.musicControlls}>
                <TouchableOpacity onPress={skipToPrevious}>
                    <Ionicons name='play-skip-back-outline' size={35} style={{marginTop:25}}color='#FFD369'/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name='ios-pause-circle' size={75} color='#FFD369'/>
                </TouchableOpacity>
                <TouchableOpacity onPress={skipToNext}>
                    <Ionicons  name='play-skip-forward-outline' size={35} style={{marginTop:25}} color='#FFD369'/>
                </TouchableOpacity>
            </View>
        </View>
        <View style={styles.bottomContainer}>
            <View style={styles.bottomControls}>
                <TouchableOpacity>
                    <Ionicons name='ellipsis-horizontal' size={30} color='#777777'></Ionicons>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{}}>
                    <Ionicons name='repeat' size={30} color='#777777'></Ionicons>
                </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{}}>
                <Ionicons name='heart-outline' size={30} color='#777777'></Ionicons>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{}}>
                    <Ionicons name='share-outline' size={30} color='#777777'></Ionicons>
                </TouchableOpacity>
            </View>
        </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222831',
    },
    mainContainer:{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center'
    },
    bottomContainer:{
        borderTopColor: '#fff',
        borderTopWidth: 1,
        alignItems: 'center',
        paddingVertical: 15
    },
    bottomControls: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        width: '80%'
    },
    artworkWrapper: {
        width: 300,
        height: 340,
        marginBottom: 25,
        shadowColor: '#ccc',

        shadowOffset: {
            width: 5,
            height: 5
        },
        shadowOpacity: 0.5,
        shadowRadius: 3.84,
        elevation: 5
    },
    artworkImages: {
        width: '100%',
        height: '100%',
        fontWeight: '600',
        borderRadius: 15
    },
    title: {
        fontSize: 18,
        textAlign: 'center',
        color: '#fff'
    },
    artist: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        color: '#EEEEEE'
    },
    progressContainer: {
        width: 350,
        height: 40,
        marginTop: 25,
        flexDirection: 'row'
    },
    progressLabelContainer: {
        width: 340,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    progressLabelText: {
        color: '#fff'
    },
    musicControlls: {
        flexDirection: 'row',
        width: '60%',
        justifyContent: 'space-between',
        marginTop: 15
    }
});
export default MusicPLayer;