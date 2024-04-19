import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SubscriptionPlanPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
 const navigate=useNavigate();
  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    console.log(plan);
    navigate(`/subscription/${plan._id}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/superAdminPlan/getAllPlans`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const data = await response.json();
        console.log(data);
        setSubscriptionPlans(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Adjust breakpoint as needed
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check on component mount

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handlePayment = () => {
    // Implement your payment logic here
    if (selectedPlan) {
      alert(`You have selected ${selectedPlan.planName}. Proceed with payment...`);
      // Redirect to payment gateway or initiate payment process
    } else {
      alert('Please select a subscription plan.');
    }
  };

  return (
    <div className="p-6 mt-10 max-w-3xl mx-auto bg-white rounded-xl shadow-md">
      <h1 className="text-2xl font-bold mb-4">Choose a Subscription Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {subscriptionPlans.map((plan, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">{plan.planName}</h2>
            <p className="text-gray-600 mb-2">{plan.description}</p>
            <ul className="list-disc ml-6 mb-4">
              <li className="text-gray-600">Features: {plan.features}</li>
              <li className="text-gray-600">Resolution: {plan.resolution}</li>
              <li className="text-gray-600">Price: ${plan.price}/month</li>
              <li className="text-gray-600">Data Reduction Factor: {plan.dataReductionFactor}</li>
              <li className="text-gray-600">Max Devices: {plan.maxDevices}</li>
              <li className="text-gray-600">Duration: {plan.duration} days </li>
            </ul>
            <button onClick={() => handlePlanSelect(plan)} className={`w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${selectedPlan === plan ? 'opacity-50 cursor-not-allowed' : ''}`}>
              {selectedPlan === plan ? 'Selected' : 'Select Plan'}
            </button>
          </div>
        ))}
      </div>
      <button onClick={handlePayment} className="mt-8 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full">
        Proceed to Payment
      </button>
    </div>
  );
};

export default SubscriptionPlanPage;
