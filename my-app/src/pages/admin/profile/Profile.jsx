import React, { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Mail, Lock, ArrowLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./profile.css";

import { updateUser } from "../../../redux/slices/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const [updateType, setUpdateType] = useState("email");

  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const resetMessages = () => {
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    resetMessages();
    setLoading(true);

    // EMAIL UPDATE
    if (updateType === "email") {
      if (!email || !confirmEmail) {
        setError("Please fill all email fields");
        setLoading(false);
        return;
      }

      if (email !== confirmEmail) {
        setError("Emails do not match");
        setLoading(false);
        return;
      }
    }

    // PASSWORD UPDATE
    if (updateType === "password") {
      if (!password || !confirmPassword) {
        setError("Please fill all password fields");
        setLoading(false);
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match");
        setLoading(false);
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        setLoading(false);
        return;
      }
    }

    try {
      const payload = {
        id: user._id,
        ...(updateType === "email" ? { email } : { password }),
      };

      const resultAction = await dispatch(updateUser(payload));

      if (updateUser.fulfilled.match(resultAction)) {
        setSuccess(
          `${
            updateType === "email" ? "Email" : "Password"
          } updated successfully`,
        );

        // Clear fields
        setEmail("");
        setConfirmEmail("");
        setPassword("");
        setConfirmPassword("");

        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1200);
      } else {
        setError(resultAction.payload || "Update failed");
      }
    } catch (err) {
      console.log(err);
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <section className="profile-page">
      <motion.div
        className="profile-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Back Button */}
        <button
          className="profile-back-btn"
          onClick={() => navigate("/admin/dashboard")}
          aria-label="Back to Dashboard"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        {/* LEFT SIDE */}
        <div className="profile-info">
          <div className="profile-icon-wrap">
            <ShieldCheck size={42} />
          </div>

          <span className="profile-eyebrow">ADMIN SETTINGS</span>
          <h2>Manage Your Profile</h2>

          <p>
            Update your administrator credentials securely using the CryoChain
            dashboard.
          </p>

          <div className="profile-user-box">
            <span>Current Email</span>
            <strong>{user?.email}</strong>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="profile-form-wrapper">
          {/* Toggle Buttons */}
          <div className="profile-toggle">
            <button
              className={updateType === "email" ? "active" : ""}
              onClick={() => {
                setUpdateType("email");
                resetMessages();
              }}
            >
              <Mail size={17} />
              Update Email
            </button>

            <button
              className={updateType === "password" ? "active" : ""}
              onClick={() => {
                setUpdateType("password");
                resetMessages();
              }}
            >
              <Lock size={17} />
              Update Password
            </button>
          </div>

          <form className="profile-form" onSubmit={handleSubmit}>
            {updateType === "email" ? (
              <>
                <div className="form-group">
                  <label>New Email</label>
                  <input
                    type="email"
                    placeholder="Enter new email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Confirm Email</label>
                  <input
                    type="email"
                    placeholder="Confirm new email"
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value)}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="form-group">
                  <label>New Password</label>
                  <input
                    type="password"
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </>
            )}

            {error && <p className="profile-error">{error}</p>}
            {success && <p className="profile-success">{success}</p>}

            <button type="submit" className="profile-btn" disabled={loading}>
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default Profile;
