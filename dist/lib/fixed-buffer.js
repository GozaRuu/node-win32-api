/* eslint-disable @typescript-eslint/no-explicit-any */
import * as ref from 'ref-napi';
/**
 * Fixed length "Buffer" type, for use in Struct type definitions.
 *
 * Optionally setting the `encoding` param will force to call
 * `toString(encoding)` on the buffer returning a String instead.
 *
 * @see https://github.com/TooTallNate/ref-struct/issues/28#issuecomment-265626611
 * @ref https://gist.github.com/TooTallNate/80ac2d94b950216a2705
 */
export function BufferTypeFactory(length, encoding) {
    const inst = Object.create(ref.types.byte, {
        constructor: {
            configurable: true,
            enumerable: false,
            writable: true,
            value: BufferTypeFactory,
        },
    });
    Object.defineProperty(inst, 'size', {
        configurable: true,
        enumerable: true,
        writable: false,
        value: length,
    });
    Object.defineProperty(inst, 'encoding', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: encoding,
    });
    Object.defineProperty(inst, 'get', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: getFn,
    });
    Object.defineProperty(inst, 'set', {
        configurable: true,
        enumerable: true,
        writable: true,
        value: setFn,
    });
    return inst;
}
function getFn(buffer, offset) {
    const buf = buffer.slice(offset, offset + this.size);
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (this.encoding) {
        const str = buf.toString(this.encoding);
        return str;
    }
    return buf;
}
function setFn(buffer, offset, value) {
    let target;
    if (typeof value === 'string') {
        target = Buffer.from(value, this.encoding);
    }
    else if (Array.isArray(value)) {
        target = Buffer.from(value);
    }
    else if (Buffer.isBuffer(value)) {
        target = value;
    }
    else {
        throw new TypeError('Buffer instance expected');
    }
    if (target.length > this.size) {
        throw new Error(`Buffer given is ${target.length} bytes, but only ${this.size} bytes available`);
    }
    target.copy(buffer, offset);
}
