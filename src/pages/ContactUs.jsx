import React, { useState } from 'react';
import Navbar from '../component/Navbar';
import Footer from '../component/Footer'; // Assuming Footer is already created
import "../css/ContactUs.css"; // Add the relevant CSS file for the contact page

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process form submission (could be sending to an API or email service)
    console.log("Form submitted", formData);
  };

  return (
    <>
      <Navbar />
      <div className="contact-page">
        <section className="contact-page-section">
          <h1 className="contact-page-h1">Get In Touch</h1>
          <p className="contact-page-p">
            We're always happy to hear from our customers. Whether you have a question, a suggestion, or just want to say hello, feel free to reach out to us!
          </p>

          {/* Contact Form */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="form-label">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter your email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message" className="form-label">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-input"
                placeholder="Your message"
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">Send Message</button>
          </form>
        </section>

        {/* Contact Information Section */}
        <section className="contact-info-section">
          <h2 className="contact-page-h2">Our Contact Information</h2>
          <p className="contact-page-p">
            Miss Cheesecake, 1st B Rd, opposite suncart bakery tools, Sardarpura, Jodhpur, Rajasthan 342003
          </p>
          <p className="contact-page-p">misscheesecakeofficial@gmail.com</p>
          <p className="contact-page-p">+919079713873 (10 AM to 8 PM)</p>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default ContactUs;
