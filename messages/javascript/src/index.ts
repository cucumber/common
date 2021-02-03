import * as $protobuf from 'protobufjs'
import * as TimeConversion from './TimeConversion'
import * as IdGenerator from './IdGenerator'
import { io } from './messages'
import messages = io.cucumber.messages
import { version } from '../package.json'

$protobuf.util.Long = undefined
$protobuf.configure()

export { messages, TimeConversion, IdGenerator, version }
