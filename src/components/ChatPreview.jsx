import { forwardRef } from 'react'
import './ChatPreview.css'

const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <circle cx="8" cy="8" r="6.5" stroke="#8a8a8a" strokeWidth="1.2" strokeDasharray="3 2" />
    <path d="M8 5v3.5l2.5 1.5" stroke="#8a8a8a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const ChevronIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
    <path d="M6 4l4 4-4 4" stroke="#8a8a8a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const CopyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8a8a8a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
  </svg>
)

const PlayIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8a8a8a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="5,3 19,12 5,21" />
  </svg>
)

const ThumbUpIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8a8a8a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
    <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
  </svg>
)

const ThumbDownIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8a8a8a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 15v4a3 3 0 003 3l4-9V2H5.72a2 2 0 00-2 1.7l-1.38 9a2 2 0 002 2.3H10z" />
    <path d="M17 2h2.67A2.31 2.31 0 0122 4v7a2.31 2.31 0 01-2.33 2H17" />
  </svg>
)

const CloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333" strokeWidth="2" strokeLinecap="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
)

const ChatPreview = forwardRef(function ChatPreview({ messages, showThoughtPanel, thoughtPanelText }, ref) {
  return (
    <div className="chat-preview" ref={ref}>
      <div className="chat-messages">
        {messages.map((msg) => {
          if (msg.type === 'user') {
            return (
              <div key={msg.id} className="chat-user-row">
                <div className="chat-user-bubble">
                  {msg.text}
                </div>
              </div>
            )
          }

          return (
            <div key={msg.id} className="chat-assistant-block">
              {msg.thinkingSummary && (
                <div className="thinking-row">
                  <ClockIcon />
                  <span className="thinking-text">{msg.thinkingSummary}</span>
                  <ChevronIcon />
                </div>
              )}
              <div className="assistant-text">
                {msg.text}
              </div>
              <div className="action-icons">
                <button className="action-icon"><CopyIcon /></button>
                <button className="action-icon"><PlayIcon /></button>
                <button className="action-icon"><ThumbUpIcon /></button>
                <button className="action-icon"><ThumbDownIcon /></button>
              </div>
            </div>
          )
        })}
      </div>

      {showThoughtPanel && (
        <div className="thought-panel">
          <div className="thought-panel-handle" />
          <div className="thought-panel-header">
            <button className="thought-panel-close">
              <CloseIcon />
            </button>
            <span className="thought-panel-title">Thought process</span>
          </div>
          <div className="thought-panel-body">
            {thoughtPanelText}
          </div>
        </div>
      )}
    </div>
  )
})

export default ChatPreview
