import type {NextConfig} from 'next'

const nextConfig: NextConfig = {
	images: {
		domains: [
			'o-complex.com',
			'example.com',
			'picsum.photos',
			'placehold.co',
			'dummyimage.com',
		],
		dangerouslyAllowSVG: true,
		contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
	typescript: {
		ignoreBuildErrors: false,
	},
}

export default nextConfig
