"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

import { useModal } from "@/hooks/use-modal-store";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const DeleteServerModal = () => {
  const { isOpen, onClose, type, data } = useModal();
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const { server } = data;

  const isModalOpen = isOpen && type === "deleteServer";

  const onDeleteServer = async () => {
    try {
      setLoading(true);

      await axios.delete(`/api/servers/${server?.id}`);

      onClose();
      router.push("/");
      router.refresh();
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Delete Server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to do this? <br />
            <span className="font-semibold text-indigo-500">
              {server?.name}
            </span>{" "}
            will be permanently deleted.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="bg-gray-100 px-6 py-4">
          <div className="flex items-center justify-between w-full">
            <Button disabled={loading} onClick={onClose} variant="ghost">
              Cancel
            </Button>
            <Button
              disabled={loading}
              onClick={onDeleteServer}
              variant="primary"
            >
              Confirm
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
