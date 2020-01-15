/// <reference types="node" />
import { Transform } from 'stream';
export default function (makeFromMessageStream: () => Transform, makeToMessageStream: () => Transform): void;
