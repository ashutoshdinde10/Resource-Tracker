import React, { useState, useEffect } from 'react'
import { fetchUsers, createUser, updateUser, deleteUser, fetchUserHistory } from '../services/api'
import Modal from './Modal'

const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    role: '',
  })
  const [historyModal, setHistoryModal] = useState({
    isOpen: false,
    user: null,
    allocations: [],
  })

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    try {
      setLoading(true)
      const data = await fetchUsers()
      setUsers(data)
      setError(null)
    } catch (err) {
      console.error('Error loading users:', err)
      setError('Failed to load users')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingUser) {
        await updateUser(editingUser.id, formData)
      } else {
        await createUser(formData)
      }
      resetForm()
      loadUsers()
    } catch (err) {
      console.error('Error saving user:', err)
      alert('Failed to save user')
    }
  }

  const handleEdit = (user) => {
    setEditingUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      department: user.department,
      role: user.role,
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id)
        loadUsers()
      } catch (err) {
        console.error('Error deleting user:', err)
        alert('Failed to delete user')
      }
    }
  }

  const showUserHistory = async (user) => {
    try {
      const allocations = await fetchUserHistory(user.id)
      setHistoryModal({
        isOpen: true,
        user: user,
        allocations: allocations,
      })
    } catch (err) {
      console.error('Error loading user history:', err)
      alert('Failed to load user history')
    }
  }

  const resetForm = () => {
    setFormData({ name: '', email: '', department: '', role: '' })
    setEditingUser(null)
    setShowForm(false)
  }

  const closeHistoryModal = () => {
    setHistoryModal({ isOpen: false, user: null, allocations: [] })
  }

  if (loading) {
    return <div className="loading">Loading users...</div>
  }

  return (
    <div className="users-section">
      <div className="section-header">
        <h2>Users Management</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          ➕ Add User
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <div className="form-container">
          <h3>{editingUser ? 'Edit User' : 'Add New User'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Department *</label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Role *</label>
              <input
                type="text"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                required
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingUser ? 'Update' : 'Create'} User
              </button>
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="clickable-row"
                onClick={() => showUserHistory(user)}
              >
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.department}</td>
                <td>{user.role}</td>
                <td onClick={(e) => e.stopPropagation()}>
                  <button className="btn btn-sm btn-edit" onClick={() => handleEdit(user)}>
                    ✏️
                  </button>
                  <button className="btn btn-sm btn-delete" onClick={() => handleDelete(user.id)}>
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={historyModal.isOpen}
        onClose={closeHistoryModal}
        title="User Allocation History"
        size="large"
      >
        {historyModal.user && (
          <div className="user-info">
            <p><strong>Name:</strong> {historyModal.user.name}</p>
            <p><strong>Email:</strong> {historyModal.user.email}</p>
            <p><strong>Department:</strong> {historyModal.user.department}</p>
            <p><strong>Role:</strong> {historyModal.user.role}</p>
          </div>
        )}
        <h3>Allocation History</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Project</th>
                <th>SOW Number</th>
                <th>Team</th>
                <th>Allocation %</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {historyModal.allocations.map((allocation) => (
                <tr key={allocation.id}>
                  <td>{allocation.project?.name || 'N/A'}</td>
                  <td>{allocation.sowNumber || 'N/A'}</td>
                  <td>{allocation.teamName || 'N/A'}</td>
                  <td>{allocation.allocationPercentage}%</td>
                  <td>{allocation.startDate}</td>
                  <td>{allocation.endDate || 'Ongoing'}</td>
                  <td>
                    <span className={`status-badge status-${allocation.isCurrentlyWorking ? 'active' : 'inactive'}`}>
                      {allocation.isCurrentlyWorking ? 'Working' : 'Not Working'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  )
}

export default Users

