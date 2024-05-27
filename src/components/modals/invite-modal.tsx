"use client";

import { Check, Copy, RefreshCw } from "lucide-react";
import { useState } from "react";
import axios from "axios";

import { useModal } from "@/hooks/use-modal-store";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useOrigin } from "@/hooks/use-origin";

export const InviteModal = () => {
  const { isOpen, onOpen, onClose, type, data } = useModal();
  const origin = useOrigin();

  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const { server } = data;
  const inviteLink = `${origin}/invite/${server?.inviteCode}`;

  const isModalOpen = isOpen && type === "invite";

  const onCopy = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const newGenerate = async () => {
    try {
      setLoading(true);
      const response = await axios.patch(
        `/api/servers/${server?.id}/invite-code`
      );
      onOpen("invite", { server: response.data });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Invite Friends
          </DialogTitle>
        </DialogHeader>
        <div className="p-6">
          <Label className="text-xs uppercase font-bold text-zinc-500 dark:text-secondary/70 ">
            Server Invite Link
          </Label>
          <div className="flex item-center mt-2 gap-x-2">
            <Input
              className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0"
              value={inviteLink}
              disabled={loading}
            />
            <Button size="icon" onClick={onCopy} disabled={loading}>
              {copied ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </Button>
          </div>
          <Button
            variant="link"
            size="sm"
            className="text-xs text-zinc-500 mt-4"
            disabled={loading}
            onClick={newGenerate}
          >
            Generate a new link
            <RefreshCw className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
