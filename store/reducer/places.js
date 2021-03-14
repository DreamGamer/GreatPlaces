import Place from "../../models/place";
import { ADD_PLACE, SET_PLACES } from "../action/places";

const initalState = {
    places: [],
};

export default (state = initalState, action) => {
    switch (action.type) {
        case ADD_PLACE:
            const newPlace = new Place(action.placeData.id.toString(), action.placeData.title, action.placeData.image, action.placeData.latitude, action.placeData.longitude);
            console.log("NewPlace" + JSON.stringify(newPlace));
            return {
                ...state,
                places: state.places.concat(newPlace),
            };
            break;
        case SET_PLACES:
            return {
                ...state,
                places: action.places.map(place => new Place(place.id.toString(), place.title, place.imageURI, place.latitude, place.longitude)),
            };
            break;
        default:
            return state;
    }
};
