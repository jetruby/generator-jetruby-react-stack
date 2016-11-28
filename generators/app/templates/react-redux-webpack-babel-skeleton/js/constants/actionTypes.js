import { createAsyncActions, createSyncActions } from 'utils/redux'
import asyncActions from './asyncActions'
import syncActions from './syncActions'

const asyncConstants = createAsyncActions(...asyncActions)
const syncConstants = createSyncActions(...syncActions)

export default {
  ...asyncConstants,
  ...syncConstants
}
