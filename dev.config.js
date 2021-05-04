import copy from 'rollup-plugin-copy-watch';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';

import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

export default {
	input: 'src/index.ts',
	output: {
		file: 'dist/bundle.js',
		sourcemap: true,
		format: 'iife',
	},
	plugins: [
		serve({
			open: true,
			verbose: true,
			contentBase: ['', 'dist'],
			host: 'localhost',
			port: 8080,
		}),
		livereload({ watch: 'dist' }),
		copy({
			watch: 'src/static',
			targets: [{ src: 'src/static/index.html', dest: 'dist' }],
		}),
		typescript({ lib: ['es5', 'es6', 'dom'], target: 'es2020', sourceMap: true }),
		commonjs({ extensions: ['.js', 'ts'] }),
		resolve({ browser: true }),
	],
};
