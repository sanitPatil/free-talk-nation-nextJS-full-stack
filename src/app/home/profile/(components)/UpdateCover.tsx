import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, ImageIcon, SendIcon, XIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function UpdateCoverImage() {
  const [coverImage, setCoverImage] = useState(null);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onClick={() => setShowModal(true)}>
        <Edit />
      </Button>

      {showModal && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4"
        >
          <Card className="w-full max-w-md  p-4 rounded-2xl shadow-xl bg-gray-800 text-white">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Cover Image Update</h3>
              <button onClick={() => setShowModal(false)}>
                <XIcon className="w-5 h-5" />
              </button>
            </div>

            <CardContent className="mt-4 space-y-4 ">
              <div className="text-gray-500">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <ImageIcon className="w-5 h-5" />
                  <span>Upload Cover Image</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCoverImage(e.target.files[0])}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="flex justify-end">
                <Button
                  className="flex items-center space-x-2"
                  disabled={!coverImage}
                >
                  <SendIcon className="w-4 h-4" />
                  <span>Update</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </>
  );
}
