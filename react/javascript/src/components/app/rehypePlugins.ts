import sanitizerGithubSchema from 'hast-util-sanitize/lib/github.json'
import { PluggableList } from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'

sanitizerGithubSchema['tagNames'].push('section')
sanitizerGithubSchema['attributes']['*'].push('className')

export default [rehypeRaw, [rehypeSanitize, sanitizerGithubSchema]] as PluggableList
