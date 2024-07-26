import { useState } from "react";
import "./App.css";

interface FormData {
  billAmount: string;
  tipPercentage: string;
}

export default function App() {
  const [formData, setFormData] = useState<FormData>({ billAmount: "", tipPercentage: "" });
  const [totalBill, setTotalBill] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const bill = Number(formData.billAmount);
    const percentage = Number(formData.tipPercentage);
    const taxAmount = bill * (percentage / 100);
    const totalAmount = Number(formData.billAmount) + taxAmount;
    if (formData.billAmount !== "" && formData.tipPercentage !== "") {
      setTotalBill("$" + String(totalAmount.toFixed(2)));
    } else {
      setTotalBill("");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  return (
    <>
      <div className="container">
        <h1>Tip Calculator</h1>
        <form className="form" action="submit" onSubmit={handleSubmit}>
          <div className="field bill-amount">
            <label htmlFor="billAmount" className="label bill-mount__label">
              Bill Amount:
            </label>
            <input
              type="text"
              className="input bill-amount__input"
              id="billAmount"
              name="billAmount"
              placeholder="Enter bill amount"
              onChange={handleInputChange}
              value={formData.billAmount}
            />
          </div>
          <div className="field tip-percentage">
            <label htmlFor="tipPercentage" className="label tip-percentage__label">
              Tip Percentage Amount:
            </label>
            <input
              type="text"
              className="input tip-percentage__input"
              id="tipPercentage"
              name="tipPercentage"
              placeholder="Enter tip percentage"
              onChange={handleInputChange}
              value={formData.tipPercentage}
            />
          </div>
          <button type="submit" className="submit">
            Calculate Total
          </button>
        </form>
        <div className="total-bill">
          <label htmlFor="label total-bill__label">Total Bill: </label>
          <p>{totalBill}</p>
        </div>
      </div>
    </>
  );
}
