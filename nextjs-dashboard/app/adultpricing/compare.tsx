import React from "react";

// Define types for the plan object
interface Plan {
  name: string;
  price: string;
  views: string;
  access: string;
  features: string;
  buttonText: string;
  buttonStyle: string;
}

const PricingPlans = () => {
  const plans: Plan[] = [
    {
      name: "Free",
      price: "$0/mo",
      views: "1,000 views/month",
      access: "Limited access",
      features: "Basic features",
      buttonText: "Get Started",
      buttonStyle: "bg-gray-300 text-neutral-300-700",
    },
    {
      name: "Premium",
      price: "$9.99/mo",
      views: "Unlimited views",
      access: "Full access",
      features: "Advanced features",
      buttonText: "Subscribe",
      buttonStyle: "bg-blue-600 text-white",
    },
    {
      name: "Enterprise",
      price: "$49.99/mo",
      views: "Unlimited views",
      access: "Full access + team support",
      features: "All premium features + custom solutions",
      buttonText: "Contact Us",
      buttonStyle: "bg-green-600 text-white",
    },
    {
      name: "GG",
      price: "$49.99/mo",
      views: "Unlimited views",
      access: "Full access + team support",
      features: "All premium features + custom solutions",
      buttonText: "Contact Us",
      buttonStyle: "bg-green-600 text-white",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white lg:pb-16 w-full">
      <h2 className="lg:text-5xl text-3xl font-bold text-neutral-300-900 text-center lg:p-8 pb-8">
        Compare Pricing Plans
      </h2>
      <div className="overflow-x-auto lg:px-24 w-full pt-12">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b border-gray-600 w-1/5"></th>
              {plans.map((plan, index) => (
                <th key={index} className="px-4 py-2 font-semibold border-b border-gray-600 w-1/5">
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              { label: "Price", key: "price" },
              { label: "Views per Month", key: "views" },
              { label: "Access", key: "access" },
              { label: "Features", key: "features" },
            ].map((row, rowIndex) => (
              <tr key={rowIndex} className="trr">
                <td className="border-b border-gray-300 px-4 py-6 font-semibold w-1/5">
                  {row.label}
                </td>
                {plans.map((plan, index) => (
                  <td key={index} className="border-b border-gray-300 px-4 py-2 w-1/5">
                    {plan[row.key as keyof Plan]} {/* Type-safe access */}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PricingPlans;