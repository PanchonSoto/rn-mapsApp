import { Platform } from "react-native";
import { openSettings, PERMISSIONS, request, check,PermissionStatus as RNpermissionStatus } from "react-native-permissions";

import { PermissionStatus } from "../../infrastructure/interfaces/permissions";



export const requestLocationPermission = async():Promise<PermissionStatus> => {

    let status:RNpermissionStatus = 'unavailable';

    if(Platform.OS==='ios') {
        status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

    } else if(Platform.OS==='android') {
        status = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

    } else {
        throw new Error('Unsupported platform');
    }

    if(status==='blocked') {
        await openSettings();
        return await checkLocationPermission();
    }

    const permissionMapper:Record<RNpermissionStatus, PermissionStatus> = {
        granted: 'granted',
        denied: 'denied',
        blocked: 'blocked',
        unavailable: 'unavailable',
        limited: 'limited',
    }

    return permissionMapper[status] ?? 'unavailable';
}


export const checkLocationPermission = async():Promise<PermissionStatus> => {

    let status:RNpermissionStatus = 'unavailable';

    if(Platform.OS==='ios') {
        status = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);

    } else if(Platform.OS==='android') {
        status = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

    } else {
        throw new Error('Unsupported platform');
    }

    const permissionMapper:Record<RNpermissionStatus, PermissionStatus> = {
        granted: 'granted',
        denied: 'denied',
        blocked: 'blocked',
        unavailable: 'unavailable',
        limited: 'limited',
    }

    return permissionMapper[status] ?? 'unavailable';

}
