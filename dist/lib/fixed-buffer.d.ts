/// <reference types="node" />
import * as ref from 'ref-napi';
export interface BufferType extends ref.Type {
    size: number;
    encoding: BufferEncoding;
}
/**
 * Fixed length "Buffer" type, for use in Struct type definitions.
 *
 * Optionally setting the `encoding` param will force to call
 * `toString(encoding)` on the buffer returning a String instead.
 *
 * @see https://github.com/TooTallNate/ref-struct/issues/28#issuecomment-265626611
 * @ref https://gist.github.com/TooTallNate/80ac2d94b950216a2705
 */
export declare function BufferTypeFactory(length: number, encoding?: BufferEncoding): BufferType;
