import { promisify } from "util";
import { deflateSync, inflateSync } from "zlib";

// 압축 풀기
export const deflate = deflateSync;
// 압축하기
export const inflate = inflateSync;
