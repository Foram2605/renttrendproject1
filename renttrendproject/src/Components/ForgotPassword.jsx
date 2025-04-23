import { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();    
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users?email=${email}`);
    const users = await response.json();

    if (users.length === 0) {  setMessage("Email not found."); return;   }

    const token = Math.random().toString(36).substr(2);


    await fetch(`${import.meta.env.VITE_BASE_URL}/users/${users[0].id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...users[0],resetToken: token }) });

    setMessage(`Reset link generated: http://localhost:5173/reset-password/${token}`);
    // setTimeout(() => navigate(`/reset-password/${token}`), 2000);
  };

  return (
    <div className="container mt-5 col-6 shadow p-4">
      <h2>Forgot Password</h2> <hr/>
      <form onSubmit={handleForgotPassword} className="mb-3">
        <div className="input-group">
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="form-control"
        />
        <button type="submit" className="btn btn-primary">Send Reset Link</button>
                  
        </div>
      </form>
      {message && <p className="fw-bold">{message}</p>}
    </div>
  );
};

export default ForgotPassword;