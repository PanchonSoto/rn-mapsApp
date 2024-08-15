import { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';


import { FAB } from '../ui/FAB';
import { Location } from '../../../infrastructure/interfaces/location';
import { useLocationStore } from '../../store/location/useLocationStore';



interface Props {
    showsUserLocation?:boolean;
    initialLocation: Location;
}


export const Map = ({showsUserLocation=true, initialLocation}:Props) => {

    const cameraLocation = useRef<Location>(initialLocation);
    const mapRef = useRef<MapView>();

    const [isFollowingUser, setIsFollowingUser] = useState(true);
    const [isShowingPolyline, setIsShowingPolyline] = useState(true);

    const { lastKnownLocation, userLocationList,getLocation, watchLocation, clearWatchLocation } = useLocationStore();


    const moveCameraLocation = (location: Location) => {
        if(!mapRef.current) return;

        mapRef.current.animateCamera({center: location});
    }

    const moveToCurrentLocation = async() => {
        if(!lastKnownLocation) {
            moveCameraLocation(initialLocation);
        }
        const location = await getLocation();
        if(!location) return;
        moveCameraLocation(location);
    }

    useEffect(() => {
      watchLocation();
      //!Para eso se debe usar el propio método de Navigation Stack: useFocusEffect().-Luis Carlos (devtalles)
      //?(si se usa alguna navegacion del stacknavigator este no destruye el componente por lo que no se ejecuta)
      return () => {
        clearWatchLocation();
      }
    }, [])

    useEffect(() => {
        if(lastKnownLocation && isFollowingUser){
            moveCameraLocation(lastKnownLocation);
        }
    }, [lastKnownLocation, isFollowingUser]);



    return (
        <>

            <MapView
                ref={(map)=>mapRef.current=map!}
                showsUserLocation={showsUserLocation}
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={{ flex: 1 }}
                onTouchStart={()=>setIsFollowingUser(false)}
                region={{
                    latitude: cameraLocation.current.latitude,
                    longitude: cameraLocation.current.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >
                {
                    isShowingPolyline && (
                        <Polyline
                            coordinates={userLocationList}
                            strokeColor='red'
                            strokeWidth={4}
                        />
                    )
                }
                {/* <Marker
                    coordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                    }}
                    title='test'
                    description='test'
                    image={require('../../../assets/custom-marker.png')}
                /> */}
            </MapView>

            <FAB
                iconName={ isShowingPolyline ? 'eye-outline' : 'eye-off-outline' }
                onPress={()=> setIsShowingPolyline(!isShowingPolyline)}
                style={{
                    bottom:140,
                    right:20
                }}
            />

            <FAB
                iconName={ isFollowingUser ? 'walk-outline' : 'accessibility-outline' }
                onPress={()=> setIsFollowingUser(!isFollowingUser)}
                style={{
                    bottom:80,
                    right:20
                }}
            />

            <FAB
                iconName='compass-outline'
                onPress={moveToCurrentLocation}
                style={{
                    bottom:20,
                    right:20
                }}
            />

        </>
    )
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
