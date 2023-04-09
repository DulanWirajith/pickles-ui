import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice} from '@reduxjs/toolkit'
import moment from 'moment';

// Define a type for the slice state
interface EmailState {
    lastUpdatedDate: string
}

// Define the initial state using that type
const initialState: EmailState = {
    lastUpdatedDate: moment().format('MMMM Do YYYY, h:mm:ss')
}

export const emailSlice = createSlice({
    name: 'emails',
    initialState,
    reducers: {
        setLastUpdatedDate: (state, action: PayloadAction<string>) => {
            state.lastUpdatedDate = action.payload
        },
    },
})

export const {setLastUpdatedDate} = emailSlice.actions
// export const selectCount = (state: RootState) => state.emails.lastUpdatedDate
export const emailSliceReducer = emailSlice.reducer
