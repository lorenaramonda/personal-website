import type { SbBlokData } from '@storyblok/js'

export type GenericObject = Record<string, any>

export type StoryblokImage = {
  id: number
  alt: string
  name?: string
  focus?: string
  title?: string
  source?: string
  filename: string
  copyright?: string
  fieldtype: string
  meta_data?: GenericObject
  content_type: string
  is_external_url: boolean
}

export type StoryblokSpace = {
  id?: number
  name?: string
  domain?: string
  version?: number
  language_codes?: string[]
}

export type Locale = {
  name: string
  code: string
  iso: string
  files: string[]
}

export type Breadcrumb = {
  title: string
  slug: string
}

export type ItemListSchema = {
  _uid: string
  _editable: string
  component: string
  items: SbBlokData[]
  title?: string
  layout: 'grid.3columns' | 'grid.2columns' | 'list.accordion' | 'list.1column'
  recent_on_top?: boolean
  show_pagination?: boolean
  enable_switch_layout?: boolean
}

export type LayoutMode = 'grid' | 'list'
