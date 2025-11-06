import React, { useState, useEffect } from 'react'
import { fetchHistory } from '../services/api'

const History = () => {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('ALL') // ALL, USER, ALLOCATION

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = async () => {
    try {
      setLoading(true)
      const data = await fetchHistory()
      setHistory(data)
      setError(null)
    } catch (err) {
      console.error('Error loading history:', err)
      setError('Failed to load history')
    } finally {
      setLoading(false)
    }
  }

  const filteredHistory = filter === 'ALL' 
    ? history 
    : history.filter(item => item.entityType === filter)

  const formatDate = (dateTimeString) => {
    if (!dateTimeString) return 'N/A'
    const date = new Date(dateTimeString)
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getActionBadgeClass = (action) => {
    switch (action) {
      case 'CREATED':
        return 'status-active'
      case 'UPDATED':
        return 'status-extended'
      case 'DELETED':
        return 'status-inactive'
      default:
        return 'status-on-hold'
    }
  }

  const getEntityIcon = (entityType) => {
    switch (entityType) {
      case 'USER':
        return '👤'
      case 'ALLOCATION':
        return '📊'
      case 'PROJECT':
        return '📁'
      default:
        return '📝'
    }
  }

  if (loading) {
    return <div className="loading">Loading history...</div>
  }

  return (
    <div className="history-section">
      <div className="section-header">
        <h2>Change History & Audit Trail</h2>
        <div className="filter-buttons">
          <button 
            className={`btn btn-sm ${filter === 'ALL' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilter('ALL')}
          >
            All Changes
          </button>
          <button 
            className={`btn btn-sm ${filter === 'USER' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilter('USER')}
          >
            User Changes
          </button>
          <button 
            className={`btn btn-sm ${filter === 'ALLOCATION' ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilter('ALLOCATION')}
          >
            Allocation Changes
          </button>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="history-stats">
        <div className="stat-card-small">
          <span className="stat-label">Total Changes</span>
          <span className="stat-value">{history.length}</span>
        </div>
        <div className="stat-card-small">
          <span className="stat-label">User Changes</span>
          <span className="stat-value">{history.filter(h => h.entityType === 'USER').length}</span>
        </div>
        <div className="stat-card-small">
          <span className="stat-label">Allocation Changes</span>
          <span className="stat-value">{history.filter(h => h.entityType === 'ALLOCATION').length}</span>
        </div>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Type</th>
              <th>Action</th>
              <th>User</th>
              <th>Project</th>
              <th>SOW Number</th>
              <th>Allocation %</th>
              <th>Team</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredHistory.length === 0 ? (
              <tr>
                <td colSpan="9" style={{ textAlign: 'center', padding: '2rem' }}>
                  No history records found
                </td>
              </tr>
            ) : (
              filteredHistory.map((item) => (
                <tr key={item.id}>
                  <td>{formatDate(item.changeDate)}</td>
                  <td>
                    <span className="entity-type">
                      {getEntityIcon(item.entityType)} {item.entityType}
                    </span>
                  </td>
                  <td>
                    <span className={`status-badge ${getActionBadgeClass(item.action)}`}>
                      {item.action}
                    </span>
                  </td>
                  <td>{item.userName || '-'}</td>
                  <td>{item.projectName || '-'}</td>
                  <td>{item.sowNumber || '-'}</td>
                  <td>{item.allocationPercentage ? `${item.allocationPercentage}%` : '-'}</td>
                  <td>{item.teamName || '-'}</td>
                  <td className="change-details">{item.changeDetails}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default History

