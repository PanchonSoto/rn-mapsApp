import { useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';


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
    const { getLocation, lastKnownLocation } = useLocationStore();


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

    return (
        <>

            <MapView
                ref={(map)=>mapRef.current=map!}
                showsUserLocation={showsUserLocation}
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={{ flex: 1 }}
                region={{
                    latitude: cameraLocation.current.latitude,
                    longitude: cameraLocation.current.longitude,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}
            >
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
