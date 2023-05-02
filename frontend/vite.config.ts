import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import path from 'path'
import { defineConfig } from 'vite'

dotenv.config()
// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, './src'),
			'@assets': path.resolve(__dirname, './src/Assets'),
			'@common': path.resolve(__dirname, './src/Components/Common'),
			'@ui': path.resolve(__dirname, './src/Components/UI'),
			'@pages': path.resolve(__dirname, './src/Components/Pages'),
			'@hooks': path.resolve(__dirname, './src/Hooks'),
			'@providers': path.resolve(__dirname, './src/Provider'),
			'@services': path.resolve(__dirname, './src/Services'),
			'@shared': path.resolve(__dirname, './src/Shared'),
			'@store': path.resolve(__dirname, './src/Store'),
			'@styles': path.resolve(__dirname, './src/styles'),
			'@utils': path.resolve(__dirname, './src/Utils'),
		},
	},
})
