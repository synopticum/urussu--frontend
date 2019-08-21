import {MapConstants} from "./UMap.actions";
import {
    generateErrorActionTypeName,
    generateInProgressActionTypeName,
    generateSuccessActionTypeName,
} from "../../middleware/asyncActionsMiddleware";
import {DotConstants} from "../u-dot/UDot.actions";

export const map = (state = {
    tooltip: {
        isVisible: false,
        isFetching: false,
        item: {},
        position: {},
    },

    contextMenu: {
        isVisible: false,
        position: {}
    },

    dotCreator: {
        isVisible: false,
        tempDot: null,
        position: {}
    },

    clouds: {
        visibility: 'none'
    },

    dotPage: {
        currentDotId: '',
        isVisible: false
    },
}, action) => {
    switch (action.type) {
        case generateInProgressActionTypeName(MapConstants.TOOLTIP.FETCH):
            return {
                ...state,
                tooltip: {
                    ...state.tooltip,
                    isFetching: true

                }
            };

        case generateSuccessActionTypeName(MapConstants.TOOLTIP.FETCH):
            return {
                ...state,
                tooltip: {
                    ...state.tooltip,
                    isFetching: false,
                    item: action.payload.item,
                    position: action.payload.position
                }
            };

        case generateErrorActionTypeName(MapConstants.TOOLTIP.FETCH):
            return {
                ...state,
                tooltip: {
                    ...state.tooltip,
                    isFetching: false
                }
            };

        case MapConstants.TOGGLE.TOOLTIP:
            return {
                ...state,
                tooltip: {
                    ...state.tooltip,
                    isVisible: action.payload
                }
            };

        case MapConstants.TOGGLE.CONTEXT_MENU:
            return {
                ...state,
                contextMenu: {
                    ...state.contextMenu,
                    isVisible: action.payload.isVisible,
                    position: action.payload.position
                }
            };

        case MapConstants.TOGGLE.DOT_CREATOR:
            return {
                ...state,
                dotCreator: {
                    ...state.dotCreator,
                    isVisible: action.payload.isVisible,
                    position: action.payload.position
                }
            };

        case MapConstants.TOGGLE.CLOUDS:
            return {
                ...state,
                clouds: {
                    ...state.clouds,
                    visibility: action.payload.visibility
                }
            };

        case MapConstants.DOT_PAGE.SET_ID:
            return {
                ...state,
                dotPage: {
                    isVisible: Boolean(action.payload),
                    currentDotId: action.payload
                }
            };

        case DotConstants.PUT:
            const [ dot ] = action.params;

            return {
                ...state,
                dotCreator: {
                    ...state.dotCreator,
                    tempDot: dot
                }
            };


        case generateSuccessActionTypeName(DotConstants.PUT):
        case generateErrorActionTypeName(DotConstants.PUT):
            return {
                ...state,
                dotCreator: {
                    ...state.dotCreator,
                    tempDot: null
                }
            };

        default:
            return state;
    }
};

export const dots = (state = {
    items: [],
    isFetching: false
}, action) => {
    switch (action.type) {
        case generateInProgressActionTypeName(MapConstants.DOTS.FETCH):
            return {
                ...state,
                isFetching: true
            };

        case generateSuccessActionTypeName(MapConstants.DOTS.FETCH):
            return {
                ...state,
                isFetching: false,
                items: action.payload
            };

        case generateErrorActionTypeName(MapConstants.DOTS.FETCH):
            return {
                ...state,
                isFetching: false
            };

        case MapConstants.DOTS.UPDATE:
            return {
                ...state,
                items: [...state.items, action.payload]
            };

        case DotConstants.DELETE:
            const dotId = action.params[0];

            return {
                ...state,
                items: state.items.filter(dot => dot.id !== dotId)
            };

        default:
            return state;
    }
};