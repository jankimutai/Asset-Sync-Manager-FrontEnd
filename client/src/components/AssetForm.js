import React, { useState } from 'react';
import '../Styles/asset-form.css';
import Swal from 'sweetalert2';
import { useAuth } from './AuthContext';
const AssetForm = ({onClose}) => {
  const {triggerRefresh} = useAuth()
  const [formData, setFormData] = useState({
    assetName: '',
    model: '',
    // datePurchased: '',
    purchaseCost: '',
    imageUrl: '',
    manufacturer: '',
    status: '',
    category: '',
    serialNumber: '',
  });

  const handleCreateAsset = async () => {
    if (!formData.assetName || !formData.model || !formData.purchaseCost || !formData.imageUrl ||
      !formData.manufacturer ||
      !formData.status ||
      !formData.category ||
      !formData.serialNumber)  {
      Swal.fire({
        title: 'Error!',
        text: 'Please fill in all required fields.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
      return;
    }

    try {
      const response = await fetch('http://localhost:5555/assets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        // Use status code for error handling
        const statusCode = response.status;
        throw new Error(`Error creating asset: ${statusCode}`);
      }

      // Show success message using SweetAlert
      Swal.fire({
        title: 'Success!',
        text: 'Asset created successfully',
        icon: 'success',
        confirmButtonText: 'OK',
      });

      setFormData({
        assetName: '',
        model: '',
        // datePurchased: '',
        purchaseCost: '',
        imageUrl: '',
        manufacturer: '',
        status: '',
        category: '',
        serialNumber: '',
      });
    } catch (error) {
      console.error(error.message);
      // Show error message using SweetAlert
      Swal.fire({
        title: 'Error!',
        text: `Failed to create asset: ${error.message}`,
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className="overlay">
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleCreateAsset();
        }}
        className="mb-10"
      >
        <h1 className="text-2xl font-bold mb-4">Create Asset</h1>
        <button 
          type="button" 
          onClick={onClose}
          className="bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
          <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
        <div>
        <label>
          Asset Name:
          <input
            className="input"
            type="text"
            value={formData.assetName}
            onChange={(e) => setFormData({ ...formData, assetName: e.target.value })}
            required
          />
        </label>
        
        <label>
          Model:
          <input
            className="input"
            type="text"
            value={formData.model}
            onChange={(e) => setFormData({ ...formData, model: e.target.value })}
            required
          />
        </label>
        </div>
        
        <label className="label">
          Purchase Cost:
          <input
            className="input"
            type="number"
            value={formData.purchaseCost}
            onChange={(e) => setFormData({ ...formData, purchaseCost: e.target.value })}
            required
          />
        </label>
     
        <label className="label">
          Image URL:
          <input
            className="input"
            type="url"
            value={formData.imageUrl}
            onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
          />
        </label>
      
        <label className="label">
          Manufacturer:
          <input
            className="input"
            type="text"
            value={formData.manufacturer}
            onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
          />
        </label>
     

        <label className="label">
          Status:
          <select
            className="select"
            value={formData.status}
            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          >
            <option value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Under Maintenance">Under Maintenance</option>
          </select>
        </label>
    

        <label className="label">
          Category:
          <input
            className="input"
            type="text"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          />
        </label>
        
        <label className="label">
          Serial Number:
          <input
            className="input"
            type="text"
            value={formData.serialNumber}
            onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
          />
        </label>
      
        <button type="submit" className="custom-button">
          Create Asset
        </button>
      </form>
      </div>
    </div>
  );
};

export default AssetForm;
