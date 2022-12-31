
type State = string[]

type Action = 
    { type: 'toggle', payload: string }

export const selectedLabelsReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'toggle':
            return (
                (!state.includes(action.payload))
                    ? [...state, action.payload]
                    : state.filter(lbl => lbl !== action.payload)
            )
    
        default:
            return state;
    }
}