import SettingFiles from "@/assets/icons/settings";
import { Modal } from "../ui/Modal";
import { useState } from "react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

// InventoryHubModal.tsx
export const InventoryHubModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
  }> = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
      name: "",
      location: ""
    });
  
    return (
      <Modal
        image={SettingFiles.InventoryIcon}
        isOpen={isOpen}
        onClose={onClose}
        title="Inventory Hub"
        subtitle="Create a centralized Inventory Hub to manage your in items"
      >
        <div className="space-y-6">
          <Input
            label="Name your Inventory Hub"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            placeholder="Enter Your Inventory eg Main Warehouse"
          />
          
          <Input
            label="Location"
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            placeholder="Enter Location"
          />
          
          <Button className="w-full">
            Create Inventory Hub
          </Button>
        </div>
      </Modal>
    );
  };