import SettingFiles from "@/assets/icons/settings";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import { useState } from "react";
import { Input } from "../ui/Input";

export const AccountSettingsModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
  }> = ({ isOpen, onClose }) => {
    const [activeTab, setActiveTab] = useState<'taxes' | 'service'>('taxes');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [taxes, setTaxes] = useState([
      { name: "VAT", rate: 7.5, includeInMenu: true, applyOnOrder: false, applyToAll: true }
    ]);
  
    return (
      <Modal
        image={SettingFiles.AccountSettings}
        isOpen={isOpen}
        onClose={onClose}
        title="Account Settings"
        subtitle="Manage your Business tax and service Charge"
      >
        <div className="space-y-6">
          <div className="flex border-b">
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === 'taxes' 
                  ? 'text-green-600 border-b-2 border-green-600' 
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('taxes')}
            >
              Taxes
            </button>
            <button
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === 'service' 
                  ? 'text-green-600 border-b-2 border-green-600' 
                  : 'text-gray-500'
              }`}
              onClick={() => setActiveTab('service')}
            >
              Service Charge
            </button>
          </div>
  
          {activeTab === 'taxes' && (
            <div className="space-y-4">
              {taxes.map((tax, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <Input label="Tax Name" value={tax.name} onChange={() => {}} />
                    <Input label="Tax Rate (%)" value={tax.rate.toString()} onChange={() => {}} />
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={tax.includeInMenu} onChange={() => {}} />
                      <label className="text-sm">Include Tax In Menu Prices</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={tax.applyOnOrder} onChange={() => {}} />
                      <label className="text-sm">Apply Tax on order checkout</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={tax.applyOnOrder} onChange={() => {}} />
                      <label className="text-sm">Apply Tax on order checkout (optional)</label>
                    </div>
                  </div>
  
                  <div className="mt-4">
                    <h5 className="font-medium mb-2">Product Setup</h5>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <input type="radio" name="productSetup" checked={tax.applyToAll} onChange={() => {}} />
                        <label className="text-sm">Apply to all products</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input type="radio" name="productSetup" checked={!tax.applyToAll} onChange={() => {}} />
                        <label className="text-sm">Apply to certain products</label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              <Button variant="secondary" className="w-full">
                + Add a new Tax
              </Button>
              
              <Button className="w-full">
                Save Tax
              </Button>
            </div>
          )}
        </div>
      </Modal>
    );
  };