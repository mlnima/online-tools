import { MetadataRoute } from 'next'
import siteConfig from './seo/site.config.json'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: siteConfig.title,
        short_name: siteConfig.name,
        description: siteConfig.description,
        start_url: '/',
        display: 'standalone',
        background_color: siteConfig.backgroundColor,
        theme_color: siteConfig.themeColor,
        icons: [
            {
                src: '/icons/icon-192x192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'maskable'
            },
            {
                src: '/icons/icon-384x384.png',
                sizes: '384x384',
                type: 'image/png',
                purpose: 'maskable'
            },
            {
                src: '/icons/icon-512x512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable'
            },
        ],
    }
}