import { useState, useEffect } from 'react'
import { fetchAllocations, createAllocation, updateAllocation, deleteAllocation, fetchUsers, fetchProjects } from '../services/api'

const Allocations = () => {
  const [allocations, setAllocations] = useState([])
  const [users, setUsers] = useState([])
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingAllocation, setEditingAllocation] = useState(null)
  const [formData, setFormData] = useState({
    userId: '',
    projectId: '',
    allocationPercentage: '',
    startDate: '',
    endDate: '',
    isCurrentlyWorking: true,
    sowNumber: '',
    teamName: '',
  })

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [allocationsData, usersData, projectsData] = await Promise.all([
        fetchAllocations(),
        fetchUsers(),
        fetchProjects(),
      ])
      setAllocations(allocationsData)
      setUsers(usersData)
      setProjects(projectsData)
      setError(null)
    } catch (err) {
      console.error('Error loading data:', err)
      setError('Failed to load data')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        user: { id: parseInt(formData.userId) },
        project: { id: parseInt(formData.projectId) },
        allocationPercentage: parseFloat(formData.allocationPercentage),
        isWorking: formData.isCurrentlyWorking,
        allocationStartDate: formData.startDate,
        allocationEndDate: formData.endDate || null,
        sowNumber: formData.sowNumber || null,
        teamName: formData.teamName || null,
      }

      if (editingAllocation) {
        await updateAllocation(editingAllocation.id, payload)
      } else {
        await createAllocation(payload)
      }
      resetForm()
      loadData()
    } catch (err) {
      console.error('Error saving allocation:', err)
      const errorMessage = err.response?.data || err.message || 'Failed to save allocation'
      alert(errorMessage)
    }
  }

  const handleEdit = (allocation) => {
    setEditingAllocation(allocation)
    setFormData({
      userId: allocation.user?.id || '',
      projectId: allocation.project?.id || '',
      allocationPercentage: allocation.allocationPercentage || '',
      startDate: allocation.startDate || '',
      endDate: allocation.endDate || '',
      isCurrentlyWorking: allocation.isCurrentlyWorking,
      sowNumber: allocation.sowNumber || '',
      teamName: allocation.teamName || '',
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this allocation?')) {
      try {
        await deleteAllocation(id)
        loadData()
      } catch (err) {
        console.error('Error deleting allocation:', err)
        alert('Failed to delete allocation')
      }
    }
  }

  const resetForm = () => {
    setFormData({
      userId: '',
      projectId: '',
      allocationPercentage: '',
      startDate: '',
      endDate: '',
      isCurrentlyWorking: true,
      sowNumber: '',
      teamName: '',
    })
    setEditingAllocation(null)
    setShowForm(false)
  }

  if (loading) {
    return <div className="loading">Loading allocations...</div>
  }

  return (
    <div className="allocations-section">
      <div className="section-header">
        <h2>Allocations Management</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          ➕ Add Allocation
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <div className="form-container">
          <h3>{editingAllocation ? 'Edit Allocation' : 'Add New Allocation'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>User *</label>
              <select
                value={formData.userId}
                onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                required
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.role})
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Project *</label>
              <select
                value={formData.projectId}
                onChange={(e) => setFormData({ ...formData, projectId: e.target.value })}
                required
              >
                <option value="">Select Project</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Allocation Percentage *</label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.allocationPercentage}
                onChange={(e) => setFormData({ ...formData, allocationPercentage: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>SOW Number</label>
              <input
                type="text"
                value={formData.sowNumber}
                onChange={(e) => setFormData({ ...formData, sowNumber: e.target.value })}
                placeholder="e.g., SOW-2024-001"
              />
            </div>
            <div className="form-group">
              <label>Team Name</label>
              <input
                type="text"
                value={formData.teamName}
                onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
                placeholder="e.g., Alpha Team"
              />
            </div>
            <div className="form-group">
              <label>Start Date *</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  checked={formData.isCurrentlyWorking}
                  onChange={(e) => setFormData({ ...formData, isCurrentlyWorking: e.target.checked })}
                />
                Currently Working
              </label>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingAllocation ? 'Update' : 'Create'} Allocation
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
              <th>User</th>
              <th>Project</th>
              <th>Allocation %</th>
              <th>SOW Number</th>
              <th>Team</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {allocations.map((allocation) => (
              <tr key={allocation.id}>
                <td>{allocation.user?.name || 'N/A'}</td>
                <td>{allocation.project?.name || 'N/A'}</td>
                <td>{allocation.allocationPercentage}%</td>
                <td>{allocation.sowNumber || 'N/A'}</td>
                <td>{allocation.teamName || 'N/A'}</td>
                <td>{allocation.startDate}</td>
                <td>{allocation.endDate || 'Ongoing'}</td>
                <td>
                  <span className={`status-badge status-${allocation.isCurrentlyWorking ? 'active' : 'inactive'}`}>
                    {allocation.isCurrentlyWorking ? 'Working' : 'Not Working'}
                  </span>
                </td>
                <td>
                  <button className="btn btn-sm btn-edit" onClick={() => handleEdit(allocation)}>
                    ✏️
                  </button>
                  <button className="btn btn-sm btn-delete" onClick={() => handleDelete(allocation.id)}>
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Allocations

