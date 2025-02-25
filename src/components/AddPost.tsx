import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { ImageIcon, VideoIcon, FileIcon, SendIcon, XIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function AddPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)} className="">
        Add Post
      </Button>

      {showModal && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4"
        >
          <Card className="w-full max-w-5xl bg-gray-800 text-white p-4 rounded-2xl shadow-xl">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-center  w-full">
                Create Post
              </h3>
              <button onClick={() => setShowModal(false)}>
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            <CardContent className="mt-4 space-y-4">
              <Input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded-lg p-2"
              />
              <Textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded-lg p-2"
              />

              <div className="flex space-x-3 text-gray-500">
                <button>
                  <ImageIcon className="w-5 h-5" />
                </button>
                <button>
                  <VideoIcon className="w-5 h-5" />
                </button>
                <button>
                  <FileIcon className="w-5 h-5" />
                </button>
              </div>

              <input
                type="file"
                multiple
                onChange={(e) => setFiles(e.target.files)}
                className="w-full border rounded-lg p-2"
              />

              <div className="flex justify-end">
                <Button
                  disabled={!title || !description}
                  variant={"outline"}
                  className="flex items-center font-bold space-x-2 text-black"
                >
                  <SendIcon className="w-4 h-4" />
                  <span className="">Post</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </>
  );
}
