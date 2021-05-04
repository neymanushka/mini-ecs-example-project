import copy from 'rollup-plugin-copy';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

export default {
	input: 'src/index.ts',
	output: {
		file: 'dist/bundle.js',
		format: 'iife'		
	},
	plugins: [
		copy({ targets: [{ src: 'src/static/index.html', dest: 'dist' }] }),
		typescript({ lib: ['es5', 'es6', 'dom'], target: 'es2020' ,sourceMap: false}),
		commonjs({ extensions: ['.js', 'ts'] }),
		resolve({ browser: true }),
		terser(),
	],
};
