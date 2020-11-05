import { ActionContext, ActionTree } from 'vuex';
import {ActionTypes} from './action_types';
import {MutationTypes} from './mutation_types';
import { State } from './state';
import {Mutations} from './mutations';

type AugmentActionContext = {
    commit<K extends keyof Mutations>(
        key: K,
        payload: Parameters<Mutations[K]>[1]
    ): ReturnType<Mutations[K]>
} & Omit<ActionContext<State, State>,'commit'> 

export interface Actions {
    [ActionTypes.GET_COUNTER](
        {commit}: AugmentActionContext,
        payload: Number,
    ): Promise<Number>
}

export const actions : ActionTree<State, State> & Actions = {
    [ActionTypes.GET_COUNTER]({commit}){
        return new Promise((resolve) => {
            setTimeout(() => {
                const data = 256;
                commit(MutationTypes.SET_COUNTER, data)
                resolve(data)
            }, 1000);
        })
    }
}