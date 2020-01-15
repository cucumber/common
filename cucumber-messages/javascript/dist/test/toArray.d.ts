/// <reference types="node" />
import { Readable } from 'stream';
import { messages } from '../src';
export default function toArray(input: Readable): Promise<messages.IEnvelope[]>;
