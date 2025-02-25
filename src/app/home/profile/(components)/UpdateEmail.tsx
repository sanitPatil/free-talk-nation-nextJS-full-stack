import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Edit, SendIcon, XIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function UpdateEmail() {
  const [Email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        className="bg-gray-800 text-white hover:bg-gray-700"
      >
        <Edit className="w-5 h-5" />
      </Button>

      {showModal && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4"
        >
          <Card className="w-full max-w-md bg-gray-800 text-white p-4 rounded-2xl shadow-xl">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Update Email</h3>
              <button onClick={() => setShowModal(false)}>
                <XIcon className="w-5 h-5 text-white" />
              </button>
            </div>

            <CardContent className="mt-4 space-y-4">
              <Input
                placeholder="Enter new Email"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-lg p-2 bg-gray-700 text-white"
              />
            </CardContent>

            <div className="flex justify-end text-black">
              <Button
                disabled={!Email}
                variant="outline"
                className="flex items-center font-bold space-x-2 border   hover:bg-gray-700"
              >
                <SendIcon className="w-4 h-4 " />
                <span>Update</span>
              </Button>
            </div>
          </Card>
        </motion.div>
      )}
    </>
  );
}
