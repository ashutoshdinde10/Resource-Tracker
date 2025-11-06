import React, { useState, useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { fetchUsers, createUser } from '../services/api';
import AddUserForm from '../forms/AddUserForm/AddUserForm';
import { IUser, IAddUserForm } from '../types/Users.types';

function Users() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const data = await fetchUsers();
      setUsers(data);
    } catch (err) {
      console.error('Error loading users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (formData: IAddUserForm) => {
    try {
      await createUser(formData);
      setIsFormOpen(false);
      loadUsers();
    } catch (err) {
      console.error('Error creating user:', err);
      alert('Failed to create user');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading users...</div>;
  }

  return (
    <div className="users-section">
      <div className="mb-4 flex justify-between items-center">
        <h2 className="text-2xl font-bold">Users</h2>
        {/* @ts-expect-error - Button accepts children via forwardRef props spread */}
        <Button 
          onClick={() => setIsFormOpen(true)}
          className="bg-black text-white hover:bg-black hover:text-white"
        >
          Add User
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-black">
              <TableHead className="bg-black text-white hover:bg-black">Name</TableHead>
              <TableHead className="bg-black text-white hover:bg-black">Email</TableHead>
              <TableHead className="bg-black text-white hover:bg-black">Department</TableHead>
              <TableHead className="bg-black text-white hover:bg-black">Skill</TableHead>
              <TableHead className="bg-black text-white hover:bg-black">Role</TableHead>
              <TableHead className="bg-black text-white hover:bg-black">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  No users found
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>{user.skill}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {/* @ts-expect-error - Button accepts children via forwardRef props spread */}
                      <Button size="sm" variant="ghost">
                        Edit
                      </Button>
                      {/* @ts-expect-error - Button accepts children via forwardRef props spread */}
                      <Button size="sm" variant="destructive">
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
        {/* @ts-expect-error - DialogContent accepts children via forwardRef props spread */}
        <DialogContent className="max-w-md">
          {/* @ts-expect-error - DialogHeader accepts children via forwardRef props spread */}
          <DialogHeader>
            {/* @ts-expect-error - DialogTitle accepts children via forwardRef props spread */}
            <DialogTitle>Add New User</DialogTitle>
          </DialogHeader>
          <AddUserForm
            onSubmit={handleAddUser}
            onCancel={() => setIsFormOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Users;
