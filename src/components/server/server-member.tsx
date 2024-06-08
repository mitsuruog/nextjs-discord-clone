"use client";

import { Server } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { UserAvatar } from "@/components/user-avatar";
import { MemberWithProfile } from "@/types";
import { roleIconMap } from "@/lib/icon-map";

interface ServerMemberProps {
  member: MemberWithProfile;
  server: Server;
}

export const ServerMember = ({ member, server }: ServerMemberProps) => {
  const router = useRouter();
  const params = useParams();

  const icon = roleIconMap[member.role];

  const onClick = () => {
    router.push(`/servers/${server.id}/conversations/${member.id}`);
  };

  return (
    <button
      className={cn(
        "group p-2 rounded-md flex items-center gap-x-2 w-full hover:border-zinc-700/10 dark:hover:border-zinc-700/50 transition",
        params?.memberId === member.id && "bg-zinc-700/20 dark:bg-zinc-700"
      )}
      onClick={() => onClick()}
    >
      <UserAvatar
        src={member.profile.imageUrl}
        className="h-8 w-8 md:w-8 md:h-8"
      />
      <p
        className={cn(
          "font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
          params?.memberId === member.id &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        {member.profile.name}
      </p>
      {icon}
    </button>
  );
};
