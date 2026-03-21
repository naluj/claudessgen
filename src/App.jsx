import { useState, useRef, useCallback } from 'react'
import { toPng } from 'html-to-image'
import ChatPreview from './components/ChatPreview'
import Editor from './components/Editor'
import './App.css'

const defaultMessages = [
  {
    id: 1,
    type: 'user',
    text: 'i built this for @jxnlco are you proud of me',
  },
  {
    id: 2,
    type: 'assistant',
    thinkingSummary: 'nalu needs a job',
    text: 'wow',
  },
  {
    id: 3,
    type: 'user',
    text: 'im switching to codex',
  },
  {
    id: 4,
    type: 'assistant',
    thinkingSummary: 'probably better for my reputation',
    text: 'your bags are outside',
  },
]

export default function App() {
  const [messages, setMessages] = useState(defaultMessages)
  const [showThoughtPanel, setShowThoughtPanel] = useState(true)
  const [thoughtPanelText, setThoughtPanelText] = useState("probably better for my reputation")
  const previewRef = useRef(null)

  const updateMessage = useCallback((id, field, value) => {
    setMessages(prev => prev.map(m => m.id === id ? { ...m, [field]: value } : m))
  }, [])

  const addUserMessage = useCallback(() => {
    setMessages(prev => {
      const newId = Math.max(...prev.map(m => m.id)) + 1
      return [...prev, { id: newId, type: 'user', text: 'your message here' }]
    })
  }, [])

  const addAssistantMessage = useCallback(() => {
    setMessages(prev => {
      const newId = Math.max(...prev.map(m => m.id)) + 1
      return [...prev, {
        id: newId,
        type: 'assistant',
        thinkingSummary: 'Thinking about it...',
        text: 'response here',
      }]
    })
  }, [])

  const removeMessage = useCallback((id) => {
    setMessages(prev => prev.filter(m => m.id !== id))
  }, [])

  const moveMessage = useCallback((id, direction) => {
    setMessages(prev => {
      const index = prev.findIndex(m => m.id === id)
      if ((direction === -1 && index === 0) || (direction === 1 && index === prev.length - 1)) return prev
      const newMessages = [...prev]
      const temp = newMessages[index]
      newMessages[index] = newMessages[index + direction]
      newMessages[index + direction] = temp
      return newMessages
    })
  }, [])

  const downloadImage = useCallback(async () => {
    if (!previewRef.current) return
    try {
      const dataUrl = await toPng(previewRef.current, {
        pixelRatio: 3,
        backgroundColor: '#e8e5e0',
      })
      const link = document.createElement('a')
      link.download = 'claude-meme.png'
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Failed to export image:', err)
    }
  }, [])

  return (
    <div className="app">
      <header className="app-header">
        <h1>Claude Meme Generator</h1>
        <p className="subtitle">Create fake Claude conversation screenshots</p>
      </header>

      <div className="app-layout">
        <div className="editor-panel">
          <Editor
            messages={messages}
            updateMessage={updateMessage}
            addUserMessage={addUserMessage}
            addAssistantMessage={addAssistantMessage}
            removeMessage={removeMessage}
            moveMessage={moveMessage}
            showThoughtPanel={showThoughtPanel}
            setShowThoughtPanel={setShowThoughtPanel}
            thoughtPanelText={thoughtPanelText}
            setThoughtPanelText={setThoughtPanelText}
          />
        </div>

        <div className="preview-panel">
          <div className="preview-toolbar">
            <span className="preview-label">Preview</span>
            <button className="download-btn" onClick={downloadImage}>
              Download PNG
            </button>
          </div>
          <div className="preview-scroll">
            <ChatPreview
              ref={previewRef}
              messages={messages}
              showThoughtPanel={showThoughtPanel}
              thoughtPanelText={thoughtPanelText}
              updateMessage={updateMessage}
              setThoughtPanelText={setThoughtPanelText}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
