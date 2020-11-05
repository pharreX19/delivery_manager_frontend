
import {
    createStore,
    Store as VuexStore,
    CommitOptions,
    DispatchOptions,
  } from 'vuex'
  import { State, state } from './state'
  import { Getters, getters } from './getters'
  import { Mutations, mutations } from './mutations'
  import { Actions, actions } from './actions'
  
  export const store = createStore({
    state,
    getters,
    mutations,
    actions,
  })
  
  export type Store = Omit<
    VuexStore<State>,
    'getters' | 'commit' | 'dispatch'
  > & {
    commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
      key: K,
      payload: P,
      options?: CommitOptions
    ): ReturnType<Mutations[K]>
  } & {
    dispatch<K extends keyof Actions>(
      key: K,
      payload: Parameters<Actions[K]>[1],
      options?: DispatchOptions
    ): ReturnType<Actions[K]>
  } & {
    getters: {
      [K in keyof Getters]: ReturnType<Getters[K]>
    }
  }

  export function useStore() {
    return store as Store
  }
// import {ActionContext, ActionTree, createStore, GetterTree, MutationTree} from 'vuex';

// export type State = { is_loading : boolean };

// const state : State = { 
//     is_loading : false
// };

// export enum MutationTypes {
//     START_LOADING =  'START_LOADING'
// };

// export enum ActionTypes {
//     START_LOADING = 'START_LOADING'
// };

// export type Mutations<S = State> = {
//     [MutationTypes.START_LOADING](State: S, payload: boolean) : void;
// }

// const mutations: MutationTree<State> & Mutations = {
//     [MutationTypes.START_LOADING](state: State, payload: boolean){
//         state.is_loading = payload;
//     }
// }

// type AugmentedActionContext = {
//     commit<K extends keyof Mutations>(
//         key: K,
//         payload: Parameters<Mutations[K]>[1]
//         ):ReturnType<Mutations[K]>;
//  } & Omit<ActionContext<State, State>, "commit">;


// export interface Actions {
//     [ActionTypes.START_LOADING](
//         {commit}: AugmentedActionContext,
//         payload: boolean
//     ) : void
// } 

// export const actions : ActionTree<State, State> & Actions = {
//     [ActionTypes.START_LOADING]({commit}, payload: boolean){
//         commit(MutationTypes.START_LOADING, payload);
//     }
// }

// export type Getters = {
//     loadingState(state: State) : boolean
// }

// export const getters : GetterTree<State, State> & Getters = {
//     loadingState : state => {
//         return state.is_loading
//     }
// }

// export const store = createStore({
//     state,
//     mutations: {
//         triggerLoading(state, payload){
//             state.is_loading = payload;
//         }
//     },
//     actions: {
//         startLoading({commit}){
//             commit('triggerLoading', true)
//         },
        
//         endLoading({commit}){
//             commit('triggerLoading', false)
//         }
//     },
//     getters: {
//         is_loading(state){
//             return state.is_loading;
//         }
//     }
// })