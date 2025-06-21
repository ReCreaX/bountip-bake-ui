import React, { useState } from "react";
import { Modal } from "../ui/Modal";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { Eye, EyeOff } from "lucide-react";
import SettingFiles from "@/assets/icons/settings";

interface PasswordSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PasswordSettingsModal: React.FC<PasswordSettingsModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [requirements, setRequirements] = useState({
    minLength: false,
    hasNumber: false,
    hasSpecial: false,
  });

  const handlePasswordChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    if (field === 'newPassword') {
      setRequirements({
        minLength: value.length >= 8,
        hasNumber: /\d/.test(value),
        hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password update
    onClose();
  };

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <Modal
      image={SettingFiles.PasswordSettingsIcon}
      isOpen={isOpen}
      onClose={onClose}
      title="Password Settings"
      subtitle="Create and change your password here"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <Input
            label="Current Password"
            type={showPasswords.current ? "text" : "password"}
            value={formData.currentPassword}
            onChange={(e) => handlePasswordChange("currentPassword", e.target.value)}
            placeholder="Enter current password"
          />
          <button
            type="button"
            className="absolute right-3 top-8 text-gray-400"
            onClick={() => togglePasswordVisibility('current')}
          >
            {showPasswords.current ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="relative">
          <Input
            label="New Password"
            type={showPasswords.new ? "text" : "password"}
            value={formData.newPassword}
            onChange={(e) => handlePasswordChange("newPassword", e.target.value)}
            placeholder="Enter new password"
          />
          <button
            type="button"
            className="absolute right-3 top-8 text-gray-400"
            onClick={() => togglePasswordVisibility('new')}
          >
            {showPasswords.new ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-gray-700">Password Requirements:</h4>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${requirements.minLength ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span className={`text-sm ${requirements.minLength ? 'text-green-600' : 'text-gray-500'}`}>
                Password Must have 8 or Characters Long
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${requirements.hasNumber ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span className={`text-sm ${requirements.hasNumber ? 'text-green-600' : 'text-gray-500'}`}>
                Password Must have at least one special character eg: @,#,!,?
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${requirements.hasSpecial ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span className={`text-sm ${requirements.hasSpecial ? 'text-green-600' : 'text-gray-500'}`}>
                Password Must have at least one special character eg: @,#,!,?
              </span>
            </div>
          </div>
        </div>

        <div className="relative">
          <Input
            label="Confirm Password"
            type={showPasswords.confirm ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) => handlePasswordChange("confirmPassword", e.target.value)}
            placeholder="Confirm new password"
          />
          <button
            type="button"
            className="absolute right-3 top-8 text-gray-400"
            onClick={() => togglePasswordVisibility('confirm')}
          >
            {showPasswords.confirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <Button type="submit" className="w-full">
          Update Password
        </Button>
      </form>
    </Modal>
  );
};