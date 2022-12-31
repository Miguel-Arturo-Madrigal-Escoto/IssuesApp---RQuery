import { createContext, Dispatch, ReducerAction } from 'react';
import { selectedLabelsReducer } from '../issues/reducers/selectedLabelsReducer';

interface ISelectedLabelsContext {
    state: string[],
    dispatch: Dispatch<ReducerAction<typeof selectedLabelsReducer>>
}

export const SelectedLabels = createContext<ISelectedLabelsContext>({
    state: [],
    dispatch: () => {}
})