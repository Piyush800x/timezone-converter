export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      }
    ],
    sitemap: 'https://timezone.piyushpaul.com/sitemap.xml',
  }
}