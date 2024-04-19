import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SubscriptionDetailsPage = () => {
  const { id } = useParams();
  const [plan, setPlan] = useState(null);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/superAdminPlan/getPlanById/${id}`);
        if (response.ok) {
          const planData = await response.json();
          setPlan(planData);
        } else {
          console.error('Failed to fetch plan');
        }
      } catch (error) {
        console.error('An error occurred while fetching plan:', error.message);
      }
    };

    const fetchSubscription = async () => {
      try {
        const uid = localStorage.getItem("id");
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/usersubscription/createSubscription/${uid}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ subscriptionId: id }),
        });
  
        if (response.ok) {
          const subscriptionData = await response.json();
          setSubscription(subscriptionData);
        } else {
          console.error('Failed to fetch subscription');
        }
      } catch (error) {
        console.error('An error occurred while fetching subscription:', error.message);
      }
    };

    fetchPlan();
    fetchSubscription();
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const handleSubscribe = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/createSubscription/65ed4769c351559d4f542034`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subscriptionId: id }),
      });

      if (response.ok) {
        console.log('Subscription successful');
      } else {
        console.error('Subscription failed');
      }
    } catch (error) {
      console.error('An error occurred during subscription:', error.message);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Subscription Details</h2>
      {plan && subscription ? (
        <div>
          <div className="bg-gray-100 p-4 mb-4">
            <h3 className="text-xl font-bold mb-2">Plan Details</h3>
            <p><span className="font-bold">Name:</span> {plan.planName}</p>
            <p><span className="font-bold">Description:</span> {plan.description}</p>
            
            <p><span className="font-bold">Features</span> {plan.features} days</p>
            <p><span className="font-bold">Resolution</span> {plan.resolution}</p>

            <p><span className="font-bold">Price:</span> {plan.price}</p>

          </div>

          <div className="bg-gray-100 p-4 mb-4">
            <h3 className="text-xl font-bold mb-2">User Subscription Details</h3>
            <p><span className="font-bold">User Name:</span> {localStorage.getItem("username")}</p>
            <p><span className="font-bold">Start Date:</span> {formatDate(subscription.startDate)}</p>
            <p><span className="font-bold">End Date:</span> {formatDate(subscription.endDate)}</p>
             <p><span className="font-bold">Data Limit:</span>{plan.dataLimit} </p>
          </div>

          <button onClick={handleSubscribe} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Subscribe
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default SubscriptionDetailsPage;
