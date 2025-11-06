import React, { useState } from 'react';
import { Button } from '../../components/ui/button';
import { Label } from '../../components/ui/label';
import { IAddUserForm } from '../../types/Users.types';
import { IAddUserFormProps } from './IAddUserForm';

function AddUserForm({ onSubmit, onCancel }: IAddUserFormProps) {
  const [formData, setFormData] = useState<IAddUserForm>({
    name: '',
    email: '',
    department: '',
    role: '',
    skill: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name *</Label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="department">Department *</Label>
        <input
          id="department"
          name="department"
          type="text"
          value={formData.department}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="role">Role *</Label>
        <input
          id="role"
          name="role"
          type="text"
          value={formData.role}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end gap-2 pt-4">
        {/* @ts-expect-error - Button accepts children via forwardRef props spread */}
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        {/* @ts-expect-error - Button accepts children via forwardRef props spread */}
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
}

export default AddUserForm;

