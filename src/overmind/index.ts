import { IContext } from 'overmind'
import { createActionsHook, createStateHook } from 'overmind-react'
import { namespaced } from 'overmind/config'
import * as example from './example'
import * as players from './players'

export const config = namespaced({
    example,
    players
})

export type Context = IContext<{
    state: typeof config.state,
    actions: typeof config.actions,
    effects: typeof config.effects
}>

export const useAppState = createStateHook<Context>()
export const useActions = createActionsHook<Context>()