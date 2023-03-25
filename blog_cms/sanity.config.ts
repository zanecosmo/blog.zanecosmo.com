import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Blog CMS',

  projectId: 'w3yaovoz',
  dataset: 'production',

  plugins: [
    deskTool(),
    visionTool()
  ],
  
  schema: {
    types: schemaTypes,
  }
});
