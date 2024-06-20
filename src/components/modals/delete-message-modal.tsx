"use client";

import { useState } from "react";
import axios from "axios";
import qs from "query-string";

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

export const DeleteMessageModal = () => {
  const { isOpen, onClose, type, data } = useModal();

  const [loading, setLoading] = useState(false);

  const { apiUrl, query } = data;

  const isModalOpen = isOpen && type === "deleteMessage";

  const onDeleteServer = async () => {
    try {
      setLoading(true);
      const url = qs.stringifyUrl({
        url: apiUrl ?? "",
        query,
      });

      await axios.delete(url);

      onClose();
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
            Delete Message
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            Are you sure you want to do this? <br />
            The message will be permanently deleted.
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
