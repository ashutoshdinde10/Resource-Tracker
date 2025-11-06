import React, { useState, useEffect } from 'react'
import { fetchProjects, createProject, updateProject, deleteProject, fetchProjectDetails } from '../services/api'
import Modal from './Modal'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [editingProject, setEditingProject] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startDate: '',
    endDate: '',
    status: 'ACTIVE',
  })
  const [detailsModal, setDetailsModal] = useState({
    isOpen: false,
    project: null,
    teamMembers: [],
  })

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      setLoading(true)
      const data = await fetchProjects()
      setProjects(data)
      setError(null)
    } catch (err) {
      console.error('Error loading projects:', err)
      setError('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingProject) {
        await updateProject(editingProject.id, formData)
      } else {
        await createProject(formData)
      }
      resetForm()
      loadProjects()
    } catch (err) {
      console.error('Error saving project:', err)
      alert('Failed to save project')
    }
  }

  const handleEdit = (project) => {
    setEditingProject(project)
    setFormData({
      name: project.name,
      description: project.description,
      startDate: project.startDate,
      endDate: project.endDate || '',
      status: project.status,
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id)
        loadProjects()
      } catch (err) {
        console.error('Error deleting project:', err)
        alert('Failed to delete project')
      }
    }
  }

  const showProjectDetails = async (project) => {
    try {
      const teamMembers = await fetchProjectDetails(project.id)
      setDetailsModal({
        isOpen: true,
        project: project,
        teamMembers: teamMembers,
      })
    } catch (err) {
      console.error('Error loading project details:', err)
      alert('Failed to load project details')
    }
  }

  const resetForm = () => {
    setFormData({ name: '', description: '', startDate: '', endDate: '', status: 'ACTIVE' })
    setEditingProject(null)
    setShowForm(false)
  }

  const closeDetailsModal = () => {
    setDetailsModal({ isOpen: false, project: null, teamMembers: [] })
  }

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'ACTIVE':
        return 'status-active'
      case 'COMPLETED':
        return 'status-completed'
      case 'ON_HOLD':
        return 'status-on-hold'
      case 'EXTENDED':
        return 'status-extended'
      default:
        return 'status-inactive'
    }
  }

  if (loading) {
    return <div className="loading">Loading projects...</div>
  }

  return (
    <div className="projects-section">
      <div className="section-header">
        <h2>Projects Management</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          ➕ Add Project
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <div className="form-container">
          <h3>{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Project Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label>Description *</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows="3"
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
              <label>Status *</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                required
              >
                <option value="ACTIVE">Active</option>
                <option value="COMPLETED">Completed</option>
                <option value="ON_HOLD">On Hold</option>
                <option value="EXTENDED">Extended</option>
              </select>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingProject ? 'Update' : 'Create'} Project
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
              <th>Project Name</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr
                key={project.id}
                className="clickable-row"
                onClick={() => showProjectDetails(project)}
              >
                <td>{project.name}</td>
                <td>{project.description}</td>
                <td>{project.startDate}</td>
                <td>{project.endDate || 'Ongoing'}</td>
                <td>
                  <span className={`status-badge ${getStatusBadgeClass(project.status)}`}>
                    {project.status}
                  </span>
                </td>
                <td onClick={(e) => e.stopPropagation()}>
                  <button className="btn btn-sm btn-edit" onClick={() => handleEdit(project)}>
                    ✏️
                  </button>
                  <button className="btn btn-sm btn-delete" onClick={() => handleDelete(project.id)}>
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={detailsModal.isOpen}
        onClose={closeDetailsModal}
        title="Project Details"
        size="large"
      >
        {detailsModal.project && (
          <div className="project-info">
            <p><strong>Project Name:</strong> {detailsModal.project.name}</p>
            <p><strong>Description:</strong> {detailsModal.project.description}</p>
            <p><strong>Start Date:</strong> {detailsModal.project.startDate}</p>
            <p><strong>End Date:</strong> {detailsModal.project.endDate || 'Ongoing'}</p>
            <p>
              <strong>Status:</strong>{' '}
              <span className={`status-badge ${getStatusBadgeClass(detailsModal.project.status)}`}>
                {detailsModal.project.status}
              </span>
            </p>
          </div>
        )}
        <h3>Team Members</h3>
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Department</th>
                <th>SOW Number</th>
                <th>Team</th>
                <th>Allocation %</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {detailsModal.teamMembers.map((allocation) => (
                <tr key={allocation.id}>
                  <td>{allocation.user?.name || 'N/A'}</td>
                  <td>{allocation.user?.role || 'N/A'}</td>
                  <td>{allocation.user?.department || 'N/A'}</td>
                  <td>{allocation.sowNumber || 'N/A'}</td>
                  <td>{allocation.teamName || 'N/A'}</td>
                  <td>{allocation.allocationPercentage}%</td>
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

export default Projects

