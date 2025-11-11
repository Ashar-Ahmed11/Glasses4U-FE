import React from 'react'

export default function ZendeskMessagingLoader({ apiKey }) {
  React.useEffect(() => {
    const key = apiKey || process.env.REACT_APP_ZENDESK_MESSAGING_KEY || ''
    if (!key) return
    if (document.getElementById('ze-snippet')) return
    const s = document.createElement('script')
    s.id = 'ze-snippet'
    s.src = `https://static.zdassets.com/ekr/snippet.js?key=${encodeURIComponent(key)}`
    s.async = true
    document.body.appendChild(s)
  }, [apiKey])
  return null
}


