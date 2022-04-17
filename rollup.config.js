/**
 * @file rollup config file
 **/
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import babel from 'rollup-plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import { DEFAULT_EXTENSIONS } from '@babel/core';

export default {
    input: 'src/index.ts',
    output: [{
        file: 'dist/san-test-utils.js',
        format: 'cjs'
    }, {
        file: 'dist/san-test-utils.iife.js',
        format: 'iife',
        name: 'SanTestUtils',
        globals: {
            'san': 'San',
            'san-ssr': 'SanSsr',
            'cheerio': 'Cheerio'
        }
    }, {
        file: 'dist/san-test-utils.umd.js',
        format: 'umd',
        name: 'SanTestUtils',
        globals: {
            'san': 'San',
            'san-ssr': 'SanSsr',
            'cheerio': 'Cheerio'
        }
    }, {
        file: 'dist/san-test-utils.ssr.js',
        format: 'cjs'
    }],
    plugins: [
        resolve({
            preferBuiltins: true
        }),
        peerDepsExternal(),
        json(),
        babel({
            runtimeHelpers: true,
            extensions: [
                ...DEFAULT_EXTENSIONS,
                '.ts',
                '.tsx'
            ]
        }),
        typescript({
            useTsconfigDeclarationDir: true,
            check: false,
        }),
        commonjs()
    ]
}
