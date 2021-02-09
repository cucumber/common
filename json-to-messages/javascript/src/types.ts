export type Implementation = 'behave' | 'cucumber-js' | 'cucumber-ruby'

export interface IMatch {
  location: string
}

export interface IResult {
  duration?: number
  status: string
  error_message?: string
}

export interface ITag {
  name: string
  line?: number
}
