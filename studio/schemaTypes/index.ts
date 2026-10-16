import { gallery, imageBlock, metrics, quote } from './blocks'
import { project } from './project'
import { audioWidget, techStackWidget } from './widgets'

/** Every content type Studio knows about. Add new types to this list. */
export const schemaTypes = [project, techStackWidget, audioWidget, imageBlock, gallery, metrics, quote]
