import { Item } from "src/app/models/item";
import { ItemsAction, ItemActionTypes } from "../actions/items.action";

export interface ItemEntities {
    [id: number]: Item
}

export interface ItemsState {
    entities: ItemEntities,
    loading: boolean,
    loaded: boolean
}

export const initialState: ItemsState = {
    entities: {},
    loading: false,
    loaded: false
}

export function itemsReducer(state: ItemsState = initialState, action: ItemsAction): ItemsState {
    switch (action.type) {
        case ItemActionTypes.LOAD_ITEMS: {
            return {
                ...state,
                loading: true,
                loaded: false
            }
        }
        case ItemActionTypes.LOAD_ITEMS_SUCCESS: {
            const items = action.payload;
            const entities = items.reduce((entities: ItemEntities, item) => {
                return {
                    ...entities,
                    [item.id]: item
                }
            }, {
                    ...state.entities
                })
            return {
                ...state,
                loading: false,
                loaded: true,
                entities
            }
        }
        case ItemActionTypes.LOAD_ITEMS: {
            return {
                ...state,
                loading: false,
                loaded: false
            }
        }
        case ItemActionTypes.ADD_ITEM_SUCCESS:
        case ItemActionTypes.DELETE_ITEM_FAIL: {
            const item = action.payload;

            const entities = {
                ...state.entities,
                [item.id]: item
            }

            return {
                ...state,
                entities
            }
        }
        case ItemActionTypes.ADD_ITEM_FAIL:
        case ItemActionTypes.DELETE_ITEM_SUCCESS: {
            const item = action.payload;
            const entities = {...state.entities};
            delete entities[item.id];

            return {
                ...state,
                entities
            }
        }
    }

    return state;
}

export const getItemsEntities = (state: ItemsState) => state.entities
export const getAllItems = (entities: ItemEntities) => Object.keys(entities).map(id => entities[parseInt(id, 10)])
export const getItemsLoading = (state: ItemsState) => state.loading
export const getItemsLoaded = (state: ItemsState) => state.loaded