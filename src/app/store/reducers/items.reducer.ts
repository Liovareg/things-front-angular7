import * as fromItems from '../actions/items.action'
import { Item } from "src/app/models/item";

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

export function reducer(state: ItemsState = initialState, action: fromItems.ItemsAction): ItemsState {
    switch (action.type) {
        case fromItems.LOAD_ITEMS: {
            return {
                ...state,
                loading: true,
                loaded: false
            }
        }
        case fromItems.LOAD_ITEMS_SUCCESS: {
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
        case fromItems.LOAD_ITEMS: {
            return {
                ...state,
                loading: false,
                loaded: false
            }
        }
    }

    return state;
}

export const getItemsEntities = (state: ItemsState) => state.entities
export const getAllItems = (entities: ItemEntities) => Object.keys(entities).map(id => entities[parseInt(id, 10)])
export const getItemsLoading = (state: ItemsState) => state.loading
export const getItemsLoaded = (state: ItemsState) => state.loaded