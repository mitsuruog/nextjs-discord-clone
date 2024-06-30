import { ElementRef, useEffect, useState } from "react";

interface UseChatScrollProps {
  topRef: React.RefObject<ElementRef<"div">>;
  bottomRef: React.RefObject<ElementRef<"div">>;
  shouldLoadMore: boolean;
  loadMore: () => void;
  count: number;
}

export const useChatScroll = ({
  topRef,
  bottomRef,
  shouldLoadMore,
  loadMore,
  count,
}: UseChatScrollProps) => {
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    const topDiv = topRef.current;

    const handleScroll = () => {
      if (!topDiv) {
        return;
      }

      const { scrollTop } = topDiv;

      if (scrollTop === 0 && shouldLoadMore) {
        loadMore();
      }
    };

    topDiv?.addEventListener("scroll", handleScroll);

    return () => {
      topDiv?.removeEventListener("scroll", handleScroll);
    };
  }, [topRef, shouldLoadMore, loadMore]);

  useEffect(() => {
    const bottomDiv = bottomRef.current;
    const topDiv = topRef.current;

    const shouldScrollToBottom = () => {
      if (!hasInitialized && bottomDiv) {
        setHasInitialized(true);
        return true;
      }

      if (!topDiv) {
        return false;
      }

      const distance =
        topDiv.scrollHeight - topDiv.clientHeight - topDiv.scrollTop;
      return distance <= 100;
    };

    if (shouldScrollToBottom()) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [topRef, bottomRef, count, hasInitialized]);
};
