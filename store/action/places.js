import * as FileSystem from "expo-file-system";
import { insertPlace, fetchPlaces } from "../../helpers/db";

export const ADD_PLACE = "ADD_PLACE";
export const SET_PLACES = "SET_PLACES";

export const addPlace = (title, image, location) => {
    return async dispatch => {
        const fileName = image.split("/").pop();
        const newPath = FileSystem.documentDirectory + fileName;

        try {
            await FileSystem.moveAsync({
                from: image,
                to: newPath,
            });
            const dbResult = await insertPlace(title, newPath, location.latitude, location.longitude);
            dispatch({ type: ADD_PLACE, placeData: { id: dbResult.insertId, title: title, image: newPath, latitude: location.latitude, longitude: location.longitude } });
        } catch (error) {
            console.log("Error while saving Image: " + error);
        }
    };
};

export const loadPlaces = () => {
    return async dispatch => {
        try {
            const dbResult = await fetchPlaces();

            dispatch({ type: SET_PLACES, places: dbResult.rows._array });
        } catch (error) {
            throw error;
        }
    };
};
