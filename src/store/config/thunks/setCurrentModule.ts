import { createAsyncThunk } from '@reduxjs/toolkit'
import ModuleDefinition from '../model/ModuleDefinition'

export const setCurrentModule = createAsyncThunk(
    'config/setCurrentModule',
    (module: ModuleDefinition) => module,
)
