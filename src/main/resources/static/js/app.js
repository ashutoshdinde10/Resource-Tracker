const API_BASE_URL = 'http://localhost:8080/api';

// Navigation
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionName).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
    
    // Load data for the section
    if (sectionName === 'dashboard') {
        loadDashboard();
    } else if (sectionName === 'users') {
        loadUsers();
    } else if (sectionName === 'projects') {
        loadProjects();
    } else if (sectionName === 'allocations') {
        loadAllocations();
        loadUsersForDropdown();
        loadProjectsForDropdown();
    }
}

// Dashboard
async function loadDashboard() {
    try {
        const [users, projects, allocations] = await Promise.all([
            fetch(`${API_BASE_URL}/users`).then(r => r.json()),
            fetch(`${API_BASE_URL}/projects`).then(r => r.json()),
            fetch(`${API_BASE_URL}/allocations/active`).then(r => r.json())
        ]);
        
        document.getElementById('totalUsers').textContent = users.length;
        document.getElementById('totalProjects').textContent = projects.length;
        document.getElementById('activeAllocations').textContent = allocations.length;
        
        displayActiveAllocations(allocations);
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

function displayActiveAllocations(allocations) {
    const container = document.getElementById('activeAllocationsTable');
    
    if (allocations.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No active allocations found</p></div>';
        return;
    }
    
    let html = `
        <table>
            <thead>
                <tr>
                    <th>User</th>
                    <th>Project</th>
                    <th>Allocation %</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    allocations.forEach(allocation => {
        html += `
            <tr>
                <td>${allocation.user.name}</td>
                <td>${allocation.project.name}</td>
                <td>${allocation.allocationPercentage}%</td>
                <td>${allocation.allocationStartDate || 'N/A'}</td>
                <td>${allocation.allocationEndDate || 'N/A'}</td>
            </tr>
        `;
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
}

// Users Section
async function loadUsers() {
    try {
        const response = await fetch(`${API_BASE_URL}/users`);
        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        console.error('Error loading users:', error);
    }
}

function displayUsers(users) {
    const container = document.getElementById('usersTable');
    
    if (users.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No users found. Click "Add User" to create one.</p></div>';
        return;
    }
    
    let html = `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    users.forEach(user => {
        html += `
            <tr class="clickable-row" onclick="showUserHistory(${user.id})">
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.department || 'N/A'}</td>
                <td>${user.role || 'N/A'}</td>
                <td onclick="event.stopPropagation();">
                    <button class="btn-edit" onclick="editUser(${user.id})">Edit</button>
                    <button class="btn-delete" onclick="deleteUser(${user.id})">Delete</button>
                </td>
            </tr>
        `;
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
}

function showUserForm() {
    document.getElementById('userFormContainer').style.display = 'block';
    document.getElementById('userFormTitle').textContent = 'Add New User';
    document.getElementById('userForm').reset();
    document.getElementById('userId').value = '';
}

function cancelUserForm() {
    document.getElementById('userFormContainer').style.display = 'none';
    document.getElementById('userForm').reset();
}

async function saveUser(event) {
    event.preventDefault();
    
    const userId = document.getElementById('userId').value;
    const user = {
        name: document.getElementById('userName').value,
        email: document.getElementById('userEmail').value,
        department: document.getElementById('userDepartment').value,
        role: document.getElementById('userRole').value
    };
    
    try {
        const url = userId ? `${API_BASE_URL}/users/${userId}` : `${API_BASE_URL}/users`;
        const method = userId ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        
        if (response.ok) {
            cancelUserForm();
            loadUsers();
            alert(userId ? 'User updated successfully!' : 'User created successfully!');
        } else {
            alert('Error saving user');
        }
    } catch (error) {
        console.error('Error saving user:', error);
        alert('Error saving user');
    }
}

async function editUser(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/users/${id}`);
        const user = await response.json();
        
        document.getElementById('userId').value = user.id;
        document.getElementById('userName').value = user.name;
        document.getElementById('userEmail').value = user.email;
        document.getElementById('userDepartment').value = user.department || '';
        document.getElementById('userRole').value = user.role || '';
        
        document.getElementById('userFormTitle').textContent = 'Edit User';
        document.getElementById('userFormContainer').style.display = 'block';
    } catch (error) {
        console.error('Error loading user:', error);
    }
}

async function deleteUser(id) {
    if (!confirm('Are you sure you want to delete this user?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/users/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            loadUsers();
            alert('User deleted successfully!');
        } else {
            alert('Error deleting user');
        }
    } catch (error) {
        console.error('Error deleting user:', error);
        alert('Error deleting user');
    }
}

// Projects Section
async function loadProjects() {
    try {
        const response = await fetch(`${API_BASE_URL}/projects`);
        const projects = await response.json();
        displayProjects(projects);
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}

function displayProjects(projects) {
    const container = document.getElementById('projectsTable');
    
    if (projects.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No projects found. Click "Add Project" to create one.</p></div>';
        return;
    }
    
    let html = `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Manager</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    projects.forEach(project => {
        const statusClass = project.status.toLowerCase().replace('_', '');
        html += `
            <tr class="clickable-row" onclick="showProjectDetails(${project.id})">
                <td>${project.id}</td>
                <td>${project.name}</td>
                <td>${project.description || 'N/A'}</td>
                <td>${project.projectManager || 'N/A'}</td>
                <td>${project.startDate || 'N/A'}</td>
                <td>${project.endDate || 'N/A'}</td>
                <td><span class="status-badge status-${statusClass}">${project.status}</span></td>
                <td onclick="event.stopPropagation();">
                    <button class="btn-edit" onclick="editProject(${project.id})">Edit</button>
                    <button class="btn-delete" onclick="deleteProject(${project.id})">Delete</button>
                </td>
            </tr>
        `;
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
}

function showProjectForm() {
    document.getElementById('projectFormContainer').style.display = 'block';
    document.getElementById('projectFormTitle').textContent = 'Add New Project';
    document.getElementById('projectForm').reset();
    document.getElementById('projectId').value = '';
}

function cancelProjectForm() {
    document.getElementById('projectFormContainer').style.display = 'none';
    document.getElementById('projectForm').reset();
}

async function saveProject(event) {
    event.preventDefault();
    
    const projectId = document.getElementById('projectId').value;
    const project = {
        name: document.getElementById('projectName').value,
        description: document.getElementById('projectDescription').value,
        projectManager: document.getElementById('projectManager').value,
        startDate: document.getElementById('projectStartDate').value || null,
        endDate: document.getElementById('projectEndDate').value || null,
        status: document.getElementById('projectStatus').value
    };
    
    try {
        const url = projectId ? `${API_BASE_URL}/projects/${projectId}` : `${API_BASE_URL}/projects`;
        const method = projectId ? 'PUT' : 'POST';
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        });
        
        if (response.ok) {
            cancelProjectForm();
            loadProjects();
            alert(projectId ? 'Project updated successfully!' : 'Project created successfully!');
        } else {
            alert('Error saving project');
        }
    } catch (error) {
        console.error('Error saving project:', error);
        alert('Error saving project');
    }
}

async function editProject(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/projects/${id}`);
        const project = await response.json();
        
        document.getElementById('projectId').value = project.id;
        document.getElementById('projectName').value = project.name;
        document.getElementById('projectDescription').value = project.description || '';
        document.getElementById('projectManager').value = project.projectManager || '';
        document.getElementById('projectStartDate').value = project.startDate || '';
        document.getElementById('projectEndDate').value = project.endDate || '';
        document.getElementById('projectStatus').value = project.status;
        
        document.getElementById('projectFormTitle').textContent = 'Edit Project';
        document.getElementById('projectFormContainer').style.display = 'block';
    } catch (error) {
        console.error('Error loading project:', error);
    }
}

async function deleteProject(id) {
    if (!confirm('Are you sure you want to delete this project?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            loadProjects();
            alert('Project deleted successfully!');
        } else {
            alert('Error deleting project');
        }
    } catch (error) {
        console.error('Error deleting project:', error);
        alert('Error deleting project');
    }
}

// Allocations Section
async function loadAllocations() {
    try {
        const response = await fetch(`${API_BASE_URL}/allocations`);
        const allocations = await response.json();
        displayAllocations(allocations);
    } catch (error) {
        console.error('Error loading allocations:', error);
    }
}

function displayAllocations(allocations) {
    const container = document.getElementById('allocationsTable');
    
    if (allocations.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No allocations found. Click "Add Allocation" to create one.</p></div>';
        return;
    }
    
    let html = `
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>User</th>
                    <th>Project</th>
                    <th>Allocation %</th>
                    <th>Working Status</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Remarks</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    allocations.forEach(allocation => {
        const workingClass = allocation.isWorking ? 'working-yes' : 'working-no';
        const workingText = allocation.isWorking ? 'Working' : 'Not Working';
        
        html += `
            <tr>
                <td>${allocation.id}</td>
                <td>${allocation.user.name}</td>
                <td>${allocation.project.name}</td>
                <td>${allocation.allocationPercentage}%</td>
                <td><span class="status-badge ${workingClass}">${workingText}</span></td>
                <td>${allocation.allocationStartDate || 'N/A'}</td>
                <td>${allocation.allocationEndDate || 'N/A'}</td>
                <td>${allocation.remarks || 'N/A'}</td>
                <td>
                    <button class="btn-edit" onclick="editAllocation(${allocation.id})">Edit</button>
                    <button class="btn-delete" onclick="deleteAllocation(${allocation.id})">Delete</button>
                </td>
            </tr>
        `;
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
}

async function loadUsersForDropdown() {
    try {
        const response = await fetch(`${API_BASE_URL}/users`);
        const users = await response.json();
        
        const select = document.getElementById('allocationUserId');
        select.innerHTML = '<option value="">Select User</option>';
        
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = `${user.name} (${user.email})`;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading users for dropdown:', error);
    }
}

async function loadProjectsForDropdown() {
    try {
        const response = await fetch(`${API_BASE_URL}/projects`);
        const projects = await response.json();
        
        const select = document.getElementById('allocationProjectId');
        select.innerHTML = '<option value="">Select Project</option>';
        
        projects.forEach(project => {
            const option = document.createElement('option');
            option.value = project.id;
            option.textContent = project.name;
            select.appendChild(option);
        });
    } catch (error) {
        console.error('Error loading projects for dropdown:', error);
    }
}

function showAllocationForm() {
    document.getElementById('allocationFormContainer').style.display = 'block';
    document.getElementById('allocationFormTitle').textContent = 'Add New Allocation';
    document.getElementById('allocationForm').reset();
    document.getElementById('allocationId').value = '';
}

function cancelAllocationForm() {
    document.getElementById('allocationFormContainer').style.display = 'none';
    document.getElementById('allocationForm').reset();
}

async function saveAllocation(event) {
    event.preventDefault();
    
    const allocationId = document.getElementById('allocationId').value;
    
    const allocation = {
        user: {
            id: parseInt(document.getElementById('allocationUserId').value)
        },
        project: {
            id: parseInt(document.getElementById('allocationProjectId').value)
        },
        allocationPercentage: parseFloat(document.getElementById('allocationPercentage').value),
        isWorking: document.getElementById('allocationIsWorking').value === 'true',
        allocationStartDate: document.getElementById('allocationStartDate').value || null,
        allocationEndDate: document.getElementById('allocationEndDate').value || null,
        remarks: document.getElementById('allocationRemarks').value
    };
    
    try {
        let url, method;
        if (allocationId) {
            url = `${API_BASE_URL}/allocations/${allocationId}`;
            method = 'PUT';
            // For update, we don't need to send user and project
            delete allocation.user;
            delete allocation.project;
        } else {
            url = `${API_BASE_URL}/allocations`;
            method = 'POST';
        }
        
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(allocation)
        });
        
        if (response.ok) {
            cancelAllocationForm();
            loadAllocations();
            alert(allocationId ? 'Allocation updated successfully!' : 'Allocation created successfully!');
        } else {
            alert('Error saving allocation');
        }
    } catch (error) {
        console.error('Error saving allocation:', error);
        alert('Error saving allocation');
    }
}

async function editAllocation(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/allocations/${id}`);
        const allocation = await response.json();
        
        document.getElementById('allocationId').value = allocation.id;
        document.getElementById('allocationUserId').value = allocation.user.id;
        document.getElementById('allocationProjectId').value = allocation.project.id;
        document.getElementById('allocationPercentage').value = allocation.allocationPercentage;
        document.getElementById('allocationIsWorking').value = allocation.isWorking.toString();
        document.getElementById('allocationStartDate').value = allocation.allocationStartDate || '';
        document.getElementById('allocationEndDate').value = allocation.allocationEndDate || '';
        document.getElementById('allocationRemarks').value = allocation.remarks || '';
        
        document.getElementById('allocationFormTitle').textContent = 'Edit Allocation';
        document.getElementById('allocationFormContainer').style.display = 'block';
    } catch (error) {
        console.error('Error loading allocation:', error);
    }
}

async function deleteAllocation(id) {
    if (!confirm('Are you sure you want to delete this allocation?')) {
        return;
    }
    
    try {
        const response = await fetch(`${API_BASE_URL}/allocations/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            loadAllocations();
            alert('Allocation deleted successfully!');
        } else {
            alert('Error deleting allocation');
        }
    } catch (error) {
        console.error('Error deleting allocation:', error);
        alert('Error deleting allocation');
    }
}

// Project Details Modal
async function showProjectDetails(projectId) {
    try {
        // Fetch project details
        const projectResponse = await fetch(`${API_BASE_URL}/projects/${projectId}`);
        const project = await projectResponse.json();
        
        // Fetch allocations for this project
        const allocationsResponse = await fetch(`${API_BASE_URL}/allocations/project/${projectId}`);
        const allocations = await allocationsResponse.json();
        
        // Populate modal
        document.getElementById('projectDetailsTitle').textContent = project.name;
        
        const statusClass = project.status.toLowerCase().replace('_', '');
        document.getElementById('projectDetailsInfo').innerHTML = `
            <p><strong>Description:</strong> ${project.description || 'N/A'}</p>
            <p><strong>Project Manager:</strong> ${project.projectManager || 'N/A'}</p>
            <p><strong>Start Date:</strong> ${project.startDate || 'N/A'}</p>
            <p><strong>End Date:</strong> ${project.endDate || 'N/A'}</p>
            <p><strong>Status:</strong> <span class="status-badge status-${statusClass}">${project.status}</span></p>
            <p><strong>Team Size:</strong> ${allocations.length} member(s)</p>
        `;
        
        // Display team members
        if (allocations.length === 0) {
            document.getElementById('projectTeamTable').innerHTML = '<div class="empty-state"><p>No team members assigned</p></div>';
        } else {
            let teamHtml = `
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Department</th>
                            <th>Allocation %</th>
                            <th>Status</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            allocations.forEach(allocation => {
                const workingClass = allocation.isWorking ? 'working-yes' : 'working-no';
                const workingText = allocation.isWorking ? 'Working' : 'Not Working';
                
                teamHtml += `
                    <tr class="clickable-row" onclick="closeProjectDetails(); showUserHistory(${allocation.user.id});">
                        <td>${allocation.user.name}</td>
                        <td>${allocation.user.role || 'N/A'}</td>
                        <td>${allocation.user.department || 'N/A'}</td>
                        <td>${allocation.allocationPercentage}%</td>
                        <td><span class="status-badge ${workingClass}">${workingText}</span></td>
                        <td>${allocation.allocationStartDate || 'N/A'}</td>
                        <td>${allocation.allocationEndDate || 'N/A'}</td>
                        <td>${allocation.remarks || 'N/A'}</td>
                    </tr>
                `;
            });
            
            teamHtml += '</tbody></table>';
            document.getElementById('projectTeamTable').innerHTML = teamHtml;
        }
        
        // Show modal
        document.getElementById('projectDetailsModal').style.display = 'block';
    } catch (error) {
        console.error('Error loading project details:', error);
        alert('Error loading project details');
    }
}

function closeProjectDetails() {
    document.getElementById('projectDetailsModal').style.display = 'none';
}

// User History Modal
async function showUserHistory(userId) {
    try {
        // Fetch user details
        const userResponse = await fetch(`${API_BASE_URL}/users/${userId}`);
        const user = await userResponse.json();
        
        // Fetch allocations for this user
        const allocationsResponse = await fetch(`${API_BASE_URL}/allocations/user/${userId}`);
        const allocations = await allocationsResponse.json();
        
        // Calculate total allocation
        const activeAllocations = allocations.filter(a => a.isWorking);
        const totalAllocation = activeAllocations.reduce((sum, a) => sum + a.allocationPercentage, 0);
        
        // Populate modal
        document.getElementById('userHistoryTitle').textContent = user.name;
        
        document.getElementById('userHistoryInfo').innerHTML = `
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Department:</strong> ${user.department || 'N/A'}</p>
            <p><strong>Role:</strong> ${user.role || 'N/A'}</p>
            <p><strong>Total Active Allocation:</strong> ${totalAllocation}%</p>
            <p><strong>Active Projects:</strong> ${activeAllocations.length}</p>
            <p><strong>Total Projects (All Time):</strong> ${allocations.length}</p>
        `;
        
        // Display allocation history
        if (allocations.length === 0) {
            document.getElementById('userHistoryTable').innerHTML = '<div class="empty-state"><p>No allocation history found</p></div>';
        } else {
            let historyHtml = `
                <table>
                    <thead>
                        <tr>
                            <th>Project</th>
                            <th>Allocation %</th>
                            <th>Status</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Project Status</th>
                            <th>Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            // Sort by start date (newest first)
            allocations.sort((a, b) => {
                const dateA = a.allocationStartDate || '1900-01-01';
                const dateB = b.allocationStartDate || '1900-01-01';
                return dateB.localeCompare(dateA);
            });
            
            allocations.forEach(allocation => {
                const workingClass = allocation.isWorking ? 'working-yes' : 'working-no';
                const workingText = allocation.isWorking ? 'Working' : 'Not Working';
                const projectStatusClass = allocation.project.status.toLowerCase().replace('_', '');
                
                historyHtml += `
                    <tr class="clickable-row" onclick="closeUserHistory(); showProjectDetails(${allocation.project.id});">
                        <td>${allocation.project.name}</td>
                        <td>${allocation.allocationPercentage}%</td>
                        <td><span class="status-badge ${workingClass}">${workingText}</span></td>
                        <td>${allocation.allocationStartDate || 'N/A'}</td>
                        <td>${allocation.allocationEndDate || 'N/A'}</td>
                        <td><span class="status-badge status-${projectStatusClass}">${allocation.project.status}</span></td>
                        <td>${allocation.remarks || 'N/A'}</td>
                    </tr>
                `;
            });
            
            historyHtml += '</tbody></table>';
            document.getElementById('userHistoryTable').innerHTML = historyHtml;
        }
        
        // Show modal
        document.getElementById('userHistoryModal').style.display = 'block';
    } catch (error) {
        console.error('Error loading user history:', error);
        alert('Error loading user history');
    }
}

function closeUserHistory() {
    document.getElementById('userHistoryModal').style.display = 'none';
}

// Close modals when clicking outside
window.onclick = function(event) {
    const projectModal = document.getElementById('projectDetailsModal');
    const userModal = document.getElementById('userHistoryModal');
    
    if (event.target == projectModal) {
        closeProjectDetails();
    }
    if (event.target == userModal) {
        closeUserHistory();
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    loadDashboard();
});

