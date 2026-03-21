import { ArrowUp, ArrowDown, Trash } from '@phosphor-icons/react'
import './Editor.css'

export default function Editor({
  messages,
  updateMessage,
  addUserMessage,
  addAssistantMessage,
  removeMessage,
  moveMessage,
  showThoughtPanel,
  setShowThoughtPanel,
  thoughtPanelText,
  setThoughtPanelText,
}) {
  return (
    <div className="editor">
      <div className="editor-section">
        <h3>Messages</h3>
        {messages.map((msg, i) => (
          <div key={msg.id} className={`msg-editor msg-editor--${msg.type}`}>
            <div className="msg-editor-header">
              <span className="msg-type-badge">{msg.type === 'user' ? 'User' : 'Claude'}</span>
              <div className="msg-editor-actions">
                <button onClick={() => moveMessage(msg.id, -1)} disabled={i === 0} title="Move up"><ArrowUp size={14} /></button>
                <button onClick={() => moveMessage(msg.id, 1)} disabled={i === messages.length - 1} title="Move down"><ArrowDown size={14} /></button>
                <button onClick={() => removeMessage(msg.id)} className="delete-btn" title="Delete"><Trash size={14} /></button>
              </div>
            </div>

            <label>
              <span>Text</span>
              <textarea
                value={msg.text}
                onChange={e => updateMessage(msg.id, 'text', e.target.value)}
                rows={2}
              />
            </label>

            {msg.type === 'assistant' && (
              <label>
                <span>Thinking summary</span>
                <input
                  type="text"
                  value={msg.thinkingSummary || ''}
                  onChange={e => updateMessage(msg.id, 'thinkingSummary', e.target.value)}
                  placeholder="e.g. She knows it's true."
                />
              </label>
            )}
          </div>
        ))}

        <div className="add-buttons">
          <button onClick={addUserMessage} className="add-btn">+ User Message</button>
          <button onClick={addAssistantMessage} className="add-btn">+ Claude Response</button>
        </div>
      </div>

      <div className="editor-section">
        <h3>Thought Process Panel</h3>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={showThoughtPanel}
            onChange={e => setShowThoughtPanel(e.target.checked)}
          />
          <span>Show bottom panel</span>
        </label>
        {showThoughtPanel && (
          <label>
            <span>Panel text</span>
            <textarea
              value={thoughtPanelText}
              onChange={e => setThoughtPanelText(e.target.value)}
              rows={2}
            />
          </label>
        )}
      </div>
    </div>
  )
}
