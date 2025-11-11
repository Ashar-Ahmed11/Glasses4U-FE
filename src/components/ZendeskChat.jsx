import React from 'react'
import { useZendesk } from 'react-use-zendesk'

export default function ZendeskChat() {

  const { open, unreadMessages } = useZendesk();
 
//   React.useEffect(() => {
//     // Try to show the widget after load
//     const t = setTimeout(() => open(), 1500)
//     return () => clearTimeout(t)
//   }, [])
  return (
    <button
      type="button"
      onClick={()=>open()}
      style={{
        position: 'fixed',
        right: 16,
        bottom: 16,
        zIndex: 1050,
        borderRadius: 9999,
        padding: '10px 14px',
        background: '#000',
        color: '#fff',
        border: 'none',
        boxShadow: '0 6px 14px rgba(0,0,0,.2)',
        cursor: 'pointer'
      }}
    >
      Chat
    </button>
  )
}


