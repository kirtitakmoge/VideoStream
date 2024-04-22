import React, { useState } from 'react';


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
      // Your fetch request here
    } catch (error) {
      console.error('Error creating subscription plan:', error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <div className="container mx-auto mt-2">
      <div className="max-w-md mx-auto bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-3 text-center">Create Subscription Plan</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="planName" className="block font-medium">Plan Name</label>
            <input
              type="text"
              id="planName"
              name="planName"
              value={formData.planName}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block font-medium">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="features" className="block font-medium">Features</label>
            <input
              type="text"
              id="features"
              name="features"
              value={formData.features}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="resolution" className="block font-medium">Resolution</label>
            <input
              type="text"
              id="resolution"
              name="resolution"
              value={formData.resolution}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="duration" className="block font-medium">Duration (in months)</label>
            <input
              type="number"
              id="duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="price" className="block font-medium">Price</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="dataReductionFactor" className="block font-medium">Data Reduction Factor</label>
            <input
              type="number"
              id="dataReductionFactor"
              name="dataReductionFactor"
              value={formData.dataReductionFactor}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label htmlFor="maxDevices" className="block font-medium">Max Devices</label>
            <input
              type="number"
              id="maxDevices"
              name="maxDevices"
              value={formData.maxDevices}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-3 py-2 rounded w-full mt-2 hover:bg-blue-600">Create Plan</button>
        </form>
      </div>
    </div>
  );
};

export default CreateSubscriptionPlan;
