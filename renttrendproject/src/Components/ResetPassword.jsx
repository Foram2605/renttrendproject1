import { useState } from "react";
import { useParams, useNavigate } from "react-router";

const ResetPassword = () => {
  const { token } = useParams(); 
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users?resetToken=${token}`);
    const users = await response.json();
    console.log(users)
    if (users.length === 0) {  setMessage("Invalid or expired token."); return }
    else {
    await fetch(`${import.meta.env.VITE_BASE_URL}/users/${users[0].id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...users[0] , password: newPassword,cpassword:newPassword, resetToken: "" })   });
      setMessage("Password reset successful! Redirecting...");     
      setTimeout(() => navigate("/login"), 2000);
    }
  };

  return (
    <div className="container mt-5 col-6 shadow p-4">
      <h2>Reset Password</h2> <hr/>
      <form onSubmit={handleResetPassword} className="mb-3">
      <div className="input-group">
        <input
          type="password" className="form-control"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button type="submit" className="btn btn-primary">Reset Password</button> </div>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPassword;