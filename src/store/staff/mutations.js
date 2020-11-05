import { state } from './state'

export const SET_STAFFS = (state, payload) => {
    state.staffs = payload;
    console.log(state.staffs);
}

export const SET_STAFF = (state, payload) => {
    state.staffs.unshift(payload);
}

export const UPDATE_STAFF = (state, payload) => {
    state.staffs.map((staff) => {
        if(staff.id == payload.staff.id){
            staff.name = payload.staff.name
            staff.contact_no = payload.staff.contact_no
            staff.country = payload.staff.country
            staff.joined_at = payload.staff.joined_at
        }
    })
}

export const DELETE_STAFF = (state, payload) => {
    state.staffs = state.staffs.filter(staff => staff.id != payload.id);
    
}

export const SET_TOTAL_PAGES = (state, payload) => {
    console.log(payload.total)
    console.log(payload.per_page);
    console.log(payload.total / payload.per_page)
    state.total_pages = payload.total / payload.per_page;
    
}