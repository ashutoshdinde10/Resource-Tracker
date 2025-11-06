import React from 'react';
import { Table, TableHeader, TableRow, TableCell, TableBody, TableHead } from '../components/ui/table';
import { Button } from '../components/ui/button';

const Allocations = () => {
  
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {["User", "Project", "Allocation %", "SOW Number", "Team", "Start Date", "End Date", "Status", "Actions"].map((head) => (
            <TableHead key={head}>{head}</TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow>
          <TableCell>User</TableCell>
          <TableCell>Project</TableCell>
          <TableCell>Allocation %</TableCell>
          <TableCell>SOW Number</TableCell>
          <TableCell>Team</TableCell>
          <TableCell>Start Date</TableCell>
          <TableCell>End Date</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>
            <div className="flex gap-2">
              <Button variant="outline">Edit</Button>
              <Button variant="outline">Delete</Button>
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default Allocations;
