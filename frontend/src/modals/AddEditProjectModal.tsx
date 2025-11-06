import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { DialogDescription } from '@radix-ui/react-dialog';


interface AddEditProjectProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    mode: 'add' | 'edit';
}

const AddEditProjectModal = ({ open, setOpen, mode }: AddEditProjectProps) => {
    return (
        <Dialog open={open} onOpenChange={setOpen}>

            <DialogContent className="max-w-md">
                <DialogHeader className="flex flex-col gap-2">
                    <DialogTitle>
                        {mode === 'add' ? 'Add Project' : 'Edit Project'}
                    </DialogTitle>
                </DialogHeader>

                <DialogDescription>

                </DialogDescription>

                <DialogFooter>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button>Save</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default AddEditProjectModal;