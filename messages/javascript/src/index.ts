import * as $protobuf from 'protobufjs'
import MessageToBinaryStream from './MessageToBinaryStream'
import MessageToNdjsonStream from './MessageToNdjsonStream'
import BinaryToMessageStream from './BinaryToMessageStream'
import NdjsonToMessageStream from './NdjsonToMessageStream'
import * as TimeConversion from './TimeConversion'
import * as IdGenerator from './IdGenerator'
import { io } from './messages'
import messages = io.cucumber.messages
import { version } from '../package.json'

$protobuf.util.Long = undefined
$protobuf.configure()

export { messages, TimeConversion, IdGenerator, version }
