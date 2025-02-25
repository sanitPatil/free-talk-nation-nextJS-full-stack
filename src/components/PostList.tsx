"use client";
import * as React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "./ui/button";

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
);

function PostList() {
  return (
    <ScrollArea className="h-96 w-full rounded-md ">
      <div className="p-4">
        <h4 className="flex justify-between mx-4 mb-2 ">
          <Button>Refresh</Button>
        </h4>
        {tags.map((tag) => (
          <div key={tag}>
            <div className="text-sm font-bold">{tag}</div>
            <Separator className="my-2" />
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}

export default PostList;
