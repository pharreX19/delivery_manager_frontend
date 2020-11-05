import {
  api_login_user,
  api_update_user,
  api_logout_user
} from '../../api/auth.api'

import {
  MutationTypes
} from './mutation_types'

export const login = ({
  commit
}, payload) => {
  commit(MutationTypes.SET_LOADING, true)
  api_login_user({name: payload.name, password: payload.password}).then((response) => {
    commit(MutationTypes.SET_LOADING, false);
    commit(MutationTypes.LOGIN_USER, response)
  }, (errors) => {
    commit(MutationTypes.SET_LOADING, false);
    console.log(errors);
    commit(MutationTypes.SET_ERRORS, errors)
  });
}

export const logout = ({
  commit
}) => {
  commit(MutationTypes.SET_LOADING, true)
  api_logout_user().then((response) => {
    commit(MutationTypes.SET_LOADING, false);
    commit(MutationTypes.LOGOUT_USER, response)
  }, (errors) => {
    commit(MutationTypes.SET_LOADING, false);
    console.log(errors);
    commit(MutationTypes.SET_ERRORS, errors)
  });
}

export const updateUser = ({
  commit
}, payload) => {
  commit(MutationTypes.SET_LOADING, true)
  api_update_user({ password: payload.password, password_confirmation: payload.password_confirmation, old_password: payload.old_password}).then((response) => {
    commit(MutationTypes.SET_LOADING, false);
    console.log(response);
    commit(MutationTypes.UPDATE_USER, response.data.data)
  }, (errors) => {
    commit(MutationTypes.SET_ERRORS, errors);
  })
};

