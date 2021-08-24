import sanitizerGithubSchema from 'hast-util-sanitize/lib/github.json'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import gfm from 'remark-gfm'

sanitizerGithubSchema['tagNames'].push('section')
sanitizerGithubSchema['attributes']['*'].push('className')

const plugins = [gfm, rehypeRaw, [rehypeSanitize, sanitizerGithubSchema]]
export default plugins
