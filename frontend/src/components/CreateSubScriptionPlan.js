import React, { useState } from 'react';
import axios from 'axios'; // Assuming you're using axios for HTTP requests

const CreateSubscriptionPlan = () => {
  const [formData, setFormData] = useState({
    planName: '',
    description: '',
    features: '',
    resolution: '',
    dataLimit: 10,
    duration: '',
    price: '',
    dataReductionFactor: '',
    maxDevices: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/subscription-plans', formData);
      console.log('Subscription plan created:', response.data);
      // Optionally, redirect the user or show a success message
    } catch (error) {
      console.error('Error creating subscription plan:', error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Subscription Plan</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="planName">Plan Name</label>
          <input
            type="text"
            id="planName"
            name="planName"
            value={formData.planName}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="features">Features</label>
          <input
            type="text"
            id="features"
            name="features"
            value={formData.features}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="resolution">Resolution</label>
          <input
            type="text"
            id="resolution"
            name="resolution"
            value={formData.resolution}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="duration">Duration (in months)</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="dataReductionFactor">Data Reduction Factor</label>
          <input
            type="number"
            id="dataReductionFactor"
            name="dataReductionFactor"
            value={formData.dataReductionFactor}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="maxDevices">Max Devices</label>
          <input
            type="number"
            id="maxDevices"
            name="maxDevices"
            value={formData.maxDevices}
            onChange={handleChange}
            className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
          >
            Create Plan
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSubscriptionPlan;
