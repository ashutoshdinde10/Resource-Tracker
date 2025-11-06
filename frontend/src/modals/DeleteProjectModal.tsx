import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "../components/ui/dialog";
import { Button } from "../components/ui/button";

interface DeleteProjectModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const DeleteProjectModal = ({ open, setOpen }: DeleteProjectModalProps) => {
    return (

        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Delete Project</DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Are you sure you want to delete this project?
                </DialogDescription>
                <DialogFooter>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button>Delete</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteProjectModal;