import {
    api_get_items,
    api_create_item,
    api_update_item,
    api_delete_item,
    api_import_items
  } from '../../api/items.api'
  
  import {
    MutationTypes
  } from './mutation_types'
  
  export const getItems = ({
    commit
  }, payload) => {
    commit(MutationTypes.SET_LOADING, true)
    api_get_items(payload?.page).then((response) => {
      commit(MutationTypes.SET_LOADING, false);
      commit(MutationTypes.SET_ITEMS, response.data.data)
      commit(MutationTypes.SET_TOTAL_PAGES, response.data.meta);

      console.log(response);
    }, (errors) => {
      commit(MutationTypes.SET_LOADING, false);
      commit(MutationTypes.SET_ERRORS, errors)
    });
  }
  
  
  export const createItem = ({
    commit
  }, payload) => {
    commit(MutationTypes.SET_LOADING, true)
    api_create_item({name: payload.item.name, code : payload.item.code, description : payload.item.description }).then((response) => {
      commit(MutationTypes.SET_ITEM, response.data.data)
      commit(MutationTypes.SET_LOADING, false)
    }, (errors) => {
      console.log(errors);
      commit(MutationTypes.SET_LOADING, false)
      commit(MutationTypes.SET_ERRORS, errors)
    })
  }


  export const updateItem = ({commit}, payload) => {
    console.log(payload);
    commit(MutationTypes.SET_LOADING, true)
    api_update_item(payload.item.id, {name: payload.item.name, code:  payload.item.code, description: payload.item.description }).then(
      (response) => {
        commit(MutationTypes.SET_LOADING, false)
        commit(MutationTypes.UPDATE_ITEM, payload);
        console.log(response.data.success_message)
      },
      (errors) => {
        commit(MutationTypes.SET_LOADING, false);
        console.log(errors)
      }
    )
  }

  export const deleteItem = ({commit}, payload) => {
    commit(MutationTypes.SET_LOADING, true)
    api_delete_item(payload.id).then(
      (response) => {
        commit(MutationTypes.SET_LOADING, false)
        commit(MutationTypes.DELETE_ITEM, payload)
      },
      (errors) => {
        commit(MutationTypes.SET_LOADING, false)
        commit(MutationTypes.SET_ERRORS, errors);
        console.log(errors)
      }
    )
  }
  
  
  export const itemsListFileUplaod = ({commit}, payload) => {
    commit(MutationTypes.SET_LOADING, true)
    api_import_items(payload).then(
      (response) => {
        commit(MutationTypes.SET_LOADING, false)
        // commit(MutationTypes.DELETE_ITEM, payload)
      },
      (errors) => {
        commit(MutationTypes.SET_LOADING, false)
        commit(MutationTypes.SET_ERRORS, errors);
        console.log(errors)
      }
    )
  }