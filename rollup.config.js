/**
 * @file rollup config file
 **/
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import babel from 'rollup-plugin-babel';
import typescript from '@rollup/plugin-typescript';

export default [{
    input: 'src/testUtils.ts',
    output: {
        file: 'dist/san-test-utils.js',
        format: 'cjs'
    },
    plugins: [
        resolve({
            preferBuiltins: true
        }),
        peerDepsExternal(),
        json(),
        babel({
            runtimeHelpers: true
        }),
        typescript(),
        commonjs()
    ]
}, {
    input: 'src/testUtils.ts',
    output: {
        file: 'dist/san-test-utils.iife.js',
        format: 'iife',
        name: 'SanTestUtils',
        globals: {
            'san': 'San',
            'san-ssr': 'SanSsr',
            'cheerio': 'Cheerio'
        }
    },
    plugins: [
        resolve({
            preferBuiltins: true
        }),
        peerDepsExternal(),
        commonjs(),
        json(),
        babel({
            runtimeHelpers: true
        }),
        typescript(),
    ]
}, {
    input: 'src/testUtils.ts',
    output: {
        file: 'dist/san-test-utils.umd.js',
        format: 'umd',
        name: 'SanTestUtils',
        globals: {
            'san': 'San',
            'san-ssr': 'SanSsr',
            'cheerio': 'Cheerio'
        }
    },
    plugins: [
        resolve({
            preferBuiltins: true
        }),
        peerDepsExternal(),
        commonjs(),
        json(),
        babel({
            runtimeHelpers: true
        }),
        typescript(),
    ]
}, {
    input: 'src/serverTestUtils.ts',
    output: {
        file: 'dist/san-test-utils.ssr.js',
        format: 'cjs'
    },
    plugins: [
        resolve({
            preferBuiltins: true
        }),
        peerDepsExternal(),
        commonjs(),
        json(),
        babel({
            runtimeHelpers: true
        }),
        typescript(),
    ]
}];
