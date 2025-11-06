import React, { useState } from 'react';
import { Table, TableHeader, TableRow, TableCell, TableBody, TableHead } from '../components/ui/table';
import { Button } from '../components/ui/button';
import AddEditProjectModal from '../modals/AddEditProjectModal';
import DeleteProjectModal from '../modals/DeleteProjectModal';
import { Input } from '../components/ui/input';

function Projects() {

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'add' | 'edit'>('add');
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleEdit = () => {
    setMode('edit');
    setOpen(true);
  }

  const handleAdd = () => {
    setMode('add');
    setOpen(true);
  }
  return (
    <>
      <div className="p-5">
        <div className="flex justify-between items-center mb-6">
          <Input type="text" placeholder="Search Projects" className="w-1/2" />

          <Button variant="outline" onClick={handleAdd}>
            + Add Project
          </Button>
        </div>

        <div className="border overflow-hidden h-[600px] flex flex-col">
          <Table className="h-full">
            <TableHeader className="bg-black text-white sticky top-0 z-10">
              <TableRow className="bg-black text-white hover:bg-black">
                {["Project Name", "Description", "Start Date", "End Date", "Status", "Actions"].map((head) => (
                  <TableHead key={head} className="bg-black text-white hover:bg-black">{head}</TableHead>
                ))}
              </TableRow>
            </TableHeader>

            <TableBody>
              <TableRow className="hover:bg-transparent transition-none">
                <TableCell>Project Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={handleEdit}>Edit</Button>
                    <Button variant="outline" onClick={() => setDeleteModalOpen(true)}>Delete</Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>

      <AddEditProjectModal
        open={open}
        setOpen={setOpen}
        mode={mode} 
        />

      <DeleteProjectModal
        open={deleteModalOpen}
        setOpen={setDeleteModalOpen}
      />
    </>
  );
}

export default Projects;
