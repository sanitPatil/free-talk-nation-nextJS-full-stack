import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AddPost() {
  return (
    <div className=" bottom-4 bg-transparent backdrop-blur-md border-gray-500 p-3 flex justify-center">
      <Button className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2">
        <Plus size={20} />
        Add Post
      </Button>
    </div>
  );
}
