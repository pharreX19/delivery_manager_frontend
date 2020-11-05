import {
    api_create_staff,
  api_delete_staff,
    api_get_staffs,
    api_update_staff
  } from '../../api/staff.api'
  
  import {
    MutationTypes
  } from './mutation_types'
  
  export const getStaffs = ({
    commit
  }, payload) => {
    console.log('THIS IS STAFFS');
    commit(MutationTypes.SET_LOADING, true)
    api_get_staffs(payload?.page).then((response) => {
      commit(MutationTypes.SET_LOADING, false);
      commit(MutationTypes.SET_STAFFS, response.data.data)
      console.log(response.data.meta);
      commit(MutationTypes.SET_TOTAL_PAGES, response.data.meta);

      console.log(response);
    }, (errors) => {
      commit(MutationTypes.SET_LOADING, false);
      commit(MutationTypes.SET_ERRORS, errors)
    });
  }
  
  
  export const createStaff = ({
    commit
  }, payload) => {
    commit(MutationTypes.SET_LOADING, true)
    api_create_staff({
      name: payload.staff.name,
      contact_no: payload.staff.contact_no,
      country: payload.staff.country,
      joined_at: payload.staff.joined_at
  }).then(
      (response) => {
        console.log(response);
        commit(MutationTypes.SET_STAFF, response.data.data)
        commit(MutationTypes.SET_LOADING, false);
      },
      (errors) => {
        commit(MutationTypes.SET_LOADING, false);
        console.log(errors)
      }
    );
  }

  export const updateStaff = ({commit}, payload) => {
    console.log(payload);
    commit(MutationTypes.SET_LOADING, true)
    api_update_staff(payload.staff.id, {name: payload.staff.name, contact_no:  payload.staff.contact_no, country: payload.staff.country, joined_at: payload.staff.joined_at}).then(
      (response) => {
        commit(MutationTypes.SET_LOADING, false)
        commit(MutationTypes.UPDATE_STAFF, payload);
        console.log(response.data.success_message)
      },
      (errors) => {
        commit(MutationTypes.SET_LOADING, false);
        console.log(errors)
      }
    )
  }

  export const deleteStaff = ({commit}, payload) => {
    commit(MutationTypes.SET_LOADING, true)
    api_delete_staff(payload.id).then(
      (response) => {
        commit(MutationTypes.SET_LOADING, false)
        commit(MutationTypes.DELETE_STAFF, payload)
      },
      (errors) => {
        commit(MutationTypes.SET_LOADING, false)
        commit(MutationTypes.SET_ERRORS, errors);
        console.log(errors)
      }
    )
  }
  