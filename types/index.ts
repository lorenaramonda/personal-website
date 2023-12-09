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

export type StoryblokComponent = {
  _uid: string
  component: string
  _editable: string
} & GenericObject

export type StoryblokSpace = {
  id?: number
  name?: string
  domain?: string
  version?: number
  language_codes?: string[]
}

export type StoryblokStory = {
  content: Record<string, unknown>
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
