export interface Todo {
  id: number
  content: string
}

export interface Meta {
  totalCount: number
}

export interface Page {
  slug: string
  titolo: string
  testo: string
  image?: string
  fb_image?: string
  caption?: string
}

export interface Content extends Page {
  data_created?: Date
  pub_date?: Date
  visibile?: boolean
  fb_image2?: string
  home?: string
  float_righ?: boolean
  content?: string
  body?: string
}
