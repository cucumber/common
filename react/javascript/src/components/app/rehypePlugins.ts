import { defaultSchema } from 'hast-util-sanitize'
import { PluggableList } from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'

defaultSchema['tagNames'].push('section')
defaultSchema['attributes']['*'].push('className')

const plugins: PluggableList = [rehypeRaw, [rehypeSanitize, defaultSchema]]
export default plugins
